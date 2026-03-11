import { authAxios as axiosInstance } from '@/lib/axios';
import {
  User,
  UpdateProfilePayload,
  UpdatePasswordPayload,
  UpdateRolePayload,
  UpdateStatusPayload,
} from '../types';

type CreateApprovedUserPayload = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role?: string;
};

export const UserService = {
  getMe: async (): Promise<User> => {
    const res = await axiosInstance.get('/users/me');
    return res.data;
  },
  getAll: async (): Promise<User[]> => {
    const res = await axiosInstance.get('/users');
    return res.data;
  },
  createApproved: async (data: CreateApprovedUserPayload): Promise<User> => {
    const res = await axiosInstance.post('/users/approved', data);
    return res.data;
  },
  updateProfile: async (data: UpdateProfilePayload): Promise<User> => {
    const res = await axiosInstance.put('/users/me/profile', data);
    return res.data;
  },
  updatePassword: async (data: UpdatePasswordPayload): Promise<{ message: string }> => {
    const res = await axiosInstance.put('/users/me/password', data);
    return res.data;
  },
  updateRole: async (id: number, data: UpdateRolePayload): Promise<User> => {
    const res = await axiosInstance.put(`/users/${id}/role`, data);
    return res.data;
  },
  updateStatus: async (id: number, data: UpdateStatusPayload): Promise<User> => {
    const res = await axiosInstance.put(`/users/${id}/status`, data);
    return res.data;
  },
  delete: async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  },
};

