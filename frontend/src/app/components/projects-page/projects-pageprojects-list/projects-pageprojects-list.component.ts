import { ProjectList } from './../../../models/project';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from '../../../models/status';
import { status_data } from '../../../../data/status-priority-data';
import { StatusPriorityTextHelper } from '../../../utilities/status-priority-text-helper';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-pageprojects-list.component.html',
  styleUrl: './projects-pageprojects-list.component.css',
})
export class ProjectsListComponent implements OnInit, OnChanges {
  @Input()
  projects: ProjectList[] = [];

  @Input()
  filterString: string = '';

  statuses: Status[] = [];
  filteredProjects: ProjectList[] = [];
  displayedColumns: string[] = [
    'name',
    'description',
    'dueDate',
    'status',
    'teamMembers',
    'Progress',
    'actions',
  ];
  dataSource: MatTableDataSource<ProjectList> =
    new MatTableDataSource<ProjectList>([]);

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

  filterProjects(): ProjectList[] {
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
  getInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0)).join('');
    return initials.toUpperCase();
  }

  viewProject(_t99: any) {
    throw new Error('Method not implemented.');
  }
  editProject(_t99: any) {
    throw new Error('Method not implemented.');
  }
  archiveProject(_t99: any) {
    throw new Error('Method not implemented.');
  }

  getTextColor(type: string, textValue: string): string {
    if (type === 'status') {
      console.log(StatusPriorityTextHelper.getStatusTextColor(textValue));
      return StatusPriorityTextHelper.getStatusTextColor(textValue);
    } else {
      return StatusPriorityTextHelper.getPriorityTextColor(textValue);
    }
  }
}
