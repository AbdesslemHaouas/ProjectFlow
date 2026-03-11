import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { UserService } from '../services';
import {
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

export const userKeys = {
  all: ['users'] as const,
  me: ['users', 'me'] as const,
};

export const useGetMe = () =>
  useQuery({ queryKey: userKeys.me, queryFn: UserService.getMe });

export const useGetAllUsers = () =>
  useQuery({ queryKey: userKeys.all, queryFn: UserService.getAll });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => UserService.updateProfile(data),
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
};

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: (data: UpdatePasswordPayload) => UserService.updatePassword(data),
  });

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdateRolePayload & { id: number }) =>
      UserService.updateRole(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdateStatusPayload & { id: number }) =>
      UserService.updateStatus(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};

export const useCreateApprovedUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateApprovedUserPayload) => UserService.createApproved(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};