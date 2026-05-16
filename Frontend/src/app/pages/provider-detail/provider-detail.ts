import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-provider-detail',
  imports: [RouterLink],
  templateUrl: './provider-detail.html',
  styleUrl: './provider-detail.scss'
})
export class ProviderDetail {
  providerService = inject(ProviderService);
  providers = this.providerService.getFeaturedProviders();
  selectedProvider = signal(this.providers[0]);
  showBooking = signal(false);
  selectedDate = signal('');
  selectedTime = signal('');

  availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  selectProvider(p: any) { this.selectedProvider.set(p); this.showBooking.set(false); }
  openBooking() { this.showBooking.set(true); }
  closeBooking() { this.showBooking.set(false); }
  getStars(r: number) { return '★'.repeat(Math.round(r)); }
}
