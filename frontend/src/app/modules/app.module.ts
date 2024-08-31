import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';

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
  providers: [
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-2kfsaye6ipkg4zd8.us.auth0.com',
      clientId: 's8vtstbFlLhIr0L8MKU7XPam3PYGV6VI',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  bootstrap: [AppComponent],
  exports: [SharedModule],
})
export class AppModule {}
