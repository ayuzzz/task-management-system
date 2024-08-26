import { MiniatureTask, Task } from './../../../models/task';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { task_data } from '../../../../data/task-data';
import {
  priority_data,
  status_data,
} from '../../../../data/status-priority-data';
import { project_data } from '../../../../data/project-data';

@Component({
  selector: 'add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css',
})
export class AddEditTaskComponent implements OnInit {
  taskId: number = 0;
  taskDetails: Task = {} as Task;
  taskDisplayDetails: MiniatureTask = {} as MiniatureTask;
  projectData = project_data;
  taskForm: FormGroup;

  constructor(private route: ActivatedRoute) {
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId')) ?? 0;
    this.taskDetails =
      task_data.find((task) => task.id === this.taskId) ?? ({} as Task);
    this.taskDisplayDetails = this.getMiniatureTaskDetails();

    this.taskForm = new FormGroup({
      title: new FormControl(this.taskDisplayDetails.title ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl(this.taskDetails.description ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      // TODO: Add validation for being more than current Date
      dueDate: new FormControl(
        this.taskDisplayDetails.dueDate,
        Validators.required
      ),
      priority: new FormControl(
        this.taskDetails.priorityId,
        Validators.required
      ),
      status: new FormControl(this.taskDetails.statusId, Validators.required),
      project: new FormControl(this.taskDetails.projectId, Validators.required),
    });
  }

  ngOnInit(): void {}

  getMiniatureTaskDetails(): MiniatureTask {
    return {
      id: this.taskId,
      title: this.taskDetails?.title ?? '',
      dueDate: this.taskDetails?.dueDate ?? '',
      priority:
        priority_data.find((p) => p.id === this.taskDetails?.priorityId)
          ?.level ?? '',
      status:
        status_data.find((s) => s.id === this.taskDetails?.statusId)?.status ??
        '',
      project:
        this.projectData.find((p) => p.id === this.taskDetails?.projectId)
          ?.name ?? '',
    };
  }

  saveTask(): void {
    console.log(this.taskForm.value);
    this.taskDetails = {
      id: this.taskId,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      priorityId: Number(this.taskForm.value.priority),
      statusId: Number(this.taskForm.value.status),
      projectId: Number(this.taskForm.value.project),
      userId: 0,
    };
    console.log(this.taskDetails);
  }
}
