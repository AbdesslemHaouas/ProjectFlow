import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axios';
import { useAuthStore } from '@/store/auth.store';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

// Login API call
const loginRequest = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

// Register API call
const registerRequest = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/register', credentials);
  return response.data;
};

// useLogin hook
export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.access_token, data.user);
      if (data.user.status === 'pending') {
        navigate('/pending');
      } else {
        navigate('/dashboard');
      }
    },
  });
};

// useRegister hook
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      navigate('/pending');
    },
  });
};