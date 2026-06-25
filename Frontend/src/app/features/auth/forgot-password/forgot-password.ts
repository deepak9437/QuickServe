import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import Swal from "sweetalert2";
import { ForgotPasswordService } from "../../../core/services/forgot-password";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./forgot-password.html",
  styleUrl: "./forgot-password.css",
})
export class ForgotPasswordComponent {
  currentStep = 1;

  email = "";
  otp = "";
  newPassword = "";
  confirmPassword = "";

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router: Router,
  ) {}

  sendOtp() {
    console.log("Send OTP clicked");

    if (!this.email) {
      Swal.fire({
        title: "Error",
        text: "Enter your email",
        icon: "error",
      });
      return;
    }

    this.forgotPasswordService.forgotPassword(this.email).subscribe({
      next: (response: any) => {
        console.log("Response:", response);

        if (response === "OTP_SENT") {
          Swal.fire({
            title: "Success",
            text: "OTP sent to your email",
            icon: "success",
          });

          this.currentStep = 2;
        } else if (response === "EMAIL_NOT_FOUND") {
          Swal.fire({
            title: "Error",
            text: "Email not found",
            icon: "error",
          });
        }
      },

      error: (error) => {
        console.error("Send OTP Error:", error);

        Swal.fire({
          title: "Error",
          text: "Failed to send OTP",
          icon: "error",
        });
      },
    });
  }

  verifyOtp() {
    if (!this.otp) {
      Swal.fire({
        title: "Error",
        text: "Enter OTP",
        icon: "error",
      });
      return;
    }

    this.forgotPasswordService.verifyOtp(this.email, this.otp).subscribe({
      next: (response: any) => {
        console.log("Verify OTP Response:", response);

        if (response === "OTP_VERIFIED") {
          Swal.fire({
            title: "Success",
            text: "OTP Verified",
            icon: "success",
          });

          this.currentStep = 3;
        } else {
          Swal.fire({
            title: "Error",
            text: "Invalid OTP",
            icon: "error",
          });
        }
      },

      error: (error) => {
        console.error("Verify OTP Error:", error);

        Swal.fire({
          title: "Error",
          text: "OTP Verification Failed",
          icon: "error",
        });
      },
    });
  }

  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Please fill all fields",
        icon: "error",
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return;
    }

    this.forgotPasswordService
      .resetPassword(this.email, this.newPassword)
      .subscribe({
        next: (response: any) => {
          console.log("Reset Password Response:", response);

          if (response === "PASSWORD_RESET_SUCCESS") {
            Swal.fire({
              title: "Success",
              text: "Password Updated Successfully",
              icon: "success",
            }).then(() => {
              this.router.navigate(["/login"]);
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Password Update Failed",
              icon: "error",
            });
          }
        },

        error: (error) => {
          console.error("Reset Password Error:", error);

          Swal.fire({
            title: "Error",
            text: "Password Update Failed",
            icon: "error",
          });
        },
      });
  }
}
