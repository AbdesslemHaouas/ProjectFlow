export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  createdAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  CHEF_PROJET = 'chef_projet',
  TEAM_MEMBER = 'team_member',
  CLIENT = 'client',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}