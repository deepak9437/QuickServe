import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-profile",
  imports: [CommonModule],
  templateUrl: "./view-profile.html",
  styleUrl: "./view-profile.css",
})
export class ViewProfileComponent {
  user: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  editProfile() {
    this.router.navigate(["/profile"]);
  }
}
