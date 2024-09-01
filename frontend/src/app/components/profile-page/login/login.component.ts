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
  profileImageUrl: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.email = user.email ?? 'NA';
        this.name = user.nickname ?? 'NA';
        this.profileImageUrl =
          user.picture ??
          'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png';
      }
    });

    this.authService.isAuthenticated$.subscribe((autheticationStatus) => {
      this.isLoggedIn = autheticationStatus;
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
    this.authService.logout({ logoutParams: options });
  }
}
