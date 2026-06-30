import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-topbar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./topbar.html",
  styleUrl: "./topbar.css",
})
export class AdminTopbarComponent {
  adminName = "Admin";
  notifications = 8;

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
