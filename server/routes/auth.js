import { Router } from 'express';
import { getSupabaseClient } from '../lib/supabase.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router();
const supabase = getSupabaseClient();

router.post('/login', async (req, res) => {

    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', req.body.email)
        .single()

    if (!user) return res.status(401).json({ error: "Invalid credentials!"})

    const valid = await bcrypt.compare(req.body.password, user.password)

    if (!valid) return res.status(401).json({ error: "Invalid password!"})

    const token = jwt.sign({id:user.id, email:user.email}, 'placeholder', {expiresIn:'1h'})
    res.status(201).json({token})

    if (error) return res.status(500).json({ error: error.message });
});


router.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    const token = jwt.sign({ id: data[0].id, email: data[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
});

export default router
