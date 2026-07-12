import { Component } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { HeroComponent } from "./components/hero/hero";
import { Categories } from "./components/categories/categories";
import { HowItWorks } from "./components/how-it-works/how-it-works";
import { Providers } from "./components/providers/providers";
import { ReviewsComponent } from "./components/reviews/reviews";
import { ProviderCta } from "./components/provider-cta/provider-cta";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeroComponent,
    Categories,
    HowItWorks,
    Providers,
    ReviewsComponent,
    ProviderCta,
  ],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class HomeComponent {}
