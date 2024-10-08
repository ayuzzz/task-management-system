import { Component, OnInit } from '@angular/core';
import { MiniatureTask } from '../../models/task';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  taskId: number = 0;
  taskData: MiniatureTask[] = [];
  completedTasksCount: number = 0;
  inProgressTasksCount: number = 0;
  notStartedTasksCount: number = 0;

  tasks: MiniatureTask[] = [];
  allTasksDisplayed: boolean = false;

  constructor(private router: Router, private tasksService: TaskService) {}

  async ngOnInit() {
    await lastValueFrom(this.tasksService.GetMiniatureTasks(1)).then((data) => {
      this.taskData = data;
    });
    this.completedTasksCount = this.taskData.filter(
      (task) => task.status === 'Completed'
    ).length;

    this.inProgressTasksCount = this.taskData.filter(
      (task) => task.status === 'In Progress'
    ).length;

    this.notStartedTasksCount = this.taskData.filter(
      (task) => task.status === 'Not Started'
    ).length;

    this.tasks = this.getRecentTasksDetails();
  }

  addNewTask(): void {
    this.taskData.forEach((task) => {
      if (task.id > this.taskId) {
        this.taskId = task.id;
      }
    });

    this.taskId++;

    this.router.navigate(['/dashboard/add-edit', this.taskId]);
  }

  getRecentTasksDetails(): MiniatureTask[] {
    return this.taskData.slice(0, 3);
  }

  toggleAllTasksDisplayed(): void {
    this.allTasksDisplayed = !this.allTasksDisplayed;
    this.tasks = this.allTasksDisplayed
      ? this.taskData
      : this.getRecentTasksDetails();
  }
}
