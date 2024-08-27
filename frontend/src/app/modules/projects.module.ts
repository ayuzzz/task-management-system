import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectRoutes } from '../components/projects-page/project.routes';
import { ProjectsPageComponent } from '../components/projects-page/projects-page.component';
import { ProjectsListUtilitiesComponent } from '../components/projects-page/projects-list-utilities/projects-list-utilities.component';
import { ProjectsListComponent } from '../components/projects-page/projects-list/projects-list.component';
import { SharedModule } from './shared.module';
import { TaskStatusDialogComponent } from '../components/projects-page/task-status-dialog/task-status-dialog.component';
import { AddEditProjectComponent } from '../components/projects-page/add-edit-project/add-edit-project.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectsListComponent,
    ProjectsListUtilitiesComponent,
    TaskStatusDialogComponent,
    AddEditProjectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(projectRoutes),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProjectsModule {}
