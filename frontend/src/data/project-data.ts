import { Project } from '../app/models/project';

export const project_data: Project[] = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Project 1 Description',
    dueDate: '2021-12-31',
    userId: 1,
    statusId: 4,
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Project 2 Description',
    dueDate: '2021-01-01',
    userId: 2,
    statusId: 4,
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'Project 3 Description',
    dueDate: '2021-01-01',
    userId: 2,
    statusId: 5,
  },
  {
    id: 4,
    name: 'Project 4',
    description: 'Project 4 Description',
    dueDate: '2021-01-01',
    userId: 1,
    statusId: 5,
  },
  {
    id: 5,
    name: 'Project 5',
    description: 'Project 5 Description',
    dueDate: '2021-01-01',
    userId: 3,
    statusId: 4,
  },
];
