import { Component, inject, signal } from '@angular/core';
import { ProviderService } from '../../services/provider';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceList {
  providerService = inject(ProviderService);
  categories = this.providerService.getCategories();
  providers = this.providerService.getFeaturedProviders();
  selectedCategory = signal<string | null>(null);
  searchQuery = signal('');

  get filteredProviders() {
    let result = this.providers;
    if (this.selectedCategory()) {
      result = result.filter(p => p.category.toLowerCase() === this.selectedCategory());
    }
    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.profession.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }

  selectCategory(id: string | null) { this.selectedCategory.set(id); }
  onSearch(e: Event) { this.searchQuery.set((e.target as HTMLInputElement).value); }

  getStars(rating: number): string { return '★'.repeat(Math.round(rating)); }
}
