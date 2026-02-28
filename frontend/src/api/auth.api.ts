import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

// Add token to every request automatically
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = (email: string, password: string) =>
  API.post('/auth/login', { email, password });

export const registerApi = (data: {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
}) => API.post('/auth/register', data);

export const getAllUsersApi = () =>
  API.get('/users');

export const updateUserStatusApi = (id: number, status: string) =>
  API.put(`/users/${id}/status`, { status });

export const updateUserRoleApi = (id: number, role: string) =>
  API.put(`/users/${id}/role`, { role });

export const deleteUserApi = (id: number) =>
  API.delete(`/users/${id}`);