import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./hero.html",
  styleUrl: "./hero.css",
})
export class HeroComponent {
  searchText = "";

  constructor(private router: Router) {}

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
}
