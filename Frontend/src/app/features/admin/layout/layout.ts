import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AdminSidebarComponent } from "../sidebar/sidebar";
import { AdminTopbarComponent } from "../topbar/topbar";

@Component({
  selector: "app-layout",
  imports: [RouterOutlet, AdminSidebarComponent, AdminTopbarComponent],
  templateUrl: "./layout.html",
  styleUrl: "./layout.css",
})
export class Layout {}
