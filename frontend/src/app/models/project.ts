import { Status } from './status';
export interface Project {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  userId: number;
  statusId: number;
}

export interface ProjectUserMapping {
  id: number;
  projectId: number;
  userId: number;
}
