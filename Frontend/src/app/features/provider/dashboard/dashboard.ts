import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../../core/services/auth";
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class providerdashboardComponent implements OnInit {

  provider: any = {};

  totalBookings = 0;
  pendingRequests = 0;
  completedJobs = 0;

  recentBookings: any[] = [];

  constructor(
    private dashboardService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const data = sessionStorage.getItem('user');

    if (data) {

      this.provider = JSON.parse(data);

      console.log('Provider Data:', this.provider);

      this.loadDashboard();
    }
  }

  loadDashboard(): void {

  const pId = this.provider.id;

  this.dashboardService
    .getDashboardData(pId)
    .subscribe({

      next: (response) => {

        this.totalBookings = response.totalBookings;
        this.pendingRequests = response.pendingRequests;
        this.completedJobs = response.completedJobs;

        this.recentBookings = response.recentBookings;

        this.cdr.detectChanges(); // important
      },

        error: (error: any) => {
          console.log('Status:', error.status);
          console.log('Message:', error.message);
          console.log('Error:', error);
        }
      });
  }
}