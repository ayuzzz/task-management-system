import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectRoutes } from '../components/projects-page/project.routes';
import { ProjectsPageComponent } from '../components/projects-page/projects-page.component';
import { ProjectsListUtilitiesComponent } from '../components/projects-page/projects-list-utilities/projects-list-utilities.component';
import { ProjectsListComponent } from '../components/projects-page/projects-pageprojects-list/projects-pageprojects-list.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectsListComponent,
    ProjectsListUtilitiesComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(projectRoutes), SharedModule],
})
export class ProjectsModule {}
