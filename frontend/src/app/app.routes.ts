import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
