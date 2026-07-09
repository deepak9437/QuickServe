import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";

import { AuthService } from "../../../core/services/auth";

@Component({
  selector: "app-view-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./view-profile.html",
  styleUrl: "./view-profile.css",
})
export class ViewProfileComponent implements OnInit {
  user: any = {};

  profileImageUrl = "";

  uploading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);

      this.loadProfileImage();
    }
  }

  /* ==========================
        LOAD PROFILE IMAGE
  ========================== */

  loadProfileImage(): void {
  if (this.user.profile) {
    this.profileImageUrl =
      `http://13.233.86.215:3030/quickserve/user/profilePic/${encodeURIComponent(this.user.profile)}?t=${new Date().getTime()}`;
  } else {
    this.profileImageUrl = "";
  }
}

  /* ==========================
        SELECT IMAGE
  ========================== */

  onProfileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File",
        text: "Please choose an image.",
      });

      input.value = "";

      return;
    }

    this.uploadProfilePic(file, input);
  }

  /* ==========================
        UPLOAD IMAGE
  ========================== */

  uploadProfilePic(file: File, input: HTMLInputElement): void {
    this.uploading = true;

    this.authService
      .updateProfilePic(this.user.id, file)
      .pipe(
        finalize(() => {
          this.uploading = false;

          input.value = "";
        }),
      )
      .subscribe({
        next: (response: any) => {
          /*
            If backend returns filename,
            use it.
          */

          if (response?.profile) {
            this.user.profile = response.profile;
          } else {
            this.user.profile = file.name;
          }

          sessionStorage.setItem("user", JSON.stringify(this.user));

          this.loadProfileImage();

          Swal.fire({
            icon: "success",

            title: "Profile Updated",

            text: "Your profile picture has been updated.",

            timer: 1800,

            showConfirmButton: false,
          });
        },

        error: (err) => {
          console.error(err);

          Swal.fire({
            icon: "error",

            title: "Upload Failed",

            text: "Unable to upload profile picture.",
          });
        },
      });
  }

  /* ==========================
        EDIT PROFILE
  ========================== */

  editProfile(): void {
    this.router.navigate(["/profile"]);
  }
}
