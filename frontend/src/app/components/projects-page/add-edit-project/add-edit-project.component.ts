import { StatusPriorityService } from './../../../services/status-priority.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {
  Project,
  ProjectList,
  ProjectUserMapping,
  TeamMember,
} from '../../../models/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Status } from '../../../models/status';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.css',
})
export class AddEditProjectComponent {
  projectId: number;
  projectDetails: Project = {} as Project;
  projectUserMappings: ProjectUserMapping[] = [] as ProjectUserMapping[];
  projectDisplayDetails: ProjectList = {} as ProjectList;
  projectForm: FormGroup;
  taskDetails: any;
  taskForm: any;
  teamMembers: number[] = [];
  userData: User[] = [];
  statuses: Status[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private statusPriorityService: StatusPriorityService,
    private userService: UserService
  ) {
    this.projectId = parseInt(
      this.activatedRoute.snapshot.params['projectId'] ?? 0
    );

    this.projectForm = new FormGroup({
      name: new FormControl(this.projectDetails?.name ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl(this.projectDetails?.description ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      // TODO: Add validation for being more than current Date
      dueDate: new FormControl(
        this.projectDetails?.dueDate,
        Validators.required
      ),
      status: new FormControl(
        this.projectDetails.statusId?.toString() ?? 4,
        Validators.required
      ),
      teamMembers: new FormControl(
        this.projectDisplayDetails?.teamMembers?.map((member) => member.id),
        Validators.required
      ),
    });
  }

  async ngOnInit() {
    this.statusPriorityService.GetStatusData().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error getting status data: ', error);
      }
    );

    await this.GetProjectDetails();
    await this.GetProjectUserMappings();
    await this.GetUserDetails();

    this.projectDisplayDetails = {
      id: this.projectId,
      name: this.projectDetails?.name,
      description: this.projectDetails?.description,
      dueDate: this.projectDetails?.dueDate,
      userId: this.projectDetails?.userId,
      status:
        this.statuses.find((s) => s.id === this.projectDetails?.statusId)
          ?.status ?? 'NA',
      teamMembers: this.projectUserMappings
        .filter((mapping) => mapping.projectId === this.projectId)
        .map((mapping) => {
          let user = this.userData.find((user) => user.id === mapping.userId);
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

    this.projectForm.get('name')?.setValue(this.projectDetails?.name);
    this.projectForm
      .get('description')
      ?.setValue(this.projectDetails?.description);
    this.projectForm.get('dueDate')?.setValue(this.projectDetails?.dueDate);
    this.projectForm
      .get('status')
      ?.setValue(this.projectDetails?.statusId?.toString());
    this.projectForm.get('teamMembers')?.setValue(this.teamMembers);

    this.projectForm
      .get('teamMembers')
      ?.valueChanges.subscribe((value: string[]) => {
        this.teamMembers = value.map((member) => parseInt(member));
        console.log('Updated Team Members:', this.teamMembers);
      });
  }

  async GetUserDetails() {
    await lastValueFrom(this.userService.GetAllUsers()).then(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error getting user data: ', error);
      }
    );
  }

  async GetProjectDetails() {
    await lastValueFrom(this.projectService.GetProject(this.projectId)).then(
      (data) => {
        this.projectDetails = data;
      },
      (error) => {
        console.error('Error getting project details: ', error);
      }
    );
  }

  async GetProjectUserMappings() {
    await lastValueFrom(this.projectService.GetProjectUserMappings()).then(
      (data) => {
        this.projectUserMappings = data;
      },
      (error) => {
        console.error('Error getting project user data: ', error);
      }
    );
  }

  async saveProject() {
    await lastValueFrom(
      this.projectService.UpsertProject({
        id: this.projectId,
        name: this.projectForm.get('name')?.value,
        description: this.projectForm.get('description')?.value,
        dueDate: this.projectForm.get('dueDate')?.value,
        userId: this.projectDetails.userId,
        statusId: parseInt(this.projectForm.get('status')?.value),
        TeamMembers: this.teamMembers,
      })
    ).then(
      (data) => {
        alert('Project saved successfully');
      },
      (error) => {
        console.error('Error saving project: ', error);
      }
    );

    console.log(this.projectForm.value);
  }
}
