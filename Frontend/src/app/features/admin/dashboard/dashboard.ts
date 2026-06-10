import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AdminService } from "../../../core/services/admin";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class AdminDashboardComponent implements OnInit {
  loading = true;

  dashboardStats = {
    totalUsers: 0,
    totalProviders: 0,
    pendingApprovals: 0,
    totalBookings: 0,
  };

  recentActivities: string[] = [];

  constructor(
    private router: Router,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (response: any) => {
        this.dashboardStats = {
          totalUsers: response.totalUsers,
          totalProviders: response.totalProviders,
          pendingApprovals: response.pendingApprovals,
          totalBookings: response.totalBookings,
        };

        this.recentActivities = response.recentActivities || [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Dashboard load failed", err);
        this.loading = false;
      },
    });
  }

  goToUsers() {
    this.router.navigate(["/admin/users"]);
  }

  goToProviders() {
    this.router.navigate(["/admin/providers"]);
  }

  goToApprovals() {
    this.router.navigate(["/admin/provider-approval"]);
  }

  goToBookings() {
    this.router.navigate(["/admin/bookings"]);
  }

  goToReports() {
    this.router.navigate(["/admin/reports"]);
  }
}
