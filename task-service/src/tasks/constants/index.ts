export const TASK_STATUSES = ['Todo', 'In Progress', 'In Review', 'Done'] as const;
export const TASK_PRIORITIES = ['High', 'Medium', 'Low'] as const;

export type TaskStatus = typeof TASK_STATUSES[number];
export type TaskPriority = typeof TASK_PRIORITIES[number];

