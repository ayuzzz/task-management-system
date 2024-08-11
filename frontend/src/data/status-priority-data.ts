import { Priority } from '../app/models/priority';
import { Status } from '../app/models/status';

export const status_data: Status[] = [
  {
    id: 1,
    status: 'Not Started', // For Tasks
  },
  {
    id: 2,
    status: 'In Progress', // For Tasks
  },
  {
    id: 3,
    status: 'Completed', // For Tasks & Projects
  },
  {
    id: 4,
    status: 'Active', // For Projects
  },
  {
    id: 5,
    status: 'Archived', // For Projects
  },
];

export const priority_data: Priority[] = [
  {
    id: 1,
    level: 'Low',
  },
  {
    id: 2,
    level: 'Medium',
  },
  {
    id: 3,
    level: 'High',
  },
];
