import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: string = '';

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user?.nickname ?? 'NA';
    });
  }
}
