import { Routes } from '@angular/router';
import { ProjectsPageComponent } from './projects-page.component';

export const projectRoutes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsPageComponent,
      },
      // {
      //   path: 'project-details/view/:id',
      //   component: ProjectDetailsComponent,
      // },
      // {
      //   path: 'project-details/edit/:id',
      //   component: ProjectEditDetailsComponent,
      // },
    ],
  },
];
