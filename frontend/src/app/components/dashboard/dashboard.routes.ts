import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'add-edit/:taskId',
        component: AddEditTaskComponent,
      },
      // {
      //   path: 'project-details/edit/:id',
      //   component: ProjectEditDetailsComponent,
      // },
    ],
  },
];
