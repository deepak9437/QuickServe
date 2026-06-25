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
      Swal.fire("Error", "Enter your email", "error");
      return;
    }

    this.forgotPasswordService
      .forgotPassword(this.email)
      .subscribe((response: any) => {
        if (response === "OTP_SENT") {
          Swal.fire("Success", "OTP sent to your email", "success");

          this.currentStep = 2;
        } else {
          Swal.fire("Error", "Email not found", "error");
        }
      });
  }

  verifyOtp() {
    this.forgotPasswordService
      .verifyOtp(this.email, this.otp)
      .subscribe((response: any) => {
        if (response === "OTP_VERIFIED") {
          Swal.fire("Success", "OTP Verified", "success");

          this.currentStep = 3;
        } else {
          Swal.fire("Error", "Invalid OTP", "error");
        }
      });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");

      return;
    }

    this.forgotPasswordService
      .resetPassword(this.email, this.newPassword)
      .subscribe((response: any) => {
        if (response === "PASSWORD_RESET_SUCCESS") {
          Swal.fire("Success", "Password Updated Successfully", "success");

          this.router.navigate(["/login"]);
        }
      });
  }
}
