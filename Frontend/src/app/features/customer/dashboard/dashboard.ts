import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class DashboardComponent {
  user: any = {};

  totalBookings = 24;
  activeRequests = 3;
  favouriteProviders = 7;

  recentBookings = [
    {
      service: "Home Cleaning",
      date: "08 Jun 2026",
      status: "Confirmed",
    },
    {
      service: "Garden Maintenance",
      date: "05 Jun 2026",
      status: "Pending",
    },
    {
      service: "Electrical Repair",
      date: "01 Jun 2026",
      status: "Completed",
    },
    {
      service: "Wall Painting",
      date: "28 May 2026",
      status: "Cancelled",
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const data = sessionStorage.getItem("user");

    if (data) {
      this.user = JSON.parse(data);
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
