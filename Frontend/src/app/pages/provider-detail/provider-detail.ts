import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, ProviderDto, BookingRequest } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-provider-detail',
  imports: [RouterLink, CommonModule],
  templateUrl: './provider-detail.html',
  styleUrl: './provider-detail.scss'
})
export class ProviderDetail implements OnInit {
  private api        = inject(ApiService);
  private mockService = inject(ProviderService);
  authService        = inject(AuthService);

  providers       = signal<ProviderDto[]>([]);
  selectedProvider = signal<ProviderDto | null>(null);
  loading         = signal(true);
  showBooking     = signal(false);
  bookingSuccess  = signal(false);
  bookingError    = signal('');
  selectedDate    = signal('');
  selectedTime    = signal('');

  availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  ngOnInit() {
    this.api.filterProviders({ page: 0, size: 20 }).subscribe({
      next: page => {
        this.providers.set(page.content);
        if (page.content.length > 0) this.selectedProvider.set(page.content[0]);
        this.loading.set(false);
      },
      error: () => {
        const mock = this.mockService.getFeaturedProviders();
        const fallback: ProviderDto[] = mock.map(p => ({
          id: p.id, userId: p.id, firstName: p.name.split(' ')[0],
          lastName: p.name.split(' ')[1] || '', email: '', city: p.location,
          profession: p.profession, bio: 'Experienced professional with proven track record.',
          yearsExperience: p.yearsExp, hourlyRate: +p.price.replace('₹',''),
          serviceRadiusKm: 25, available: true, backgroundChecked: p.verified,
          verified: p.verified, avgRating: p.rating, totalReviews: p.reviews,
          completedJobs: p.completedJobs, responseTimeMinutes: 15,
          categoryName: p.category, categoryId: 0,
          profileImageUrl: null, createdAt: new Date().toISOString()
        }));
        this.providers.set(fallback);
        if (fallback.length > 0) this.selectedProvider.set(fallback[0]);
        this.loading.set(false);
      }
    });
  }

  selectProvider(p: ProviderDto) {
    this.selectedProvider.set(p);
    this.showBooking.set(false);
    this.bookingSuccess.set(false);
    this.bookingError.set('');
  }

  openBooking()  { this.showBooking.set(true); }
  closeBooking() { this.showBooking.set(false); this.bookingSuccess.set(false); }

  confirmBooking() {
    const p = this.selectedProvider();
    if (!p || !this.selectedDate() || !this.selectedTime()) {
      this.bookingError.set('Please select a date and time.');
      return;
    }
    if (!this.authService.isLoggedIn()) {
      this.bookingError.set('Please sign in to book a provider.');
      return;
    }

    const dateTime = this.buildDateTime(this.selectedDate(), this.selectedTime());
    const request: BookingRequest = {
      providerId: p.id, categoryId: p.categoryId || 1,
      scheduledAt: dateTime, durationHours: 1,
      serviceCity: p.city
    };

    this.api.createBooking(request).subscribe({
      next: () => { this.bookingSuccess.set(true); this.bookingError.set(''); },
      error: err => {
        this.bookingError.set(err.error?.detail || 'Booking failed. Please try again.');
      }
    });
  }

  private buildDateTime(date: string, time: string): string {
    const [h, rest] = time.split(':');
    const [min, period] = rest.split(' ');
    let hour = +h;
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    return `${date}T${String(hour).padStart(2,'0')}:${min}:00`;
  }

  getInitials(p: ProviderDto): string {
    return (p.firstName[0] + (p.lastName[0] || '')).toUpperCase();
  }

  getStars(r: number) { return '★'.repeat(Math.round(r)); }

  getPlatformFee(p: ProviderDto): number { return 49; }

  getTotal(p: ProviderDto): number { return p.hourlyRate + 49; }
}
