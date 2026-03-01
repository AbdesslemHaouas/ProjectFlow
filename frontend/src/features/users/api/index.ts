import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { useAuthStore } from '@/store/auth.store';
import {
  User,
  UpdateProfilePayload,
  UpdatePasswordPayload,
  UpdateRolePayload,
  UpdateStatusPayload,
} from '../types';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  me: ['users', 'me'] as const,
};

// API calls
const getMe = async (): Promise<User> => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

const updateProfile = async (data: UpdateProfilePayload): Promise<User> => {
  const response = await axiosInstance.put('/users/me/profile', data);
  return response.data;
};

const updatePassword = async (data: UpdatePasswordPayload): Promise<{ message: string }> => {
  const response = await axiosInstance.put('/users/me/password', data);
  return response.data;
};

const updateUserRole = async ({ id, ...data }: UpdateRolePayload & { id: number }): Promise<User> => {
  const response = await axiosInstance.put(`/users/${id}/role`, data);
  return response.data;
};

const updateUserStatus = async ({ id, ...data }: UpdateStatusPayload & { id: number }): Promise<User> => {
  const response = await axiosInstance.put(`/users/${id}/status`, data);
  return response.data;
};

const deleteUser = async (id: number): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};

// Hooks
export const useGetMe = () => {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: getMe,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getAllUsers,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};