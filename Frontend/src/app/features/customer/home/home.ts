import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { OnInit } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { ProviderService } from "../../../core/services/provider";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AdminService } from "../../../core/services/admin";
import { ReviewService } from "../../../core/services/review";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class HomeComponent implements OnInit {
  providers: any[] = [];
  totalProviders = 0;
  reviews: any[] = [];
  searchText: string = "";

  constructor(
    private router: Router,
    private providerService: ProviderService,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.loadProviders();
    this.loadStats();
    this.loadReviews();
  }
  loadReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (data) => {
        console.log("Reviews:", data);

        this.reviews = data;

        this.cdr.detectChanges();
      },
    });
  }
  get scrollingReviews() {
    return [...this.reviews, ...this.reviews];
  }
  loadStats() {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.totalProviders = data.totalProviders;
      },
    });
  }

  loadProviders() {
    this.providerService.getAllProviders().subscribe({
      next: (data) => {
        this.providers = data.slice(0, 3);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  searchService() {
    if (!this.searchText.trim()) {
      this.router.navigate(["/services"]);
      return;
    }

    this.router.navigate(["/services"], {
      queryParams: {
        search: this.searchText,
      },
    });
  }

  avatarColors = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f97316",
    "#ec4899",
    "#14b8a6",
  ];

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
