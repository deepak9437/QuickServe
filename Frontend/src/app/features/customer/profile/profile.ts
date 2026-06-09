import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./profile.html",
  styleUrl: "./profile.css",
})
export class ProfileComponent {
  constructor(private authService: AuthService) {}
  profileData = {
    id: "",
    fullName: "",
    userEmail: "",
    userPhone: "",
    address: "",
    pincode: "",
  };

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    this.profileData.id = user.id || "";
    this.profileData.fullName = user.fullName || "";
    this.profileData.userEmail = user.userEmail || "";
    this.profileData.userPhone = user.userPhone || "";
    this.profileData.address = user.address || "";
    this.profileData.pincode = user.pincode || "";
  }

  updateProfile() {
    this.authService.updateProfile(this.profileData).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
        });
      },

      error: () => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
        });
      },
    });
  }
}
