import { create } from 'zustand';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (token, user) => set({ 
    token, 
    user, 
    isAuthenticated: true 
  }),
  
  logout: () => set({ 
    token: null, 
    user: null, 
    isAuthenticated: false 
  }),
}));