import { Component, Inject, OnInit } from '@angular/core';
import { Task } from '../../../models/task';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../../services/task.service';
import { StatusPriorityService } from '../../../services/status-priority.service';
import { Status } from '../../../models/status';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-task-status-dialog',
  templateUrl: './task-status-dialog.component.html',
  styleUrl: './task-status-dialog.component.css',
})
export class TaskStatusDialogComponent implements OnInit {
  projectId: number;
  taskData: Task[] = [];
  completedTasksCount = 0;
  inProgressTasksCount = 0;
  notStartedTasksCount = 0;
  totalTasks: Task[] = [];
  statuses: Status[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private taskService: TaskService,
    private statusPriorityService: StatusPriorityService
  ) {
    this.projectId = data.projectId;
  }

  async ngOnInit() {
    forkJoin({
      tasks: this.taskService.getAllTasks(1),
      statuses: this.statusPriorityService.GetStatusData(),
    }).subscribe(({ tasks, statuses }) => {
      this.taskData = tasks;
      this.statuses = statuses;

      this.totalTasks = this.taskData.filter(
        (task) => task.projectId === this.projectId
      );

      this.completedTasksCount = this.totalTasks.filter(
        (task) =>
          task.statusId ===
          this.statuses.find((s) => s.status === 'Completed')?.id
      ).length;

      this.inProgressTasksCount = this.totalTasks.filter(
        (task) =>
          task.statusId ===
          this.statuses.find((s) => s.status === 'In Progress')?.id
      ).length;

      this.notStartedTasksCount = this.totalTasks.filter(
        (task) =>
          task.statusId ===
          this.statuses.find((s) => s.status === 'Not Started')?.id
      ).length;
    });
  }
}
