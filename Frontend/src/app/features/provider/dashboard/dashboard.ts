import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AuthService } from "../../../core/services/auth";

@Component({
  selector: "app-provider-dashboard",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class providerdashboardComponent implements OnInit {
  provider: any = {};

  providerId = 0;

  totalBookings = 0;
  pendingRequests = 0;
  completedJobs = 0;

  recentBookings: any[] = [];

  constructor(
    private dashboardService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const data = sessionStorage.getItem("user");

    if (data) {
      this.provider = JSON.parse(data);

      const userId = this.provider.id;

      this.dashboardService.getProviderId(userId).subscribe({
        next: (pId) => {
          this.providerId = pId;

          this.loadDashboard(pId);
        },

        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  loadDashboard(pId: number): void {
    this.dashboardService.getDashboardData(pId).subscribe({
      next: (response: any) => {
        this.totalBookings = response.totalBookings || 0;

        this.pendingRequests = response.pendingRequests || 0;

        this.completedJobs = response.completedJobs || 0;

        this.recentBookings = response.recentBookings || [];

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  acceptBooking(id: number) {
    this.dashboardService.acceptBooking(id).subscribe(() => {
      this.loadDashboard(this.providerId);
    });
  }

  rejectBooking(id: number) {
    this.dashboardService.cancelBooking(id).subscribe(() => {
      this.loadDashboard(this.providerId);
    });
  }

  generateOtp(id: number) {
    this.dashboardService.generateOtp(id).subscribe(() => {
      this.loadDashboard(this.providerId);
    });
  }

  verifyOtp(bookingId: number, otp: string) {
    this.dashboardService.verifyOtp(bookingId, otp).subscribe(() => {
      this.loadDashboard(this.providerId);
    });
  }
}
