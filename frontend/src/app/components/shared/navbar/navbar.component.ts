import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  profileImageUrl: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.profileImageUrl =
        user?.picture ??
        'https://www.pngall.com/wp-content/uploads/5/Profile-Male-Transparent.png';
    });

    this.authService.isAuthenticated$.subscribe((authenticationStatus) => {
      this.isLoggedIn = authenticationStatus;
    });
  }

  navigateToProfilePage() {
    this.router.navigate(['/profile']);
  }
}
