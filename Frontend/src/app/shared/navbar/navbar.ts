import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./navbar.html",
  styleUrl: "./navbar.css",
})
export class NavbarComponent {
  user: any = null;
  showMenu = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    sessionStorage.clear();

    this.user = null;
    this.showMenu = false;

    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
