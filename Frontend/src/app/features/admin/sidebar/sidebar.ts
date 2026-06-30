import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-admin-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.css",
})
export class AdminSidebarComponent {
  adminName = "Admin";
  adminRole = "Super Admin";

  constructor(private router: Router) {}

  goToReports() {
    this.router.navigate(["/admin/reports"]);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(["/login"]);
  }
}
