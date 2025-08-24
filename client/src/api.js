import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export const getJobs = async (token) => {
  const res = await api.get('/jobs', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createJob = async (jobData, token) => {
  const res = await api.post('/jobs', jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getJobById = async (id, token) => {
  const res = await api.get(`/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateJob = async (id, updates, token) => {
  const res = await api.put(`/jobs/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteJob = async (id, token) => {
  await api.delete(`/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
