import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export const getJobs = async () => {
  const res = await api.get('/jobs');
  
  console.log('API Response:', res);

  if (res.data && Array.isArray(res.data)) {
    return res.data; 
  } else {
    throw new Error('Invalid data format');
  }
};

export const createJob = async (jobData) => {
  try {
    const res = await api.post('/jobs', jobData);
    return res.data;
  } catch (err) {
    console.error('Failed to create job:', err.response?.data || err.message);
    throw err;
  }
};

export const getJobById = async (id) => {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
};

export const updateJob = async (id, updates) => {
  const res = await api.put(`/jobs/${id}`, updates);
  return res.data;
};

export const deleteJob = async (id) => {
  await api.delete(`/jobs/${id}`);
};

