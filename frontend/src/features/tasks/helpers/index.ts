import { Task, TaskStatus } from '../types';

export const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => ({
  'Todo': tasks.filter(t => t.status === 'Todo'),
  'In Progress': tasks.filter(t => t.status === 'In Progress'),
  'In Review': tasks.filter(t => t.status === 'In Review'),
  'Done': tasks.filter(t => t.status === 'Done'),
});

export const filterTasks = (tasks: Task[], search: string): Task[] => {
  if (!search.trim()) return tasks;
  return tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase())
  );
};

export const getTaskKPIs = (tasks: Task[]) => ({
  todo: tasks.filter(t => t.status === 'Todo').length,
  inProgress: tasks.filter(t => t.status === 'In Progress').length,
  done: tasks.filter(t => t.status === 'Done').length,
  highPriority: tasks.filter(t => t.priority === 'High' && t.status !== 'Done').length,
});


