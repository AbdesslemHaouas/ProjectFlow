export const PERMISSION_KEYS = {
  // Pages Access
  'pages.projects': 'Access Projects page',
  'pages.tasks': 'Access Tasks page',
  'pages.backlog': 'Access Backlog page',
  'pages.sprints': 'Access Sprints page',
  'pages.teams': 'Access Teams page',
  'pages.reports': 'Access Reports page',
  'pages.notifications': 'Access Notifications page',
  'pages.settings': 'Access Settings page',
  'pages.conges': 'Access Conges page',
  'pages.aura': 'Access Aura page',
  'pages.admin_users': 'Access Admin Users page',

  // Projects Actions
  'projects.create': 'Create Projects',
  'projects.edit': 'Edit Projects',
  'projects.delete': 'Delete Projects',
  'projects.manage_members': 'Manage Project Members',

  // Backlog/Sprints Actions
  'backlog.view': 'View Backlog',
  'backlog.edit': 'Edit Backlog (prioritize/reorder)',
  'sprints.create': 'Create Sprints',
  'sprints.edit': 'Edit Sprints',
  'sprints.start': 'Start Sprint',
  'sprints.complete': 'Complete Sprint',

  // Tasks/Comments Actions
  'tasks.create': 'Create Tasks',
  'tasks.edit_any': 'Edit Any Task',
  'tasks.edit_assigned_only': 'Edit Only Assigned Tasks',
  'tasks.move_status': 'Move Task Status',
  'tasks.estimate': 'Estimate / Set Story Points',
  'tasks.delete': 'Delete Tasks',
  'comments.create': 'Comment on Tasks',
  'comments.delete_any': 'Delete Any Comment',
} as const;

export type PermissionKey = keyof typeof PERMISSION_KEYS;

export const DEFAULT_PERMISSIONS: Record<PermissionKey, boolean> = Object.fromEntries(
  Object.keys(PERMISSION_KEYS).map((key) => [key, false])
) as Record<PermissionKey, boolean>;

// Grouping for UI panels
export const PERMISSION_GROUPS = [
  {
    title: 'Pages Access',
    keys: [
      'pages.projects',
      'pages.tasks',
      'pages.backlog',
      'pages.sprints',
      'pages.teams',
      'pages.reports',
      'pages.notifications',
      'pages.settings',
      'pages.conges',
      'pages.aura',
      'pages.admin_users',
    ] as PermissionKey[],
  },
  {
    title: 'Projects Actions',
    keys: [
      'projects.create',
      'projects.edit',
      'projects.delete',
      'projects.manage_members',
    ] as PermissionKey[],
  },
  {
    title: 'Backlog/Sprints Actions',
    keys: [
      'backlog.view',
      'backlog.edit',
      'sprints.create',
      'sprints.edit',
      'sprints.start',
      'sprints.complete',
    ] as PermissionKey[],
  },
  {
    title: 'Tasks/Comments Actions',
    keys: [
      'tasks.create',
      'tasks.edit_any',
      'tasks.edit_assigned_only',
      'tasks.move_status',
      'tasks.estimate',
      'tasks.delete',
      'comments.create',
      'comments.delete_any',
    ] as PermissionKey[],
  },
] as const;
