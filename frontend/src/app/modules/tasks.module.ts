import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RecentTasksListComponent } from '../components/dashboard/recent-tasks-list/recent-tasks-list.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from '../components/dashboard/dashboard.routes';

@NgModule({
  declarations: [DashboardComponent, RecentTasksListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(dashboardRoutes)],
})
export class TasksModule {}
