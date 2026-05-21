import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, ProviderDto } from '../../services/api.service';
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-providers',
  imports: [RouterLink, CommonModule],
  templateUrl: './providers.html',
  styleUrl: './providers.scss'
})
export class Providers implements OnInit {
  private api = inject(ApiService);
  private mockService = inject(ProviderService);

  providers = signal<ProviderDto[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getFeaturedProviders(6).subscribe({
      next: data => { this.providers.set(data); this.loading.set(false); },
      error: () => {
        // Fallback to mock data
        const mock = this.mockService.getFeaturedProviders();
        const fallback: ProviderDto[] = mock.map(p => ({
          id: p.id, userId: p.id, firstName: p.name.split(' ')[0],
          lastName: p.name.split(' ')[1] || '', email: '', city: p.location,
          profession: p.profession, bio: '', yearsExperience: p.yearsExp,
          hourlyRate: +p.price.replace('₹',''), serviceRadiusKm: 25,
          available: true, backgroundChecked: p.verified, verified: p.verified,
          avgRating: p.rating, totalReviews: p.reviews, completedJobs: p.completedJobs,
          responseTimeMinutes: 15, categoryName: p.category, categoryId: 0,
          profileImageUrl: null, createdAt: new Date().toISOString()
        }));
        this.providers.set(fallback);
        this.loading.set(false);
      }
    });
  }

  getInitials(p: ProviderDto): string {
    return (p.firstName[0] + (p.lastName[0] || '')).toUpperCase();
  }

  getStars(rating: number): string { return '★'.repeat(Math.round(rating)); }
}
