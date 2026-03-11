import { projectAxios } from '@/lib/axios';
import {
  Project,
  Sprint,
  BacklogItem,
  CreateProjectPayload,
  CreateSprintPayload,
  CreateBacklogItemPayload,
} from '../types';

export const ProjectService = {
  getAll: async (): Promise<Project[]> => {
    const res = await projectAxios.get('/projects');
    return res.data;
  },
  getOne: async (id: number): Promise<Project> => {
    const res = await projectAxios.get(`/projects/${id}`);
    return res.data;
  },
  create: async (data: CreateProjectPayload): Promise<Project> => {
    const res = await projectAxios.post('/projects', data);
    return res.data;
  },
  update: async (id: number, data: Partial<Project>): Promise<Project> => {
    const res = await projectAxios.put(`/projects/${id}`, data);
    return res.data;
  },
  delete: async (id: number): Promise<void> => {
    await projectAxios.delete(`/projects/${id}`);
  },
  addMember: async (id: number, userId: number): Promise<Project> => {
    const res = await projectAxios.post(`/projects/${id}/members/${userId}`);
    return res.data;
  },
  removeMember: async (id: number, userId: number): Promise<Project> => {
    const res = await projectAxios.delete(`/projects/${id}/members/${userId}`);
    return res.data;
  },
};

export const SprintService = {
  getAll: async (projectId?: number): Promise<Sprint[]> => {
    const url = projectId ? `/sprints?projectId=${projectId}` : '/sprints';
    const res = await projectAxios.get(url);
    return res.data;
  },
  getOne: async (id: number): Promise<Sprint> => {
    const res = await projectAxios.get(`/sprints/${id}`);
    return res.data;
  },
  create: async (data: CreateSprintPayload): Promise<Sprint> => {
    const res = await projectAxios.post('/sprints', data);
    return res.data;
  },
  update: async (id: number, data: Partial<Sprint>): Promise<Sprint> => {
    const res = await projectAxios.put(`/sprints/${id}`, data);
    return res.data;
  },
  activate: async (id: number): Promise<Sprint> => {
    const res = await projectAxios.put(`/sprints/${id}/activate`);
    return res.data;
  },
  complete: async (id: number): Promise<Sprint> => {
    const res = await projectAxios.put(`/sprints/${id}/complete`);
    return res.data;
  },
  delete: async (id: number): Promise<void> => {
    await projectAxios.delete(`/sprints/${id}`);
  },
};

export const BacklogService = {
  getAll: async (projectId?: number): Promise<BacklogItem[]> => {
    const url = projectId ? `/backlog?projectId=${projectId}` : '/backlog';
    const res = await projectAxios.get(url);
    return res.data;
  },
  getOne: async (id: number): Promise<BacklogItem> => {
    const res = await projectAxios.get(`/backlog/${id}`);
    return res.data;
  },
  create: async (data: CreateBacklogItemPayload): Promise<BacklogItem> => {
    const res = await projectAxios.post('/backlog', data);
    return res.data;
  },
  update: async (id: number, data: Partial<BacklogItem>): Promise<BacklogItem> => {
    const res = await projectAxios.put(`/backlog/${id}`, data);
    return res.data;
  },
  assignToSprint: async (id: number, sprintId: number): Promise<BacklogItem> => {
    const res = await projectAxios.put(`/backlog/${id}/sprint/${sprintId}`);
    return res.data;
  },
  removeFromSprint: async (id: number): Promise<BacklogItem> => {
    const res = await projectAxios.put(`/backlog/${id}/remove-sprint`);
    return res.data;
  },
  delete: async (id: number): Promise<void> => {
    await projectAxios.delete(`/backlog/${id}`);
  },
};