export const SPRINT_STATUSES = ['Planned', 'Active', 'Completed'] as const;
export type SprintStatus = typeof SPRINT_STATUSES[number];


