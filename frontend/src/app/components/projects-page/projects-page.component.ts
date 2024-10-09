import { UserService } from './../../services/user.service';
import { StatusPriorityService } from './../../services/status-priority.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { ProjectService } from './../../services/project.service';
import { TaskService } from './../../services/task.service';
import {
  Project,
  ProjectList,
  ProjectUserMapping,
  TeamMember,
} from './../../models/project';
import { Status } from './../../models/status';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { User } from '../../models/user';

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

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private statusPriorityService: StatusPriorityService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    let projectsData: Project[];
    let projectUserMappings: ProjectUserMapping[];
    let statusData: Status[] = [];
    let userData: User[] = [];
    let taskData: Task[];

    this.statusPriorityService.GetStatusData().subscribe(
      (data) => {
        statusData = data;
      },
      (error) => {
        console.error('Error getting status data: ', error);
      }
    );

    [projectsData, projectUserMappings, taskData, userData] =
      await lastValueFrom(
        forkJoin([
          this.projectService.GetProjects(1),
          this.projectService.GetProjectUserMappings(),
          this.taskService.getAllTasks(1),
          this.userService.GetAllUsers(),
        ])
      );

    this.projects = projectsData.map((project) => {
      return {
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
          .map((mapping) => {
            let user = userData.find((user) => user.id === mapping.userId);
            return {
              id: mapping?.userId,
              name: user?.name,
              email: user?.email,
            } as TeamMember;
          }),
        progress:
          taskData.filter(
            (task) => task.projectId === project.id && task.statusId === 3
          ).length /
          (taskData.filter((task) => task.projectId === project.id).length ||
            1),
      };
    });

    this.activeProjectsCount = this.projects.filter(
      (project) => project.status === 'Active'
    ).length;

    this.completedProjectsCount = this.projects.filter(
      (project) => project.status === 'Completed'
    ).length;
  }

  filterProjects($event: string): void {
    this.filterString = $event;
  }
}
