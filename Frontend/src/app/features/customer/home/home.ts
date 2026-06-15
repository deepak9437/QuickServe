import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { OnInit } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { ProviderService } from "../../../core/services/provider";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class HomeComponent implements OnInit {
  providers: any[] = [];
  searchText: string = "";

  constructor(
    private router: Router,
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
