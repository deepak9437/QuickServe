import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Service } from '../../../core/services/service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements OnInit {

  constructor(
    private service: Service,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  searchText = '';
  selectedCategory = '';

  currentPage = 1;
  itemsPerPage = 3;

  providers: any[] = [];

  ngOnInit(): void {
    this.viewProviders();
  }

  viewProviders(): void {

    this.service.viewProviders().subscribe({

      next: (data: any) => {

        console.log(JSON.stringify(data, null, 2));

        this.providers = data;

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error('ERROR:', error);
      }
    });
  }

  get filteredProviders() {

    return this.providers.filter(provider => {

      const matchName =
        provider.user?.fullName
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchCategory =
        !this.selectedCategory ||
        provider.skills?.toLowerCase() ===
        this.selectedCategory.toLowerCase();

      return matchName && matchCategory;
    });
  }

  get paginatedProviders() {

    const start =
      (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredProviders.slice(
      start,
      start + this.itemsPerPage
    );
  }

  get totalPages() {

    return Array(
      Math.ceil(
        this.filteredProviders.length /
        this.itemsPerPage
      )
    )
      .fill(0)
      .map((_, i) => i + 1);
  }

  changePage(page: number): void {

    this.currentPage = page;
  }

  bookNow(provider: any): void {

    console.log('Selected Provider:', provider);

    sessionStorage.setItem(
      'selectedProvider',
      JSON.stringify(provider)
    );

    this.router.navigate(['/booking']);
  }
}