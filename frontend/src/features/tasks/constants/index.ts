export const TASK_STATUSES = ['Todo', 'In Progress', 'In Review', 'Done'] as const;
export const TASK_PRIORITIES = ['High', 'Medium', 'Low'] as const;

export const PRIORITY_COLORS: Record<string, string> = {
  High: 'text-red-400 bg-red-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Low: 'text-green-400 bg-green-400/10',
};

export const COLUMN_COLORS: Record<string, string> = {
  'Todo': 'text-slate-400',
  'In Progress': 'text-yellow-400',
  'In Review': 'text-blue-400',
  'Done': 'text-green-400',
};

export const COLUMN_DOTS: Record<string, string> = {
  'Todo': 'bg-slate-400',
  'In Progress': 'bg-yellow-400',
  'In Review': 'bg-blue-400',
  'Done': 'bg-green-400',
};

