import { ActivatedRoute } from '@angular/router';
import { project_user_mappings } from './../../../../data/project-user-mapping-data';
import { user_data } from './../../../../data/user-data';
import { Component, Input } from '@angular/core';
import { project_data } from '../../../../data/project-data';
import { status_data } from '../../../../data/status-priority-data';
import { Project, ProjectList, TeamMember } from '../../../models/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.css',
})
export class AddEditProjectComponent {
  projectId: number;
  projectDetails: Project;
  projectDisplayDetails: ProjectList;
  projectForm: FormGroup;
  taskDetails: any;
  taskForm: any;
  teamMembers: number[] = [];
  userData = user_data;

  constructor(private activatedRoute: ActivatedRoute) {
    this.projectId = parseInt(
      this.activatedRoute.snapshot.params['projectId'] ?? 0
    );

    this.projectDetails =
      project_data.find((project) => project.id === this.projectId) ??
      ({} as Project);

    console.log(this.projectDetails);

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
        .map((mapping) => {
          let user = user_data.find((user) => user.id === mapping.userId);
          return {
            id: mapping?.userId,
            name: user?.name,
            email: user?.email,
          } as TeamMember;
        }),
      progress: 0,
    };

    this.teamMembers = this.projectDisplayDetails.teamMembers.map(
      (member) => member.id
    );

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
        this.projectDetails.statusId?.toString() ?? 4,
        Validators.required
      ),
      teamMembers: new FormControl(
        this.projectDisplayDetails.teamMembers.map((member) => member.id),
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    this.projectForm
      .get('teamMembers')
      ?.valueChanges.subscribe((value: string[]) => {
        this.teamMembers = value.map((member) => parseInt(member));
        console.log('Updated Team Members:', this.teamMembers);
      });
  }

  saveProject() {
    console.log(this.projectForm.value);
  }
}
