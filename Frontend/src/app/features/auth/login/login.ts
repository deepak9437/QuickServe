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
      alert("Please fill all fields");
      return;
    }

    this.authService.loginUser(this.loginData).subscribe({
      next: (response: any) => {
        const user = JSON.parse(response);

        console.log("User =", user);
        console.log("Role =", user.role);

        sessionStorage.setItem("user", JSON.stringify(user));

        if (user.role === "customer") {
          Swal.fire({
            title: "Success!",
            text: "Customer Login Successful",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          this.router.navigate(["/dashboard"]).then(() => {
            window.location.reload();
          });
        } else if (user.role === "provider") {
          Swal.fire({
            title: "Success!",
            text: "Provider Login Successful",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          this.router.navigate(["/provider-dashboard"]).then(() => {
            window.location.reload();
          });
        } else if (user.role === "admin") {
          this.router.navigate(["/admin-dashboard"]).then(() => {
            window.location.reload();
          });
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
