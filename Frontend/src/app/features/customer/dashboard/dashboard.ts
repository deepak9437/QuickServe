import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  user: any = {};

  totalBookings = 0;
  activeBookings = 0;
  completedBookings = 0;

  recentBookings: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const data = sessionStorage.getItem('user');

    if (data) {

      this.user = JSON.parse(data);

      console.log('User Data:', this.user);

      this.loadDashboard();
    }
  }

  loadDashboard(): void {

    this.authService
      .getUserDashboardData(this.user.id)
      .subscribe({

        next: (response: any) => {

          console.log('Dashboard Response:', response);

          this.totalBookings = response.totalBookings;
          this.activeBookings = response.activeBookings;
          this.completedBookings = response.completedBookings;

          this.recentBookings = response.recentBookings;

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(error);
        }
      });
  }

  logout(): void {

    sessionStorage.clear();

    this.router.navigate(['/login']);
  }

  openReviewDialog(booking: any) {

  (window as any).selectedRating = 0;

 Swal.fire({

  title: "Rate your Experience",

  customClass: {
    popup: "review-popup-card"
  },

  html: `

    <div class="review-popup">

      <div class="star-rating">

        <span class="star" data-value="1">&#9734;</span>
        <span class="star" data-value="2">&#9734;</span>
        <span class="star" data-value="3">&#9734;</span>
        <span class="star" data-value="4">&#9734;</span>
        <span class="star" data-value="5">&#9734;</span>

      </div>

      <textarea
        id="comment"
        class="review-textarea"
        placeholder="Tell us about your experience..."></textarea>

    </div>

  `,

  showCancelButton: true,

  confirmButtonText: "Submit Review",

  confirmButtonColor: "#16a34a",

  cancelButtonColor: "#6b7280",

  didOpen: () => {

    const stars = document.querySelectorAll(".star");

    stars.forEach((star: any) => {

      star.addEventListener("click", () => {

        const rating = Number(star.getAttribute("data-value"));

        (window as any).selectedRating = rating;

        stars.forEach((s: any, index: number) => {

          if (index < rating) {

            s.innerHTML = "&#9733;";
            s.style.color = "#fbbf24";

          } else {

            s.innerHTML = "&#9734;";
            s.style.color = "#d1d5db";

          }

        });

      });

    });

  },

  preConfirm: () => {

    const rating = (window as any).selectedRating;

    const comment = (
      document.getElementById("comment") as HTMLTextAreaElement
    ).value.trim();

    if (rating === 0) {

      Swal.showValidationMessage("Please select a rating.");

      return;

    }

    return {

      rating,

      comment

    };

  }

}).then((result) => {

  if (!result.isConfirmed || !result.value) {
    return;
  }

  const review: any = result.value;

  this.authService.submitReview(

    booking.bookingId,

    this.user.id,

    booking.pId,

    review.rating,

    review.comment

  ).subscribe({

    next: () => {

      Swal.fire({

        icon: "success",

        title: "Thank You!",

        text: "Your review has been submitted successfully.",

        timer: 1800,

        showConfirmButton: false

      });

      this.loadDashboard();

    },

    error: (err) => {

      console.log(err);

      Swal.fire({

        icon: "error",

        title: "Unable to submit review"

      });

    }

  });

});

}
}