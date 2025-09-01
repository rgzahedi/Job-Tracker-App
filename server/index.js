import express from 'express'
import cors from 'cors'
import jobsRoutes from './routes/jobs.js'
import authRoutes from './routes/auth.js'
import { authMiddleware } from './middleware/authMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/jobs', authMiddleware, jobsRoutes);
app.use('/users', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
