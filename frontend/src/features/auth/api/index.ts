import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { AuthService } from '../services';
import { LoginCredentials, RegisterCredentials } from '../types';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => AuthService.login(credentials),
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

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => AuthService.register(credentials),
    onSuccess: () => {
      navigate('/pending');
    },
  });
};