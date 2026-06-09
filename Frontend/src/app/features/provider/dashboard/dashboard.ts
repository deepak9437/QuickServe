import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class providerdashboardComponent {

  provider: any = {};

  recentActivities = [
    'New Booking Request',
    'Profile Approved',
    'Received a New Review'
  ];

  constructor(private router: Router) {

    this.provider = JSON.parse(
      localStorage.getItem('provider') || '{}'
    );
  }

  viewProfile() {
    this.router.navigate(['/provider-profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}