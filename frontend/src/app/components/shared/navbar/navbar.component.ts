import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: string = '';
  ngOnInit() {
    this.user = sessionStorage.getItem('name') ?? 'NA';
  }
}
