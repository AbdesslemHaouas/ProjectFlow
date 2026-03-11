import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const isPasswordUpdate = error.config?.url?.includes('/users/me/password');
      if (error.response?.status === 401 && !isPasswordUpdate) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const authAxios = createAxiosInstance('http://localhost:3001');
export const projectAxios = createAxiosInstance('http://localhost:3002');
export const taskAxios = createAxiosInstance('http://localhost:3003');
export default authAxios;