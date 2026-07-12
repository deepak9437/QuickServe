import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProviderService } from "../../../../../core/services/provider";
import { ChangeDetectorRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-providers",
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./providers.html",
  styleUrl: "./providers.css",
})
export class Providers {
  providers: any[] = [];

  constructor(
    private providerService: ProviderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadProviders();
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
