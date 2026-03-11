import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['High', 'Medium', 'Low']).default('Medium'),
  dueDate: z.string().optional(),
  storyPoints: z.number().optional(),
  projectId: z.union([z.string(), z.number()]).transform(Number),
  sprintId: z.union([z.string(), z.number()]).transform(Number).optional(),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

