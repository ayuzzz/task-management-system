import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
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
