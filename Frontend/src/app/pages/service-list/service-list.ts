import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, ProviderDto, CategoryDto } from '../../services/api.service';
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-service-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceList implements OnInit {
  private api = inject(ApiService);
  private mockService = inject(ProviderService);
  private route = inject(ActivatedRoute);

  categories = signal<CategoryDto[]>([]);
  providers = signal<ProviderDto[]>([]);
  loading = signal(true);
  totalElements = signal(0);
  selectedCategory = signal<number | null>(null);
  searchQuery = signal('');

  ngOnInit() {
    // Pre-select category from query param
    this.route.queryParams.subscribe(params => {
      const catParam = params['category'];
      if (catParam) this.selectedCategory.set(Number(catParam));
    });

    this.loadCategories();
    this.loadProviders();
  }

  loadCategories() {
    this.api.getCategories().subscribe({
      next: cats => this.categories.set(cats),
      error: () => {
        const mock = this.mockService.getCategories();
        this.categories.set(mock.map((c, i) => ({
          id: i + 1, name: c.name, icon: c.icon, description: c.description,
          colorHex: c.color, active: true, sortOrder: i, providerCount: c.count
        })));
      }
    });
  }

  loadProviders() {
    this.loading.set(true);
    this.api.filterProviders({
      categoryId: this.selectedCategory() ?? undefined,
      page: 0, size: 20
    }).subscribe({
      next: page => {
        this.providers.set(page.content);
        this.totalElements.set(page.totalElements);
        this.loading.set(false);
      },
      error: () => {
        const mock = this.mockService.getFeaturedProviders();
        const all: ProviderDto[] = mock.map(p => ({
          id: p.id, userId: p.id, firstName: p.name.split(' ')[0],
          lastName: p.name.split(' ')[1] || '', email: '', city: p.location,
          profession: p.profession, bio: '', yearsExperience: p.yearsExp,
          hourlyRate: +p.price.replace('₹',''), serviceRadiusKm: 25,
          available: true, backgroundChecked: p.verified, verified: p.verified,
          avgRating: p.rating, totalReviews: p.reviews, completedJobs: p.completedJobs,
          responseTimeMinutes: 15, categoryName: p.category, categoryId: 0,
          profileImageUrl: null, createdAt: new Date().toISOString()
        }));
        this.providers.set(all);
        this.totalElements.set(all.length);
        this.loading.set(false);
      }
    });
  }

  selectCategory(id: number | null) {
    this.selectedCategory.set(id);
    this.loadProviders();
  }

  onSearch(e: Event) {
    const q = (e.target as HTMLInputElement).value.trim();
    this.searchQuery.set(q);
    if (q.length > 2) {
      this.loading.set(true);
      this.api.searchProviders(q).subscribe({
        next: page => { this.providers.set(page.content); this.loading.set(false); },
        error: () => this.loading.set(false)
      });
    } else if (q.length === 0) {
      this.loadProviders();
    }
  }

  getInitials(p: ProviderDto): string {
    return (p.firstName[0] + (p.lastName[0] || '')).toUpperCase();
  }

  getStars(rating: number): string { return '★'.repeat(Math.round(rating)); }
}
