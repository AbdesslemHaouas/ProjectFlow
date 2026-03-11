export const BACKLOG_TYPES = ['Story', 'Bug', 'Task', 'Epic'] as const;
export const BACKLOG_PRIORITIES = ['High', 'Medium', 'Low'] as const;
export const BACKLOG_STATUSES = ['To Do', 'In Sprint', 'Done'] as const;

export type BacklogType = typeof BACKLOG_TYPES[number];
export type BacklogPriority = typeof BACKLOG_PRIORITIES[number];
export type BacklogStatus = typeof BACKLOG_STATUSES[number];


