import { Routes } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

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
    component: ProfilePageComponent,
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
