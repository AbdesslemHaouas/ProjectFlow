import { User } from '@/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}