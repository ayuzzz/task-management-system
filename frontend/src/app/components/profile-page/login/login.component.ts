import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'profile-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  name: string = '';
  password: string = '';
  profileImageUrl: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.email = user.email ?? 'NA';
        this.name = user.nickname ?? 'NA';
        this.profileImageUrl =
          user.picture ??
          'https://www.pngall.com/wp-content/uploads/5/Profile-Male-Transparent.png';
      }

      this.userService
        .SaveUserDetails({ id: 0, name: this.name, email: this.email })
        .subscribe((data) => {
          console.log(
            `User details : { id -> ${0}, name -> ${this.name}, email -> ${
              this.email
            }`
          );
        });

      this.authService.isAuthenticated$.subscribe((autheticationStatus) => {
        this.isLoggedIn = autheticationStatus;
      });
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
