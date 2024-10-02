import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TasksListComponent } from '../components/dashboard/tasks-list/tasks-list.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from '../components/dashboard/dashboard.routes';
import { AddEditTaskComponent } from '../components/dashboard/add-edit-task/add-edit-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashboardComponent, TasksListComponent, AddEditTaskComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class TasksModule {}
