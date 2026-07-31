import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class LoginComponent {
  showPassword = false;

  loginData = {
    userEmail: "",
    password: "",
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    console.log("Login button clicked");

    if (!this.loginData.userEmail || !this.loginData.password) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    this.authService.loginUser(this.loginData).subscribe({
      next: (response: any) => {
        console.log("LOGIN RESPONSE =", response);

        // If login failed (pending provider / wrong password)
        if (!response.token) {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
          });
          return;
        }

        const token = response.token;
        const user = response.user;

        console.log("User =", user);
        console.log("Role =", user.role);

        // Store JWT
        localStorage.setItem("token", token);

        // Store current user
        this.authService.setCurrentUser(user);

        if (user.role === "customer") {
          this.router.navigate(["/"]);
        } else if (user.role === "provider") {
          Swal.fire({
            title: "Success!",
            text: "Provider Login Successful",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          this.router.navigate(["/provider-dashboard"]);
        } else if (user.role === "admin") {
          Swal.fire({
            title: "Success!",
            text: "Admin Login Successful",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          this.router.navigate(["/admin/dashboard"]);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Invalid Role",
            icon: "error",
          });
        }
      },
      error: (error) => {
        console.log("FULL ERROR:", error);

        Swal.fire({
          title: "Error!",
          text: JSON.stringify(error.error),
          icon: "error",
          confirmButtonText: "Try Again",
        });
      },
    });
  }
}
