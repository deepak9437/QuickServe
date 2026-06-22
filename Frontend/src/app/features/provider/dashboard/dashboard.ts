import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth";

@Component({
  selector: "app-provider-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class providerdashboardComponent implements OnInit {
  provider: any = {};

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

      console.log("Provider Data:", this.provider);

      // TEMPORARY TEST
      const userId = this.provider.id;

      this.dashboardService.getProviderId(userId).subscribe({
        next: (pId) => {
          console.log("Provider ID =", pId);

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
        console.log("Dashboard Response:", response);

        this.totalBookings = response.totalBookings || 0;

        this.pendingRequests = response.pendingRequests || 0;

        this.completedJobs = response.completedJobs || 0;

        this.recentBookings = response.recentBookings || [];

        console.log(
          "Values:",
          this.totalBookings,
          this.pendingRequests,
          this.completedJobs,
        );

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
  acceptBooking(id: number) {
    this.dashboardService.acceptBooking(id).subscribe(() => {
      window.location.reload();
    });
  }

  rejectBooking(id: number) {
    this.dashboardService.cancelBooking(id).subscribe(() => {
      window.location.reload();
    });
  }

  completeBooking(id: number) {
    this.dashboardService.completeBooking(id).subscribe(() => {
      window.location.reload();
    });
  }
}
