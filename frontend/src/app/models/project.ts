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

export interface ProjectList {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  userId: number;
  status: string;
  teamMembers: string[];
  progress: number;
}
