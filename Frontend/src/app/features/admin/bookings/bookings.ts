import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AdminService } from "../../../core/services/admin";

@Component({
  selector: "app-bookings",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./bookings.html",
  styleUrl: "./bookings.css",
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.adminService.getBookings().subscribe({
      next: (data) => {
        console.log(data);

        this.bookings = data;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
