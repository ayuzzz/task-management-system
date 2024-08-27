import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from '../app.component';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app.routes';
import { SharedModule } from './shared.module';
import { ProjectsModule } from './projects.module';
import { TasksModule } from './tasks.module';
import { ProfileModule } from './profile.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    ProjectsModule,
    TasksModule,
    ProfileModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [SharedModule],
})
export class AppModule {}
