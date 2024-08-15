import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Project } from '../../../models/project';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from '../../../models/status';
import { status_data } from '../../../../data/status-priority-data';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-pageprojects-list.component.html',
  styleUrl: './projects-pageprojects-list.component.css',
})
export class ProjectsListComponent implements OnInit, OnChanges {
  @Input()
  projects: Project[] = [];

  @Input()
  filterString: string = '';

  statuses: Status[] = [];
  filteredProjects: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'dueDate', 'status'];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);
  @ViewChild(MatSort) sortBy!: MatSort;

  ngOnInit(): void {
    this.statuses = status_data;
    this.filteredProjects = this.projects;
    this.dataSource.data = this.filteredProjects;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredProjects = this.filterProjects();
    this.dataSource.data = this.filteredProjects;
  }

  ngAfterViewInit() {
    if (this.sortBy) {
      this.dataSource.sort = this.sortBy;
    }
  }

  filterProjects(): Project[] {
    return this.projects.filter(
      (project) =>
        project.name
          .toLocaleUpperCase()
          .includes(this.filterString.toLocaleUpperCase()) ||
        project.description
          .toLocaleUpperCase()
          .includes(this.filterString.toLocaleUpperCase())
    );
  }
}
