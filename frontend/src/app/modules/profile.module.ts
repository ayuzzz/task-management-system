import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { profileRoutes } from '../components/profile-page/profile.routes';
import { CommonComponent } from '../components/profile-page/common/common.component';
import { LoginComponent } from '../components/profile-page/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommonComponent, LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(profileRoutes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ProfileModule {}
