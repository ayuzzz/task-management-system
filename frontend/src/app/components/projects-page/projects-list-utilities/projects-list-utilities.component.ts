import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../models/project';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'projects-list-utilities',
  templateUrl: './projects-list-utilities.component.html',
  styleUrl: './projects-list-utilities.component.css',
})
export class ProjectsListUtilitiesComponent implements OnInit {
  @Input()
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  filterString: string = '';
  projectId: number = 0;

  @Output()
  filterStringChangeEvent = new EventEmitter<string>();

  constructor(private router: Router, private projectService: ProjectService) {}

  async ngOnInit() {
    await this.getProjectDetails(1);
    this.filteredProjects = this.projects;
  }

  async getProjectDetails(userId: number) {
    await lastValueFrom(this.projectService.GetProjects(userId)).then(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error getting projects: ', error);
      }
    );
  }

  filterProjects(): void {
    this.filterStringChangeEvent.emit(this.filterString);
  }

  addNewProject(): void {
    this.projects.forEach((project) => {
      if (project.id > this.projectId) {
        this.projectId = project.id;
      }
    });

    this.projectId++;

    this.router.navigate(['/projects/add-edit', this.projectId]);
  }
}
