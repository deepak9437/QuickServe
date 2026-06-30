import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Chart, registerables } from "chart.js";
import { AdminService } from "../../../core/services/admin";

Chart.register(...registerables);

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild("bookingsChart") bookingsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild("statusChart") statusChartRef!: ElementRef<HTMLCanvasElement>;

  dashboardStats = {
    totalUsers: 0,
    totalProviders: 0,
    pendingApprovals: 0,
    totalBookings: 0,
    totalEarnings: 0,
  };

  bookingStatus = {
    total: 0,
    items: [
      { label: "Completed", value: 0, percent: 0, color: "#1d9e75" },
      { label: "Pending", value: 0, percent: 0, color: "#f4b400" },
      { label: "Accepted", value: 0, percent: 0, color: "#2563eb" },
      { label: "Cancelled", value: 0, percent: 0, color: "#ef4444" },
    ],
  };

  recentBookings: any[] = [];
  topProviders: any[] = [];
  recentUsers: any[] = [];
  pendingApprovals: any[] = [];

  private bookingsChart?: Chart;
  private statusChart?: Chart;
  private viewReady = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log("Dashboard component loaded");
    this.loadDashboardData();
    this.loadPendingProviders();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderBookingsChart([0, 0, 0, 0, 0, 0, 0]);
    this.renderStatusChart();
  }
  loadPendingProviders(): void {
    this.adminService.getPendingProviders().subscribe({
      next: (data: any) => {
        this.pendingApprovals = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  loadDashboardData(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.dashboardStats.totalUsers = data.totalCustomers;
        this.dashboardStats.totalProviders = data.totalProviders;
        this.dashboardStats.pendingApprovals = data.pendingApproval;
        this.dashboardStats.totalBookings = data.totalBookings;
        this.dashboardStats.totalEarnings = data.totalEarnings ?? 0;

        if (data.bookingStatusBreakdown) {
          this.updateBookingStatus(data.bookingStatusBreakdown);
        }

        if (data.recentBookings) {
          this.recentBookings = data.recentBookings;
        }

        if (data.topProviders) {
          this.topProviders = data.topProviders;
        }

        if (data.recentUsers) {
          this.recentUsers = data.recentUsers;
        }

        if (data.pendingApprovalsList) {
          this.pendingApprovals = data.pendingApprovalsList;
        }

        if (data.weeklyBookings) {
          this.renderBookingsChart(data.weeklyBookings);
        }

        if (this.viewReady) {
          this.renderStatusChart();
        }

        this.cdr.detectChanges();

        console.log("dashboardStats =", this.dashboardStats);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateBookingStatus(breakdown: {
    completed: number;
    pending: number;
    accepted: number;
    cancelled: number;
  }): void {
    const total =
      breakdown.completed +
      breakdown.pending +
      breakdown.accepted +
      breakdown.cancelled;
    this.bookingStatus.total = total;

    const pct = (val: number) =>
      total > 0 ? Math.round((val / total) * 1000) / 10 : 0;

    this.bookingStatus.items = [
      {
        label: "Completed",
        value: breakdown.completed,
        percent: pct(breakdown.completed),
        color: "#1d9e75",
      },
      {
        label: "Pending",
        value: breakdown.pending,
        percent: pct(breakdown.pending),
        color: "#f4b400",
      },
      {
        label: "Accepted",
        value: breakdown.accepted,
        percent: pct(breakdown.accepted),
        color: "#2563eb",
      },
      {
        label: "Cancelled",
        value: breakdown.cancelled,
        percent: pct(breakdown.cancelled),
        color: "#ef4444",
      },
    ];
  }

  renderBookingsChart(weeklyData: number[]): void {
    if (!this.bookingsChartRef) return;
    const ctx = this.bookingsChartRef.nativeElement.getContext("2d");
    if (!ctx) return;

    if (this.bookingsChart) {
      this.bookingsChart.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, "rgba(29, 158, 117, 0.25)");
    gradient.addColorStop(1, "rgba(29, 158, 117, 0)");

    this.bookingsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Bookings",
            data: weeklyData,
            borderColor: "#1d9e75",
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#1d9e75",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            borderWidth: 2.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0b1f17",
            padding: 12,
            cornerRadius: 10,
            titleFont: { size: 12, weight: "bold" },
            bodyFont: { size: 13 },
            displayColors: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#8aa89b", font: { size: 11 } },
            grid: { color: "#f1f6f3" },
          },
          x: {
            ticks: { color: "#8aa89b", font: { size: 11 } },
            grid: { display: false },
          },
        },
      },
    });
  }

  renderStatusChart(): void {
    if (!this.statusChartRef) return;
    const ctx = this.statusChartRef.nativeElement.getContext("2d");
    if (!ctx) return;

    if (this.statusChart) {
      this.statusChart.destroy();
    }

    this.statusChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.bookingStatus.items.map((i) => i.label),
        datasets: [
          {
            data: this.bookingStatus.items.map((i) => i.value),
            backgroundColor: this.bookingStatus.items.map((i) => i.color),
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0b1f17",
            padding: 10,
            cornerRadius: 8,
          },
        },
      },
    });
  }

  approveProvider(approval: any): void {
    console.log("Approve", approval);
  }

  rejectProvider(approval: any): void {
    console.log("Reject", approval);
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
