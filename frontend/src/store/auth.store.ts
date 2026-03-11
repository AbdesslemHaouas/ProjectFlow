import { create } from 'zustand';
import Cookies from 'js-cookie';
import { User } from '@/types';

const COOKIE_OPTIONS = {
  expires: 7,        // 7 days
  secure: false,     // set to true in production (HTTPS)
  sameSite: 'strict' as const,
};

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  token: Cookies.get('token') || null,
  user: (() => {
    try {
      const u = Cookies.get('user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: !!Cookies.get('token'),

  login: (token, user) => {
    Cookies.set('token', token, COOKIE_OPTIONS);
    Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    set({ token: null, user: null, isAuthenticated: false });
  },

  updateUser: (updatedFields) => set((state) => {
    const updatedUser = state.user ? { ...state.user, ...updatedFields } : null;
    if (updatedUser) {
      Cookies.set('user', JSON.stringify(updatedUser), COOKIE_OPTIONS);
    }
    return { user: updatedUser };
  }),
}));