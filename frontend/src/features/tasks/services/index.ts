import { taskAxios } from '@/lib/axios';
import { Task, Comment, CreateTaskPayload, CreateCommentPayload } from '../types';

export const TaskService = {
  getAll: async (projectId?: number, sprintId?: number, assigneeId?: number): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (projectId) params.append('projectId', String(projectId));
    if (sprintId) params.append('sprintId', String(sprintId));
    if (assigneeId) params.append('assigneeId', String(assigneeId));
    const res = await taskAxios.get(`/tasks?${params.toString()}`);
    return res.data;
  },

  getOne: async (id: number): Promise<Task> => {
    const res = await taskAxios.get(`/tasks/${id}`);
    return res.data;
  },

  create: async (data: CreateTaskPayload): Promise<Task> => {
    const res = await taskAxios.post('/tasks', data);
    return res.data;
  },

  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const res = await taskAxios.put(`/tasks/${id}`, data);
    return res.data;
  },

  updateStatus: async (id: number, status: string): Promise<Task> => {
    const res = await taskAxios.put(`/tasks/${id}/status`, { status });
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await taskAxios.delete(`/tasks/${id}`);
  },
};

export const CommentService = {
  getByTask: async (taskId: number): Promise<Comment[]> => {
    const res = await taskAxios.get(`/comments/task/${taskId}`);
    return res.data;
  },

  create: async (data: CreateCommentPayload): Promise<Comment> => {
    const res = await taskAxios.post('/comments', data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await taskAxios.delete(`/comments/${id}`);
  },
};

