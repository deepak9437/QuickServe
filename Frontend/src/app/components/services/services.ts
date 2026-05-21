import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, CategoryDto } from '../../services/api.service';
// Keep local mock as fallback
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-services',
  imports: [RouterLink, CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit {
  private api = inject(ApiService);
  private mockService = inject(ProviderService);

  categories = signal<CategoryDto[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getCategories().subscribe({
      next: cats => { this.categories.set(cats); this.loading.set(false); },
      error: () => {
        // Fallback to mock data if backend is unreachable
        const mock = this.mockService.getCategories();
        const fallback: CategoryDto[] = mock.map((c, i) => ({
          id: i + 1, name: c.name, icon: c.icon, description: c.description,
          colorHex: c.color, active: true, sortOrder: i, providerCount: c.count
        }));
        this.categories.set(fallback);
        this.loading.set(false);
      }
    });
  }
}
