import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  user: any = {};

  totalBookings = 0;
  activeBookings = 0;
  completedBookings = 0;

  recentBookings: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const data = sessionStorage.getItem('user');

    if (data) {

      this.user = JSON.parse(data);

      console.log('User Data:', this.user);

      this.loadDashboard();
    }
  }

  loadDashboard(): void {

    this.authService
      .getUserDashboardData(this.user.id)
      .subscribe({

        next: (response: any) => {

          console.log('Dashboard Response:', response);

          this.totalBookings = response.totalBookings;
          this.activeBookings = response.activeBookings;
          this.completedBookings = response.completedBookings;

          this.recentBookings = response.recentBookings;

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(error);
        }
      });
  }

  logout(): void {

    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}