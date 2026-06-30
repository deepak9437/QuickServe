import { Component } from "@angular/core";
import { NavbarComponent } from "./shared/navbar/navbar";
import { FooterComponent } from "./shared/footer/footer";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  constructor(public router: Router) {}

  get hideNavbar(): boolean {
    const currentUrl = this.router.url;

    return (
      currentUrl === "/admin/dashboard" ||
      currentUrl === "/admin/users" ||
      currentUrl === "/admin/providers" ||
      currentUrl === "/admin/bookings" ||
      currentUrl === "/admin/reports" ||
      currentUrl === "/admin/provider-approval"
    );
  }

  get hideFooter(): boolean {
    const currentUrl = this.router.url;

    return (
      currentUrl === "/login" ||
      currentUrl === "/signup" ||
      currentUrl === "/provider-register" ||
      currentUrl === "/admin/dashboard" ||
      currentUrl === "/about" ||
      currentUrl === "/services"
    );
  }
}
