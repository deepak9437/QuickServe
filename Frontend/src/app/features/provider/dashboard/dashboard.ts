import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import Swal from "sweetalert2";

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

  isOnline = false;
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

// Fetch latest availability from DB
this.dashboardService.getAvailability(userId).subscribe({
  next: (available: boolean) => {
    this.isOnline = available;
  }
});

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

  toggleAvailability(event: Event) {

  const checked = (event.target as HTMLInputElement).checked;

  // Update UI immediately
  this.isOnline = checked;

  this.dashboardService
    .updateAvailability(this.provider.id, checked)
    .subscribe({

      next: () => {

        // Update sessionStorage also
        this.provider.isAvailable = checked;

        sessionStorage.setItem(
          "user",
          JSON.stringify(this.provider)
        );

        Swal.fire({
          icon: "success",
          title: checked
            ? "You are Online"
            : "You are Offline",
          timer: 1200,
          showConfirmButton: false
        });

      },

      error: () => {

        // Revert toggle if API fails
        this.isOnline = !checked;

        Swal.fire({
          icon: "error",
          title: "Unable to update status"
        });

      }

    });

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

  // Accept Booking

  acceptBooking(id: number) {
    Swal.fire({
      title: "Accepting Request...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.dashboardService.acceptBooking(id).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Booking Accepted",
          text: "Customer details are now available.",
          timer: 2000,
          showConfirmButton: false,
        });

        this.loadDashboard(this.providerId);
      },

      error: () => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Unable to accept booking.",
        });
      },
    });
  }

  // Reject Booking

  rejectBooking(id: number) {
    Swal.fire({
      title: "Rejecting Request...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.dashboardService.cancelBooking(id).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Booking Rejected",
          timer: 1500,
          showConfirmButton: false,
        });

        this.loadDashboard(this.providerId);
      },

      error: () => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Unable to reject booking.",
        });
      },
    });
  }

  // Generate OTP

  generateOtp(id: number) {
    Swal.fire({
      title: "Sending OTP...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.dashboardService.generateOtp(id).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "OTP Sent Successfully",
          text: "OTP has been sent to customer's email.",
        });

        this.loadDashboard(this.providerId);
      },

      error: () => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Unable to send OTP.",
        });
      },
    });
  }

  // Verify OTP

  verifyOtp(bookingId: number, otp: string) {
    if (!otp || otp.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Enter OTP",
        text: "Please enter the OTP provided by the customer.",
      });

      return;
    }

    Swal.fire({
      title: "Verifying OTP...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.dashboardService.verifyOtp(bookingId, otp).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: "success",
          title: "Service Completed",
          text: response,
        });

        this.loadDashboard(this.providerId);
      },

      error: () => {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP",
          text: "OTP verification failed.",
        });
      },
    });
  }
}
