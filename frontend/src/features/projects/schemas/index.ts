import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  type: z.enum(['Scrum', 'Kanban']),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const createSprintSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  goal: z.string().optional(),
  projectId: z.union([z.string(), z.number()]).transform(Number),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type CreateSprintFormData = z.infer<typeof createSprintSchema>;