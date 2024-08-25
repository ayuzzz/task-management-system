import { ActivatedRoute } from '@angular/router';
import { project_user_mappings } from './../../../../data/project-user-mapping-data';
import { user_data } from './../../../../data/user-data';
import { Component, Input } from '@angular/core';
import { project_data } from '../../../../data/project-data';
import { status_data } from '../../../../data/status-priority-data';
import { Project, ProjectList } from '../../../models/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.css',
})
export class AddEditProjectComponent {
  saveProject() {
    console.log(this.projectForm.value);
  }

  projectId: number;
  projectDetails: Project;
  projectDisplayDetails: ProjectList;
  projectForm: FormGroup;
  taskDetails: any;
  taskForm: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.projectId = parseInt(
      this.activatedRoute.snapshot.params['projectId'] ?? '0'
    );
    this.projectDetails =
      project_data.find((project) => project.id === this.projectId) ??
      ({} as Project);

    this.projectDisplayDetails = {
      id: this.projectDetails.id,
      name: this.projectDetails.name,
      description: this.projectDetails.description,
      dueDate: this.projectDetails.dueDate,
      userId: this.projectDetails.userId,
      status:
        status_data.find((s) => s.id === this.projectDetails.statusId)
          ?.status ?? 'NA',
      teamMembers: project_user_mappings
        .filter((mapping) => mapping.projectId === this.projectId)
        .map(
          (mapping) =>
            user_data.find((user) => user.id === mapping.userId)?.name || 'NA'
        ),
      progress: 0,
    };

    this.projectForm = new FormGroup({
      name: new FormControl(this.projectDetails.name ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl(this.projectDetails.description ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      // TODO: Add validation for being more than current Date
      dueDate: new FormControl(
        this.projectDetails.dueDate,
        Validators.required
      ),
      status: new FormControl(
        this.projectDetails.statusId.toString(),
        Validators.required
      ),
    });
  }
}
