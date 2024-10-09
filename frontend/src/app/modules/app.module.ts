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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';

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
    {
      provide: HTTP_INTERCEPTORS, // Register the interceptor
      useClass: TokenInterceptorService,
      multi: true, // This allows multiple interceptors to work together
    },
    provideAuth0({
      domain: 'dev-2kfsaye6ipkg4zd8.us.auth0.com',
      clientId: 's8vtstbFlLhIr0L8MKU7XPam3PYGV6VI',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      authorizationParams: {
        redirect_uri: `${window.location.origin}/profile`,
        audience: 'https://tms-auth0-api',
      },
    }),
  ],
  bootstrap: [AppComponent],
  exports: [SharedModule],
})
export class AppModule {}
