import express from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobs.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/jobs', jobsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
