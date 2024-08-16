import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from '../app.component';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app.routes';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { SharedModule } from './shared.module';
import { ProjectsModule } from './projects.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    ProjectsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [SharedModule],
})
export class AppModule {}
