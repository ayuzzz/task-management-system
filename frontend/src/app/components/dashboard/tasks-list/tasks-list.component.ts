import { MiniatureTask } from '../../../models/task';
import { Component, Input } from '@angular/core';
import { StatusPriorityTextHelper } from '../../../utilities/status-priority-text-helper';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent {
  @Input()
  tasks: MiniatureTask[] = [];
  displayedColumns: string[] = [
    'title',
    'project',
    'dueDate',
    'priority',
    'status',
    'actions',
  ];

  getTextColor(type: string, textValue: string): string {
    if (type === 'status') {
      return StatusPriorityTextHelper.getStatusTextColor(textValue);
    } else {
      return StatusPriorityTextHelper.getPriorityTextColor(textValue);
    }
  }
}
