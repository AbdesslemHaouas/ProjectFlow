export const PROJECT_STATUS_COLORS: Record<string, string> = {
  Active: 'text-green-400 bg-green-400/10 border-green-400/20',
  Planned: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'On Hold': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Completed: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

export const PROJECT_TYPE_COLORS: Record<string, string> = {
  Scrum: 'text-[#6366F1] bg-[#6366F1]/10',
  Kanban: 'text-purple-400 bg-purple-400/10',
};

export const PROJECT_PROGRESS_COLORS: Record<string, string> = {
  Active: '#22C55E',
  Planned: '#6366F1',
  'On Hold': '#F59E0B',
  Completed: '#6366F1',
};

export const PROJECT_STATUS_FILTERS = ['All', 'Active', 'Planned', 'On Hold', 'Completed'];

export const BACKLOG_TYPE_COLORS: Record<string, string> = {
  Story: 'text-green-400 bg-green-400/10',
  Bug: 'text-red-400 bg-red-400/10',
  Task: 'text-blue-400 bg-blue-400/10',
  Epic: 'text-purple-400 bg-purple-400/10',
};

export const BACKLOG_STATUS_COLORS: Record<string, string> = {
  'To Do': 'text-slate-400 bg-slate-400/10 border-slate-400/20',
  'In Sprint': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Done': 'text-green-400 bg-green-400/10 border-green-400/20',
};

export const BACKLOG_PRIORITY_COLORS: Record<string, string> = {
  High: 'text-red-400',
  Medium: 'text-yellow-400',
  Low: 'text-green-400',
};

export const BACKLOG_STATUS_FILTERS = ['All', 'To Do', 'In Sprint', 'Done'];
export const BACKLOG_TYPE_FILTERS = ['All', 'Story', 'Bug', 'Task', 'Epic'];
export const STORY_POINTS = [1, 2, 3, 5, 8, 13, 21];
