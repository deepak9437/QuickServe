import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

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
