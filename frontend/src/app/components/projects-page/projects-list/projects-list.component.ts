import { StatusPriorityService } from './../../../services/status-priority.service';
import { ProjectList } from '../../../models/project';
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
import { StatusPriorityTextHelper } from '../../../utilities/status-priority-text-helper';
import { MatDialog } from '@angular/material/dialog';
import { TaskStatusDialogComponent } from '../task-status-dialog/task-status-dialog.component';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
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

  constructor(
    private dialog: MatDialog,
    private statusPriorityService: StatusPriorityService
  ) {}

  async ngOnInit() {
    this.statusPriorityService.GetStatusData().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error getting status data: ', error);
      }
    );
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

  archiveProject(projectId: number) {
    alert('Archive project with id: ' + projectId);
  }

  getTextColor(type: string, textValue: string): string {
    if (type === 'status') {
      return StatusPriorityTextHelper.getStatusTextColor(textValue);
    } else {
      return StatusPriorityTextHelper.getPriorityTextColor(textValue);
    }
  }

  openTaskStatusDialog(projectId: number) {
    this.dialog.open(TaskStatusDialogComponent, {
      width: '400px',
      height: 'auto',
      data: {
        projectId: projectId,
      },
    });
  }
}
