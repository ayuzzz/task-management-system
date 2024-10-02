import { StatusPriorityService } from './../../../services/status-priority.service';
import { MiniatureTask } from '../../../models/task';
import { Component, Input, OnInit } from '@angular/core';
import { StatusPriorityTextHelper } from '../../../utilities/status-priority-text-helper';
import { TaskService } from '../../../services/task.service';
import { Status } from '../../../models/status';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit {
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
  status: Status[] = [];

  constructor(
    private taskService: TaskService,
    private statusPriorityService: StatusPriorityService
  ) {}

  async ngOnInit() {
    this.statusPriorityService.GetStatusData().subscribe(
      (data) => {
        this.status = data;
      },
      (error) => {
        console.error('Error getting status data: ', error);
      }
    );
  }

  getTextColor(type: string, textValue: string): string {
    if (type === 'status') {
      return StatusPriorityTextHelper.getStatusTextColor(textValue);
    } else {
      return StatusPriorityTextHelper.getPriorityTextColor(textValue);
    }
  }

  async completeTask(taskId: number) {
    this.taskService.DeleteTask(taskId).subscribe(
      (data) => {
        if (data == this.status.find((s) => s.status === 'Completed')?.id) {
          alert('Task completed successfully !');
        }
      },
      (error) => {
        console.error('Error updating task: ', error);
      }
    );

    console.log('Task completed with id: ', taskId);
  }

  async deleteTask(taskId: number) {
    this.taskService.DeleteTask(taskId).subscribe(
      (data) => {
        console.log('Number of records deleted: ', data);
        if (data == 1) {
          alert('Task deleted successfully with id: ' + taskId);
        }
      },
      (error) => {
        console.error('Error deleting task: ', error);
      }
    );
  }
}
