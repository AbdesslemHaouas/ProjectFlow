import { z } from 'zod';

export const updateProfileSchema = z.object({
  nom: z.string().min(1, 'Last name is required'),
  prenom: z.string().min(1, 'First name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

