import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-categories",
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./categories.html",
  styleUrl: "./categories.css",
})
export class Categories {}
