import { Component, ElementRef, HostListener } from "@angular/core";

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

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const profileMenu =
      this.elementRef.nativeElement.querySelector(".profile-menu");

    if (profileMenu && !profileMenu.contains(event.target)) {
      this.showMenu = false;
    }
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
