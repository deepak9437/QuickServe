import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {

  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!sessionStorage.getItem('user');
  }

  logout() {
    sessionStorage.removeItem('user');

    this.isLoggedIn = false;

    this.router.navigate(['/']);
  }
}