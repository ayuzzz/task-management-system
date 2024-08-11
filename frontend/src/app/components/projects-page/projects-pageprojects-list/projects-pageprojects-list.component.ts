import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { project_data } from '../../../../data/project-data';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-pageprojects-list.component.html',
  styleUrl: './projects-pageprojects-list.component.css',
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = project_data;
  }
}
