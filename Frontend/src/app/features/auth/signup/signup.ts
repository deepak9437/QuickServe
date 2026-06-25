import { ChangeDetectorRef, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth";
import Swal from "sweetalert2";
import { Loading } from "../../../shared/loading/loading";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [FormsModule, RouterLink, Loading],
  templateUrl: "./signup.html",
  styleUrl: "./signup.css",
})
export class SignupComponent {
  user = {
    fullName: "",
    userEmail: "",
    userPhone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    pincode: "",
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  onSubmit() {
    if (
      !this.user.fullName ||
      !this.user.userEmail ||
      !this.user.userPhone ||
      !this.user.password ||
      !this.user.confirmPassword ||
      !this.user.gender ||
      !this.user.address ||
      !this.user.pincode
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
      return;
    }

    this.isLoading = true;

    this.authService.registerUser(this.user).subscribe({
      next: (response: any) => {
        console.log("RESPONSE =", response);
        this.isLoading = false;
        this.cdr.detectChanges();

        if (response === "Email already exists") {
          Swal.fire({
            icon: "warning",
            title: "Email Already Exists",
            text: "Please use another email address",
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registration Successful",
          confirmButtonText: "OK",
        });

        this.router.navigate(["/login"]);
      },

      error: (error) => {
        this.isLoading = false;
        this.cdr.detectChanges();

        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Something went wrong",
          confirmButtonText: "Try Again",
        });
      },
    });
  }
}
