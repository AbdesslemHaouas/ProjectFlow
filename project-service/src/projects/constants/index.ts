export const PROJECT_TYPES = ['Scrum', 'Kanban'] as const;
export const PROJECT_STATUSES = ['Planned', 'Active', 'On Hold', 'Completed'] as const;

export type ProjectType = typeof PROJECT_TYPES[number];
export type ProjectStatus = typeof PROJECT_STATUSES[number];

