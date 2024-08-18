import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { task_data } from '../../../data/task-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  taskData: Task[] = [];
  completedTasksCount: number = 0;
  inProgressTasksCount: number = 0;
  notStartedTasksCount: number = 0;

  ngOnInit(): void {
    this.taskData = task_data;
    this.completedTasksCount = this.taskData.filter(
      (task) => task.statusId === 3
    ).length;

    this.inProgressTasksCount = this.taskData.filter(
      (task) => task.statusId === 2
    ).length;

    this.notStartedTasksCount = this.taskData.filter(
      (task) => task.statusId === 1
    ).length;
  }
}
