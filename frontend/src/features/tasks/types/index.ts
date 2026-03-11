export type TaskStatus = 'Todo' | 'In Progress' | 'In Review' | 'Done';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  storyPoints: number;
  assigneeId: number | null;
  projectId: number;
  sprintId: number | null;
  backlogItemId: number | null;
  order: number;
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  taskId: number;
  createdAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  storyPoints?: number;
  assigneeId?: number;
  projectId: number;
  sprintId?: number;
  backlogItemId?: number;
}

export interface CreateCommentPayload {
  content: string;
  taskId: number;
}


