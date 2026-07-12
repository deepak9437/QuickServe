import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-provider-cta",
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./provider-cta.html",
  styleUrl: "./provider-cta.css",
})
export class ProviderCta {}
