export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priorityId: number;
  statusId: number;
  projectId: number;
  userId: number;
}

export interface MiniatureTask {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  status: string;
  project: string;
}
