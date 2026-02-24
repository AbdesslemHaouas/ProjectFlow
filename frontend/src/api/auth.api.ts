import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001', // auth service URL
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