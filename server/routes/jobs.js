import { Router } from 'express';
import { getSupabaseClient } from '../lib/supabase.js';
import { z } from 'zod'

const router = Router();
const supabase = getSupabaseClient(); 

const jobSchema = z.object({
  company: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Title is required"),
  status: z.string().min(1, "Status is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  console.log(req.params)

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.log("Reached this point! 500")
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    console.log("Reached the 404!")
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json(data);
});


router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  console.log('Jobs Data:', data);
  res.json(data);
});




router.post('/', async (req, res) => {
  const parseResult = jobSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.flatten().fieldErrors });
  }

  const { company, title, status, date } = parseResult.data;

  const { data, error } = await supabase
    .from('jobs')
    .insert([{ company, title, status, date }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});



router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
});

export default router;
