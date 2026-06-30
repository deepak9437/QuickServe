import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-provider-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.html",
  styleUrl: "./profile.css",
})
export class ProviderProfile {
  provider: any = {};

  constructor() {
    this.provider = JSON.parse(localStorage.getItem("provider") || "{}");
  }

  editProfile() {
    alert("Navigate to Edit Profile Page");
  }
}
