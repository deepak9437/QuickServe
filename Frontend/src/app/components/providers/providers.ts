import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-providers',
  imports: [RouterLink],
  templateUrl: './providers.html',
  styleUrl: './providers.scss'
})
export class Providers {
  providerService = inject(ProviderService);
  providers = this.providerService.getFeaturedProviders();

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating));
  }
}
