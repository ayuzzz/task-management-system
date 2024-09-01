import { Component, Inject, Input, OnInit } from '@angular/core';
import { task_data } from '../../../../data/task-data';
import { Task } from '../../../models/task';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-status-dialog',
  templateUrl: './task-status-dialog.component.html',
  styleUrl: './task-status-dialog.component.css',
})
export class TaskStatusDialogComponent {
  projectId: number;
  completedTasksCount: number;
  inProgressTasksCount: number;
  notStartedTasksCount: number;
  totalTasks: Task[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.projectId = data.projectId;
    this.totalTasks = task_data.filter(
      (task) => task.projectId === this.projectId
    );

    this.completedTasksCount = this.totalTasks.filter(
      (task) => task.statusId === 3
    ).length;

    this.inProgressTasksCount = this.totalTasks.filter(
      (task) => task.statusId === 2
    ).length;

    this.notStartedTasksCount = this.totalTasks.filter(
      (task) => task.statusId === 1
    ).length;
  }
}
