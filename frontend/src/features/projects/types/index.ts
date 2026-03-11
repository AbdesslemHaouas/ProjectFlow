export enum ProjectType {
  SCRUM = 'Scrum',
  KANBAN = 'Kanban',
}

export enum ProjectStatus {
  PLANNED = 'Planned',
  ACTIVE = 'Active',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
}

export interface Project {
  id: number;
  name: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  chefProjetId: number;
  startDate: string;
  endDate: string;
  progress: number;
  memberIds: number[];
  sprints?: Sprint[];
  backlogItems?: BacklogItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Sprint {
  id: number;
  name: string;
  goal: string;
  status: 'Planned' | 'Active' | 'Completed';
  startDate: string;
  endDate: string;
  progress: number;
  projectId: number;
  createdAt: string;
}

export interface BacklogItem {
  id: number;
  title: string;
  description: string;
  type: 'Story' | 'Bug' | 'Task' | 'Epic';
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Sprint' | 'Done';
  points: number;
  assigneeId?: number;
  sprintId?: number;
  acceptanceCriteria?: string;
  projectId: number;
  order: number;
  createdAt: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
  type: ProjectType;
  status?: ProjectStatus;
  chefProjetId: number;
  startDate?: string;
  endDate?: string;
  memberIds?: number[];
}

export interface CreateSprintPayload {
  name: string;
  goal?: string;
  projectId: number;
  startDate?: string;
  endDate?: string;
}

export interface CreateBacklogItemPayload {
  title: string;
  description?: string;
  type: string;
  priority?: string;
  points?: number;
  assigneeId?: number;
  sprintId?: number;
  acceptanceCriteria?: string;
  projectId: number;
}