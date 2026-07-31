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

   console.log("Document Object:", doc);
  console.log("Document Name:", doc?.documentURL);
  console.log("Certificate:", doc?.certificate);
  console.log("Extra Certificate:", doc?.extraCertificate);

  Swal.fire({
    title: provider.user.fullName,
    width: 900,
    confirmButtonText: "Close",

    html: `
      <div style="text-align:left; font-size:15px;">

        <div style="background:#f8fafc; padding:18px; border-radius:12px; margin-bottom:20px;">
          <p><b>Email:</b> ${provider.user.userEmail}</p>
          <p><b>Phone:</b> ${provider.user.userPhone}</p>
          <p><b>Skill:</b> ${provider.skills}</p>
          <p><b>Experience:</b> ${provider.experience} Years</p>
          <p><b>Status:</b> ${provider.status}</p>
          <p><b>Description:</b> ${provider.description}</p>
        </div>

        <h3 style="margin-bottom:8px;">
          ${doc?.documentType || "Identity Document"}
        </h3>

        <a href="https://quick-serve.in/quickserve/provider/document/${doc?.documentURL}" target="_blank">
          <img
            src="https://quick-serve.in/quickserve/provider/document/${doc?.documentURL}"
            style="
              width:100%;
              max-height:350px;
              object-fit:contain;
              border:1px solid #ddd;
              border-radius:10px;
              margin-bottom:25px;
              cursor:zoom-in;
            ">
        </a>

        <h3 style="margin-bottom:8px;">Certificate</h3>

        <a href="https://quick-serve.in/quickserve/provider/certificate/${doc?.certificate}" target="_blank">
          <img
            src="https://quick-serve.in/quickserve/provider/certificate/${doc?.certificate}"
            style="
              width:100%;
              max-height:350px;
              object-fit:contain;
              border:1px solid #ddd;
              border-radius:10px;
              margin-bottom:25px;
              cursor:zoom-in;
            ">
        </a>

        ${
          doc?.extraCertificate
            ? `
              <h3 style="margin-bottom:8px;">Extra Certificate</h3>

              <a href="https://quick-serve.in/quickserve/provider/extraCertificate/${doc.extraCertificate}" target="_blank">
                <img
                  src="https://quick-serve.in/quickserve/provider/extraCertificate/${doc.extraCertificate}"
                  style="
                    width:100%;
                    max-height:350px;
                    object-fit:contain;
                    border:1px solid #ddd;
                    border-radius:10px;
                    cursor:zoom-in;
                  ">
              </a>
            `
            : `
              <p style="color:#888;">No Extra Certificate Uploaded</p>
            `
        }

      </div>
    `
  });

}
}
