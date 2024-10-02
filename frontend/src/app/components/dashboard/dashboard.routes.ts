import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { AuthGuard } from '../../guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-edit/:taskId',
        component: AddEditTaskComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
