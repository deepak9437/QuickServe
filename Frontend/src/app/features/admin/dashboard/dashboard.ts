import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
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
  dashboardStats = {
    totalUsers: 0,
    totalProviders: 0,
    pendingApprovals: 0,
    totalBookings: 0,
  };

  constructor(
    private router: Router,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log("Dashboard component loaded");
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.dashboardStats.totalUsers = data.totalCustomers;
        this.dashboardStats.totalProviders = data.totalProviders;
        this.dashboardStats.pendingApprovals = data.pendingApproval;
        this.dashboardStats.totalBookings = data.totalBookings;

        this.cdr.detectChanges();

        console.log("dashboardStats =", this.dashboardStats);
      },
      error: (err) => {
        console.error(err);
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
