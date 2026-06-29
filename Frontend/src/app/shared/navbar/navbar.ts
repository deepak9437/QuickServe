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
  showMenu = false;
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // Dynamically listen to login/logout events via the AuthService observable
    this.authSubscription = this.authService.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
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
    // Clear user state globally using the service
    this.authService.clearCurrentUser();
    this.showMenu = false;

    // Redirect to home without needing a window.location.reload()
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
