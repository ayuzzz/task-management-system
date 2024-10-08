export interface Project {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  userId: number;
  statusId: number;
}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  userId: number;
  statusId: number;
  TeamMembers: number[];
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
  teamMembers: TeamMember[];
  progress: number;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
}
