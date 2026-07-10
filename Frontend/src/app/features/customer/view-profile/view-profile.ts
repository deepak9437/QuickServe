import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

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

  totalBookings = 0;
  totalReviews = 0;
  memberSince = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);

      this.loadProfileImage();

      this.loadDashboardData();
    }
  }

  /* ==========================
     LOAD DASHBOARD DATA
  ========================== */
loadDashboardData(): void {
  this.authService
    .getUserDashboardData(this.user.id)
    .subscribe({
      next: (response: any) => {
        console.log("FULL RESPONSE:", response);
        console.log("REVIEWS:", response.totalReviews);
        console.log("MEMBER SINCE:", response.memberSince);

        this.totalBookings = response.totalBookings ?? 0;
        this.totalReviews = response.totalReviews ?? 0;
        this.memberSince = response.memberSince ?? "N/A";

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error("Dashboard data error =", err);
      },
    });
}

  /* ==========================
     LOAD PROFILE IMAGE
  ========================== */

  loadProfileImage(): void {
    if (this.user.profile) {
      this.profileImageUrl =
        `http://13.233.86.215:3030/quickserve/user/profilePic/` +
        `${encodeURIComponent(this.user.profile)}` +
        `?t=${new Date().getTime()}`;
    } else {
      this.profileImageUrl = "";
    }
  }

  /* ==========================
     SELECT PROFILE IMAGE
  ========================== */

  onProfileSelected(event: Event): void {
    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
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
     UPLOAD PROFILE IMAGE
  ========================== */

  uploadProfilePic(
    file: File,
    input: HTMLInputElement,
  ): void {
    this.uploading = true;

    this.authService
      .updateProfilePic(this.user.id, file)
      .pipe(
        finalize(() => {
          this.uploading = false;

          input.value = "";

          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (response: any) => {
          if (response?.profile) {
            this.user.profile =
              response.profile;
          } else {
            this.user.profile =
              file.name;
          }

          sessionStorage.setItem(
            "user",
            JSON.stringify(this.user),
          );

          this.loadProfileImage();

          this.cdr.detectChanges();

          Swal.fire({
            icon: "success",
            title: "Profile Updated",
            text: "Your profile picture has been updated.",
            timer: 1800,
            showConfirmButton: false,
          });
        },

        error: (err) => {
          console.error(
            "Profile upload error =",
            err,
          );

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