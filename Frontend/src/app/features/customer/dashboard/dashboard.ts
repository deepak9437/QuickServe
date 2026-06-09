import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  user: any = {};

  totalBookings = 0;
  activeRequests = 0;
  favouriteProviders = 0;

  recentBookings = [
    {
      serviceName: 'Electrician',
      status: 'Completed'
    },
    {
      serviceName: 'Plumber',
      status: 'Pending'
    }
  ];

  constructor(private router: Router) {

    this.user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );
  }

  goToProfile() {
    this.router.navigate(['/customer-profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}