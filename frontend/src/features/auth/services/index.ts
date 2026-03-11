import { authAxios as axiosInstance } from '@/lib/axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await axiosInstance.post('/auth/login', credentials);
    return res.data;
  },
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const res = await axiosInstance.post('/auth/register', credentials);
    return res.data;
  },
};