import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceBooking } from '../../../core/services/booking';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
    booking = {
    uId: '',
    pId: '',
    serviceName: '',
    problem: '',
    address: '',
    bookingDate: ''
  };

  constructor(private bookingService: ServiceBooking,
    private router: Router,) {}

  submitBooking() {

    this.bookingService.bookService(this.booking)
      .subscribe({
        next: () => {
          alert('Booking Successful');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log(err);
          alert('Booking Failed');
          return;
        }
      });
  }
}
