import { ProjectService } from './../../../services/project.service';
import { lastValueFrom } from 'rxjs';
import { TaskService } from './../../../services/task.service';
import { Task } from './../../../models/task';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project';

@Component({
  selector: 'add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css',
})
export class AddEditTaskComponent implements OnInit {
  taskId: number = 0;
  taskDetails: Task = {} as Task;
  taskForm: FormGroup;
  projects: Project[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId')) ?? 0;

    this.taskForm = new FormGroup({
      title: new FormControl(this.taskDetails.title ?? '', [
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
      dueDate: new FormControl(this.taskDetails.dueDate, Validators.required),
      priority: new FormControl(
        this.taskDetails.priorityId?.toString() ?? '',
        Validators.required
      ),
      status: new FormControl(
        this.taskDetails.statusId?.toString() ?? '',
        Validators.required
      ),
      project: new FormControl(
        this.taskDetails?.projectId ?? 0,
        Validators.required
      ),
    });
  }

  async ngOnInit() {
    await this.getTaskDetails();
    this.projectService.GetProjects(1).subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error getting projects: ', error);
      }
    );
    this.taskForm.get('title')?.setValue(this.taskDetails.title);
    this.taskForm.get('description')?.setValue(this.taskDetails.description);
    this.taskForm.get('dueDate')?.setValue(this.taskDetails.dueDate);
    this.taskForm
      .get('priority')
      ?.setValue(this.taskDetails.priorityId?.toString());
    this.taskForm
      .get('status')
      ?.setValue(this.taskDetails.statusId?.toString());
    this.taskForm.get('project')?.setValue(this.taskDetails.projectId);
  }

  async getTaskDetails() {
    await lastValueFrom(this.taskService.GetTaskDetails(this.taskId)).then(
      (data) => (this.taskDetails = data ?? { projectId: 0 })
    );
  }

  async saveTask() {
    this.taskDetails = {
      id: this.taskId,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      priorityId: Number(this.taskForm.value.priority),
      statusId: Number(this.taskForm.value.status),
      projectId: Number(this.taskForm.value.project),
      userId: 1,
    };

    let insertedTaskId = 0;

    this.taskService.CreateNewTask(this.taskDetails).subscribe(
      (data) => {
        insertedTaskId = data;

        if (insertedTaskId > 0) {
          alert('Task saved successfully');
        } else {
          alert('Could not save the task !');
        }
      },
      (error) => {
        console.error('Error saving task: ', error);
      }
    );

    console.log(this.taskDetails);
  }
}
