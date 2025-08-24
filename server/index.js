import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobs.js';
import { requireAuth } from './auth/requireAuth.js'
import { clerkClient } from '@clerk/clerk-sdk-node'

const app = express();

app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true,
}));
app.use(express.json());

app.use('/jobs', requireAuth, jobsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
