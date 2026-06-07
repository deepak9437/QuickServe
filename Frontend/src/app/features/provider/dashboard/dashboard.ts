import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class providerdashboardComponent {
  provider = {
    name: 'Rajesh Kumar',
    skills: 'Electrician',
    rating: 4.9,
    status: 'Approved',
  };

  stats = {
    totalBookings: 124,
    pendingBookings: 8,
    completedJobs: 116,
    earnings: 45200,
  };

  recentBookings = [
    {
      customer: 'Soumya Das',
      service: 'Electrical Repair',
      date: '10 Jun 2026',
      status: 'Pending',
    },
    {
      customer: 'Rakesh Kumar',
      service: 'Wiring Installation',
      date: '08 Jun 2026',
      status: 'Completed',
    },
    {
      customer: 'Priya Sharma',
      service: 'Fan Repair',
      date: '05 Jun 2026',
      status: 'Completed',
    },
  ];
}
