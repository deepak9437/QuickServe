import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth";
import { AdminService } from "../../../core/services/admin";
import Swal from "sweetalert2";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-provider-approval",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./provider-approval.html",
  styleUrl: "./provider-approval.css",
})
export class ProviderApprovalComponent {
  providers: any[] = [];

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadProviders();
  }

  loadProviders() {
    this.authService.getAllProviders().subscribe({
      next: (response: any) => {
        console.log("Providers Response =", response);

        this.providers = response;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log("API Error =", err);
      },
    });
  }
  approveProvider(id: number) {
    this.adminService.approveProvider(id).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Provider Approved",
          timer: 1500,
          showConfirmButton: false,
        });

        this.loadProviders();
      },

      error: (err) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Approval Failed",
        });
      },
    });
  }

  rejectProvider(id: number) {
    this.adminService.rejectProvider(id).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Provider Rejected",
          timer: 1500,
          showConfirmButton: false,
        });

        this.loadProviders();
      },

      error: (err) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Reject Failed",
        });
      },
    });
  }

  viewProvider(provider: any) {
    const doc = provider.providerdocs?.[0];

    Swal.fire({
      title: provider.user.fullName,

      html: `
      <div style="text-align:left">

        <p><b>Email:</b> ${provider.user.userEmail}</p>

        <p><b>Phone:</b> ${provider.user.userPhone}</p>

        <p><b>Skill:</b> ${provider.skills}</p>

        <p><b>Experience:</b> ${provider.experience} Years</p>

        <p><b>Status:</b> ${provider.status}</p>

        <p><b>Description:</b> ${provider.description}</p>

        <hr>

        <p><b>Document Type:</b>
        ${doc?.documentType || "N/A"}</p>

        <p><b>Document:</b>
        ${doc?.documentURL || "N/A"}</p>

        <p><b>Certificate:</b>
        ${doc?.certificate || "N/A"}</p>

        <p><b>Extra Certificate:</b>
        ${doc?.extraCertificate || "N/A"}</p>

      </div>
    `,
      width: 700,
      confirmButtonText: "Close",
    });
  }
}
