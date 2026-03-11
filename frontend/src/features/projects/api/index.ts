import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { ProjectService, SprintService, BacklogService } from '../services';
import {
  CreateProjectPayload,
  CreateSprintPayload,
  CreateBacklogItemPayload,
  Project,
  Sprint,
  BacklogItem,
} from '../types';

export const projectKeys = {
  all: ['projects'] as const,
  detail: (id: number) => ['projects', id] as const,
  sprints: (projectId?: number) => ['sprints', projectId] as const,
  backlog: (projectId?: number) => ['backlog', projectId] as const,
};

// Projects
export const useGetProjects = () =>
  useQuery({ queryKey: projectKeys.all, queryFn: ProjectService.getAll });

export const useGetProject = (id: number) =>
  useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => ProjectService.getOne(id),
    enabled: !!id,
  });

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  return useMutation({
    mutationFn: (data: Omit<CreateProjectPayload, 'chefProjetId'>) =>
      ProjectService.create({ ...data, chefProjetId: user?.id || 0 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.all }),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Project> & { id: number }) =>
      ProjectService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(data.id) });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProjectService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.all }),
  });
};

// Sprints
export const useGetSprints = (projectId?: number) =>
  useQuery({
    queryKey: projectKeys.sprints(projectId),
    queryFn: () => SprintService.getAll(projectId),
  });

export const useCreateSprint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SprintService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.sprints() }),
  });
};

export const useUpdateSprint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Sprint> & { id: number }) =>
      SprintService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.sprints() }),
  });
};

export const useActivateSprint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SprintService.activate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.sprints() }),
  });
};

export const useCompleteSprint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SprintService.complete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.sprints() }),
  });
};

export const useDeleteSprint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SprintService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.sprints() }),
  });
};

// Backlog
export const useGetBacklog = (projectId?: number) =>
  useQuery({
    queryKey: projectKeys.backlog(projectId),
    queryFn: () => BacklogService.getAll(projectId),
  });

export const useCreateBacklogItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BacklogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.backlog() }),
  });
};

export const useUpdateBacklogItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<BacklogItem> & { id: number }) =>
      BacklogService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.backlog() }),
  });
};

export const useAssignToSprint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, sprintId }: { id: number; sprintId: number }) =>
      BacklogService.assignToSprint(id, sprintId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.backlog() });
      queryClient.invalidateQueries({ queryKey: projectKeys.sprints() });
    },
  });
};

export const useDeleteBacklogItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BacklogService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectKeys.backlog() }),
  });
};