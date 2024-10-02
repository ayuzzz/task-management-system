import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let isAuthenticated = false;
    this.authService.isAuthenticated$.subscribe((autheticationStatus) => {
      isAuthenticated = autheticationStatus;
    });

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/profile']); // Redirect to the login page
      return false;
    }
  }
}
