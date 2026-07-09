import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./view-profile.html",
  styleUrl: "./view-profile.css",
})
export class ViewProfileComponent {

  user: any = {};

  profileImageUrl: string = "";

  uploading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadProfileImage();
    }
  }

  loadProfileImage(): void {

    if (this.user.profile) {

      this.profileImageUrl =
        `http://13.233.86.215:3030/quickserve/user/profilePic/${encodeURIComponent(this.user.profile)}`;

    } else {

      this.profileImageUrl = "";

    }
  }

  onProfileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith("image/")) {

      Swal.fire({
        icon: "warning",
        title: "Invalid File",
        text: "Please select an image file."
      });

      input.value = "";
      return;
    }

    this.uploadProfilePic(file, input);
  }

  uploadProfilePic(
    file: File,
    input: HTMLInputElement
  ): void {

    this.uploading = true;

    this.authService
      .updateProfilePic(this.user.id, file)
      .subscribe({

        next: () => {

          this.user.profile = file.name;

          sessionStorage.setItem(
            "user",
            JSON.stringify(this.user)
          );

          this.loadProfileImage();

          this.uploading = false;

          input.value = "";

          Swal.fire({
            icon: "success",
            title: "Profile Picture Updated",
            timer: 1500,
            showConfirmButton: false
          });
        },

        error: (err) => {

          console.error(err);

          this.uploading = false;

          input.value = "";

          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "Unable to update profile picture."
          });
        }
      });
  }

  editProfile(): void {
    this.router.navigate(["/profile"]);
  }
}