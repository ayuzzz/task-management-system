import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const profileRoutes: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '**',
        component: LoginComponent,
      },
    ],
  },
];
