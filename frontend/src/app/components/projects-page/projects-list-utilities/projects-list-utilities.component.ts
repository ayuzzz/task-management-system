import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../models/project';
import { project_data } from '../../../../data/project-data';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredProjects = this.projects;
  }

  filterProjects(): void {
    this.filterStringChangeEvent.emit(this.filterString);
  }

  addNewProject(): void {
    project_data.forEach((project) => {
      if (project.id > this.projectId) {
        this.projectId = project.id;
      }
    });

    this.projectId++;

    this.router.navigate(['/projects/add-edit', this.projectId]);
  }
}
