import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { CommonModule } from "@angular/common";

import { ReviewService } from "../../../../../core/services/review";

@Component({
  selector: "app-reviews",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./reviews.html",
  styleUrl: "./reviews.css",
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];

  avatarColors = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f97316",
    "#ec4899",
    "#14b8a6",
  ];

  constructor(
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (data: any[]) => {
        this.reviews = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  getAvatarColor(index: number): string {
    return this.avatarColors[index % this.avatarColors.length];
  }

  getInitials(fullName: string): string {
    return fullName
      .split(" ")
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
}
