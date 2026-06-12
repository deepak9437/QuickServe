import { Component, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ProviderService } from "../../../core/services/provider";

@Component({
  selector: "app-provider-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./provider-profile.html",
  styleUrl: "./provider-profile.css",
})
export class ProviderProfileComponent {
  provider: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const providerId = Number(this.route.snapshot.paramMap.get("id"));

    console.log("Route ID =", providerId);

    this.providerService.getAllProviders().subscribe({
      next: (response: any) => {
        console.log("Response =", response);

        this.provider = response.find((p: any) => p.id === providerId);

        console.log("Selected Provider =", this.provider);

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  bookNow(provider: any): void {
    sessionStorage.setItem("selectedProvider", JSON.stringify(provider));

    this.router.navigate(["/booking"]);
  }
}
