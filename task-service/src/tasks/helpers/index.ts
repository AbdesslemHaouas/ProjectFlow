export const getNextOrder = (tasks: { order: number }[]): number => {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map(t => t.order)) + 1;
};

export const groupTasksByStatus = (tasks: any[]) => {
  return {
    'Todo': tasks.filter(t => t.status === 'Todo'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'In Review': tasks.filter(t => t.status === 'In Review'),
    'Done': tasks.filter(t => t.status === 'Done'),
  };
};

