import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AdminService } from "../../../core/services/admin";

@Component({
  selector: "app-reports",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./reports.html",
  styleUrl: "./reports.css",
})
export class ReportsComponent implements OnInit {
  report = {
    totalCustomers: 0,
    totalProviders: 0,
    totalBookings: 0,
    pendingApproval: 0,
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.report = data;

        console.log(this.report);

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
