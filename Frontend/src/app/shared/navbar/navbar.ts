import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../core/services/auth";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./navbar.html",
  styleUrl: "./navbar.css",
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: any = null;

  // Profile dropdown
  showMenu = false;

  // Mobile navigation
  showMobileMenu = false;

  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  // ===========================
  // Profile Menu
  // ===========================

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  // ===========================
  // Mobile Menu
  // ===========================

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  // ===========================
  // Close menus when clicking outside
  // ===========================

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const profileMenu =
      this.elementRef.nativeElement.querySelector(".profile-menu");

    const navbar = this.elementRef.nativeElement.querySelector(".navbar");

    // Close profile dropdown
    if (profileMenu && !profileMenu.contains(target)) {
      this.showMenu = false;
    }

    // Close mobile menu
    if (navbar && !navbar.contains(target)) {
      this.showMobileMenu = false;
    }
  }

  // ===========================
  // Logout
  // ===========================

  logout() {
    this.authService.clearCurrentUser();

    this.showMenu = false;
    this.showMobileMenu = false;

    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
