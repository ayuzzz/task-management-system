import { Component, OnInit } from '@angular/core';
import { MiniatureTask, Task } from '../../models/task';
import { task_data } from '../../../data/task-data';
import { priority_data, status_data } from '../../../data/status-priority-data';
import { project_data } from '../../../data/project-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  taskId: number = 0;
  taskData: Task[] = [];
  completedTasksCount: number = 0;
  inProgressTasksCount: number = 0;
  notStartedTasksCount: number = 0;

  tasks: MiniatureTask[] = [];
  allTasksDisplayed: boolean = false;

  constructor(private router: Router) {}

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

  getAllTasksDetails(): MiniatureTask[] {
    let allTasks: MiniatureTask[] = [];

    this.taskData.map((task) => {
      allTasks.push({
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
        priority:
          priority_data.find((p) => p.id === task.priorityId)?.level || 'NA',
        status: status_data.find((s) => s.id === task.statusId)?.status || 'NA',
        project:
          project_data.find((project) => project.id === task.projectId)?.name ||
          'NA',
      });
    });

    return allTasks;
  }

  getRecentTasksDetails(): MiniatureTask[] {
    let recentTasksList: MiniatureTask[] = [];

    this.taskData.slice(0, 3).map((task) => {
      recentTasksList.push({
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
        priority:
          priority_data.find((p) => p.id === task.priorityId)?.level || 'NA',
        status: status_data.find((s) => s.id === task.statusId)?.status || 'NA',
        project:
          project_data.find((project) => project.id === task.projectId)?.name ||
          'NA',
      });
    });

    return recentTasksList;
  }

  toggleAllTasksDisplayed(): void {
    this.allTasksDisplayed = !this.allTasksDisplayed;
    this.tasks = this.allTasksDisplayed
      ? this.getAllTasksDetails()
      : this.getRecentTasksDetails();
  }
}
