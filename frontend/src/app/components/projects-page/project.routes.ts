import { Routes } from '@angular/router';
import { ProjectsPageComponent } from './projects-page.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';

export const projectRoutes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsPageComponent,
      },
      {
        path: 'add-edit/:projectId',
        component: AddEditProjectComponent,
      },
      // {
      //   path: 'project-details/edit/:id',
      //   component: ProjectEditDetailsComponent,
      // },
    ],
  },
];
