import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-provider-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class providerdashboardComponent {
  user: any = {};

  totalBookings = 12;
  pendingRequests = 4;
  completedJobs = 18;

  recentRequests = [
    {
      customer: "Satya Das",
      service: "Electrical Repair",
      status: "Pending",
    },
    {
      customer: "Rakesh Kumar",
      service: "Home Wiring",
      status: "Approved",
    },
  ];

  ngOnInit() {
    const data = sessionStorage.getItem("user");

    if (data) {
      this.user = JSON.parse(data);
    }
  }
}
