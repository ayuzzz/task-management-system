import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from '../app.component';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app.routes';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { SharedModule } from './shared.module';
import { ProjectsModule } from './projects.module';
import { TasksModule } from './tasks.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ProfilePageComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    ProjectsModule,
    TasksModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [SharedModule],
})
export class AppModule {}
