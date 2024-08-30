import { Component } from '@angular/core';

@Component({
  selector: 'profile-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  login(): void {}
}
