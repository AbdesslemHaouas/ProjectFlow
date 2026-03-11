import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskService, CommentService } from '../services';
import { CreateTaskPayload, CreateCommentPayload } from '../types';

export const taskKeys = {
  all: ['tasks'] as const,
  list: (filters: object) => [...taskKeys.all, filters] as const,
  detail: (id: number) => [...taskKeys.all, id] as const,
};

export const useGetTasks = (projectId?: number, sprintId?: number, assigneeId?: number) =>
  useQuery({
    queryKey: taskKeys.list({ projectId, sprintId, assigneeId }),
    queryFn: () => TaskService.getAll(projectId, sprintId, assigneeId),
  });

export const useGetTask = (id: number) =>
  useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => TaskService.getOne(id),
    enabled: !!id,
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskPayload) => TaskService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<any> }) =>
      TaskService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      TaskService.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TaskService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCommentPayload) => CommentService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CommentService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
};

