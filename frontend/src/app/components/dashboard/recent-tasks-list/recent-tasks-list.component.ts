import {
  status_data,
  priority_data,
} from './../../../../data/status-priority-data';
import { project_data } from './../../../../data/project-data';
import { Component, OnInit } from '@angular/core';
import { task_data } from '../../../../data/task-data';
import { RecentTask } from '../../../models/task';
import { StatusPriorityTextHelper } from '../../../utilities/status-priority-text-helper';

@Component({
  selector: 'recent-tasks-list',
  templateUrl: './recent-tasks-list.component.html',
  styleUrl: './recent-tasks-list.component.css',
})
export class RecentTasksListComponent implements OnInit {
  recentTasks: RecentTask[] = [];
  statusData = status_data;
  priorityData = priority_data;
  projectData = project_data;
  displayedColumns: string[] = [
    'title',
    'project',
    'dueDate',
    'priority',
    'status',
    'actions',
  ];

  ngOnInit(): void {
    task_data.slice(0, 3).map((task) => {
      this.recentTasks.push({
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
        priority:
          this.priorityData.find((p) => p.id === task.priorityId)?.level ||
          'NA',
        status:
          this.statusData.find((s) => s.id === task.statusId)?.status || 'NA',
        project:
          this.projectData.find((project) => project.id === task.projectId)
            ?.name || 'NA',
      });
    });
  }

  getTextColor(type: string, textValue: string): string {
    if (type === 'status') {
      return StatusPriorityTextHelper.getStatusTextColor(textValue);
    } else {
      return StatusPriorityTextHelper.getPriorityTextColor(textValue);
    }
  }
}
