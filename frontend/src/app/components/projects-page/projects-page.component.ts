import { project_data } from './../../../data/project-data';
import { task_data } from './../../../data/task-data';
import { project_user_mappings } from './../../../data/project-user-mapping-data';
import { ProjectList } from './../../models/project';
import { Status } from './../../models/status';
import { Component, OnInit } from '@angular/core';
import { status_data } from '../../../data/status-priority-data';
import { user_data } from '../../../data/user-data';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
})
export class ProjectsPageComponent implements OnInit {
  projects: ProjectList[] = [];
  status: Status[] = [];
  activeProjectsCount: number | null = null;
  completedProjectsCount: number | null = null;
  filterString: string = '';

  ngOnInit(): void {
    let projectsData = project_data;
    let projectUserMappings = project_user_mappings;
    let statusData = status_data;
    let userData = user_data;
    let taskData = task_data;

    projectsData.forEach((project) => {
      this.projects.push({
        id: project.id,
        name: project.name,
        description: project.description,
        dueDate: project.dueDate,
        userId: project.userId,
        status:
          statusData.find((status) => status.id === project.statusId)?.status ||
          'NA',
        teamMembers: projectUserMappings
          .filter((mapping) => mapping.projectId === project.id)
          .map(
            (mapping) =>
              userData.find((user) => user.id == mapping.userId)?.name || 'NA'
          ),
        progress:
          taskData.filter(
            (task) => task.projectId === project.id && task.statusId === 3
          ).length /
          (taskData.filter((task) => task.projectId === project.id).length ||
            1),
      });
    });
    console.log(this.projects);
    this.activeProjectsCount = this.projects.filter(
      (project) => project.status === 'Active'
    ).length;

    this.completedProjectsCount = this.projects.filter(
      (project) => project.status === 'Completed'
    ).length;
  }

  filterProjects($event: string): void {
    this.filterString = $event;
    console.log(this.filterString);
  }
}
