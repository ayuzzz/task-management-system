import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'profile-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  isLogedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.email = user.email ?? 'NA';
        this.name = user.name ?? 'NA';
        sessionStorage.setItem('email', this.email);
        sessionStorage.setItem('name', this.name);
      }
    });

    this.authService.isAuthenticated$.subscribe((autheticationStatus) => {
      this.isLogedIn = autheticationStatus;
    });
  }

  login(): void {
    const options = {
      redirect_uri: window.location.origin,
      appState: { target: '/profile' },
      scope: 'profile email',
    };

    this.authService.loginWithRedirect(options);
  }

  logout(): void {
    const options = {
      returnTo: `${window.location.origin}/profile`,
    };

    sessionStorage.removeItem('email');
    sessionStorage.removeItem('name');
    this.authService.logout({ logoutParams: options });
  }
}
