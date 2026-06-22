import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminService } from "../../../core/services/admin";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users.html",
  styleUrl: "./users.css",
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (data) => {
        console.log(data);

        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
