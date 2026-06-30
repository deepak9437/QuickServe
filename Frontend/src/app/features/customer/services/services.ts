import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import Swal from "sweetalert2";

import { Service } from "../../../core/services/service";
import { ServiceBooking } from "../../../core/services/booking";

@Component({
  selector: "app-services",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./services.html",
  styleUrl: "./services.css",
})
export class ServicesComponent implements OnInit {
  // ── State ─────────────────────────────────────────────────────
  providers: any[] = [];
  searchText = "";
  selectedCategory = "";

  // ── Pagination ────────────────────────────────────────────────
  currentPage = 1;
  itemsPerPage = 3;

  // ── Avatar colors pool ────────────────────────────────────────
  private readonly avatarColors = [
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
  ];

  constructor(
    private service: Service,
    private bookingService: ServiceBooking,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // ── Lifecycle ─────────────────────────────────────────────────

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["search"]) {
        this.searchText = params["search"];
      }
    });

    this.viewProviders();
  }

  // ── Data loading ──────────────────────────────────────────────

  viewProviders(): void {
    this.service.viewProviders().subscribe({
      next: (data: any) => {
        console.log("Providers", data);
        this.providers = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Unable to load providers.",
          confirmButtonColor: "#22c55e",
        });
      },
    });
  }

  // ── Filtering & pagination (computed) ─────────────────────────

  get filteredProviders(): any[] {
    return this.providers.filter((provider) => {
      const matchSkill = provider.skills
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase());

      const matchCategory =
        !this.selectedCategory ||
        provider.skills?.toLowerCase() === this.selectedCategory.toLowerCase();

      return matchSkill && matchCategory;
    });
  }

  get paginatedProviders(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProviders.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number[] {
    const count = Math.ceil(this.filteredProviders.length / this.itemsPerPage);
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Helpers ───────────────────────────────────────────────────

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((word: string) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }

  getAvatarColor(index: number): string {
    return this.avatarColors[index % this.avatarColors.length];
  }

  // ── Booking ───────────────────────────────────────────────────

  bookNow(provider: any): void {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    // Guard — must be logged in
    if (!user.id) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book a service.",
        confirmButtonColor: "#22c55e",
      }).then(() => this.router.navigate(["/login"]));
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    // Step 1 — Booking form dialog
    Swal.fire({
      title: "",
      width: 650,
      showCancelButton: true,
      confirmButtonText: "Book Service",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      buttonsStyling: false,
      customClass: {
        popup: "qs-booking-popup",
        confirmButton: "qs-confirm-btn",
        cancelButton: "qs-cancel-btn",
      },
      html: this.buildBookingFormHtml(provider, user, today),
      preConfirm: () => this.validateBookingForm(),
    }).then((result) => {
      if (!result.isConfirmed || !result.value) return;
      this.submitBooking(provider, user, result.value);
    });
  }

  // ── Private booking helpers ───────────────────────────────────

  private buildBookingFormHtml(
    provider: any,
    user: any,
    today: string,
  ): string {
    return `
      <div class="qs-booking-card">

        <div class="qs-provider">
          <div class="qs-avatar"
               style="background:${this.getAvatarColor(provider.id)}">
            ${this.getInitials(provider.user.fullName)}
          </div>
          <div>
            <h3>${provider.user.fullName}</h3>
            <span class="qs-skill">${provider.skills}</span>
          </div>
        </div>

        <div class="qs-divider"></div>

        <div class="qs-group">
          <label>🛠 Problem Description</label>
          <textarea id="problem"
                    placeholder="Describe your problem..."
                    rows="4"></textarea>
        </div>

        <div class="qs-group">
          <label>📍 Service Address</label>
          <textarea id="address"
                    rows="3"
                    placeholder="Enter service address">${user.address ?? ""}</textarea>
        </div>

        <div class="qs-group">
          <label>📅 Preferred Date</label>
          <input id="bookingDate"
                 type="date"
                 min="${today}"
                 value="${today}" />
        </div>

        <div class="qs-note">
          <strong>Note</strong><br />
          After the provider accepts your request,
          an OTP will be sent to your registered email.
        </div>

      </div>
    `;
  }

  private validateBookingForm():
    | { problem: string; address: string; bookingDate: string }
    | false {
    const problem = (
      document.getElementById("problem") as HTMLTextAreaElement
    ).value.trim();
    const address = (
      document.getElementById("address") as HTMLTextAreaElement
    ).value.trim();
    const bookingDate = (
      document.getElementById("bookingDate") as HTMLInputElement
    ).value;

    if (!problem || !address || !bookingDate) {
      Swal.showValidationMessage("Please fill all fields.");
      return false;
    }

    return { problem, address, bookingDate };
  }

  private submitBooking(
    provider: any,
    user: any,
    formValue: { problem: string; address: string; bookingDate: string },
  ): void {
    const booking = {
      uId: user.id,
      pId: provider.id,
      serviceName: provider.skills,
      problem: formValue.problem,
      address: formValue.address,
      bookingDate: formValue.bookingDate,
    };

    // Loading state
    Swal.fire({
      title: "Booking Service...",
      text: "Please wait while we submit your request.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    this.bookingService.bookService(booking).subscribe({
      next: () => this.showBookingSuccess(provider),
      error: (error: any) => {
        console.error(error);
        this.showBookingError();
      },
    });
  }

  private showBookingSuccess(provider: any): void {
    Swal.fire({
      icon: "success",
      title: "Booking Submitted 🎉",
      html: `
        <div style="line-height:1.8">
          <h3 style="margin-bottom:10px;">Thank You!</h3>
          Your booking request has been submitted successfully.
          <br /><br />
          <strong>Provider</strong><br />
          ${provider.user.fullName}
          <br /><br />
          <strong>Service</strong><br />
          ${provider.skills}
          <br /><br />
          <span style="color:#22c55e;font-weight:700;font-size:15px;">
            Status: Pending Approval
          </span>
          <br /><br />
          The provider will review your request shortly.
          You'll receive an OTP after the booking is accepted.
        </div>
      `,
      confirmButtonText: "Done",
      buttonsStyling: false,
      customClass: { confirmButton: "qs-confirm-btn" },
    });
  }

  private showBookingError(): void {
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: "Something went wrong. Please try again later.",
      confirmButtonText: "OK",
      buttonsStyling: false,
      customClass: { confirmButton: "qs-confirm-btn" },
    });
  }
}
