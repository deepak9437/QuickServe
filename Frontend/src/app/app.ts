import { Component } from "@angular/core";
import { NavbarComponent } from "./shared/navbar/navbar";
import { FooterComponent } from "./shared/footer/footer";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  hideFooter = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const hiddenRoutes = [
          "/login",
          "/signup",
          "/provider-register",
          "/about",
        ];

        this.hideFooter = hiddenRoutes.includes(this.router.url);
      });
  }
}
