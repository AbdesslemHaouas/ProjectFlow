import { User, UserRole, UserStatus } from '@/types';

export interface UpdateProfilePayload {
  nom?: string;
  prenom?: string;
  email?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateRolePayload {
  role: UserRole;
}

export interface UpdateStatusPayload {
  status: UserStatus;
}

export type { User, UserRole, UserStatus };