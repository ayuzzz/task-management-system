import { Status } from './../../models/status';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { project_data } from '../../../data/project-data';
import { status_data } from '../../../data/status-priority-data';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
})
export class ProjectsPageComponent implements OnInit {
  projects: Project[] = [];
  status: Status[] = [];
  activeProjectsCount: number | null = null;
  completedProjectsCount: number | null = null;
  filterString: string = '';

  ngOnInit(): void {
    this.projects = project_data;
    this.status = status_data;
    this.activeProjectsCount = this.projects.filter(
      (project) =>
        project.statusId ===
        this.status.find((status) => status.status === 'Active')?.id
    ).length;

    this.completedProjectsCount = this.projects.filter(
      (project) =>
        project.statusId ===
        this.status.find((status) => status.status === 'Completed')?.id
    ).length;
  }

  filterProjects($event: string): void {
    this.filterString = $event;
    console.log(this.filterString);
  }
}
