import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceBooking } from '../../../core/services/booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {

  booking = {
    uId: '',
    pId: '',
    serviceName: '',
    problem: '',
    address: '',
    bookingDate: ''
  };

  user: any;
  provider: any;

  constructor(
    private bookingService: ServiceBooking,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Logged-in user
    this.user = JSON.parse(
      sessionStorage.getItem('user') || '{}'
    );

    // Selected provider
    this.provider = JSON.parse(
      sessionStorage.getItem('selectedProvider') || '{}'
    );

    console.log('User:', this.user);
    console.log('Provider:', this.provider);

    // Auto-set values

    this.booking.uId = this.user.id;

    this.booking.pId = this.provider.id;

    this.booking.serviceName = this.provider.skills;
  }

  submitBooking(): void {

    if (
      !this.booking.problem ||
      !this.booking.address ||
      !this.booking.bookingDate
    ) {
      alert('Please fill all fields');
      return;
    }

    console.log(this.booking);

    this.bookingService.bookService(this.booking)
      .subscribe({
        next: (response) => {

          console.log(response);

          alert('Booking Successful ✅');

          this.router.navigate(['/my-bookings']);
        },

        error: (error) => {

          console.error(error);

          alert('Booking Failed ❌');
        }
      });
  }
}