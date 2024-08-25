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
      //   path: 'add-edit-project/:projectId',
      //   component: AddEditProjectComponent,
      // },
      // {
      //   path: 'project-details/edit/:id',
      //   component: ProjectEditDetailsComponent,
      // },
    ],
  },
];
