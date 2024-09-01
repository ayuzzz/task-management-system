import { Routes } from '@angular/router';
import { ProjectsPageComponent } from './projects-page.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AuthGuard } from '../../guards/auth.guard';

export const projectRoutes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-edit/:projectId',
        component: AddEditProjectComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'project-details/edit/:id',
      //   component: ProjectEditDetailsComponent,
      // },
    ],
  },
];
