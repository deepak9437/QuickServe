import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ── Interfaces matching backend DTOs ─────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ProviderDto {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  profession: string;
  bio: string;
  yearsExperience: number;
  hourlyRate: number;
  serviceRadiusKm: number;
  available: boolean;
  backgroundChecked: boolean;
  verified: boolean;
  avgRating: number;
  totalReviews: number;
  completedJobs: number;
  responseTimeMinutes: number;
  categoryName: string;
  categoryId: number;
  profileImageUrl: string | null;
  createdAt: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  icon: string;
  description: string;
  colorHex: string;
  active: boolean;
  sortOrder: number;
  providerCount: number;
}

export interface BookingDto {
  id: number;
  customerId: number;
  customerName: string;
  providerId: number;
  providerName: string;
  providerProfession: string;
  categoryId: number;
  categoryName: string;
  scheduledAt: string;
  durationHours: number;
  completedAt: string | null;
  hourlyRate: number;
  platformFee: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  serviceAddress: string;
  serviceCity: string;
  customerNotes: string;
  reviewed: boolean;
  createdAt: string;
}

export interface ReviewDto {
  id: number;
  bookingId: number;
  providerId: number;
  customerId: number;
  customerName: string;
  rating: number;
  comment: string;
  providerReply: string | null;
  visible: boolean;
  createdAt: string;
}

export interface BookingRequest {
  providerId: number;
  categoryId: number;
  scheduledAt: string;   // ISO-8601, e.g. "2026-06-01T10:00:00"
  durationHours: number;
  serviceAddress?: string;
  serviceCity?: string;
  customerNotes?: string;
}

export interface ReviewRequest {
  bookingId: number;
  rating: number;
  comment?: string;
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // ── Categories ─────────────────────────────────────────────────────────────

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.base}/categories`);
  }

  // ── Providers ──────────────────────────────────────────────────────────────

  getFeaturedProviders(limit = 6): Observable<ProviderDto[]> {
    return this.http.get<ProviderDto[]>(`${this.base}/providers/featured`, {
      params: { limit }
    });
  }

  searchProviders(query: string, page = 0, size = 10): Observable<PagedResponse<ProviderDto>> {
    return this.http.get<PagedResponse<ProviderDto>>(`${this.base}/providers/search`, {
      params: { q: query, page, size }
    });
  }

  filterProviders(filters: {
    city?: string;
    categoryId?: number;
    minRating?: number;
    maxRate?: number;
    sort?: string;
    page?: number;
    size?: number;
  }): Observable<PagedResponse<ProviderDto>> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params = params.set(k, String(v));
    });
    return this.http.get<PagedResponse<ProviderDto>>(`${this.base}/providers`, { params });
  }

  getProviderById(id: number): Observable<ProviderDto> {
    return this.http.get<ProviderDto>(`${this.base}/providers/${id}`);
  }

  getProviderReviews(providerId: number, page = 0, size = 10): Observable<PagedResponse<ReviewDto>> {
    return this.http.get<PagedResponse<ReviewDto>>(
      `${this.base}/reviews/provider/${providerId}`, { params: { page, size } }
    );
  }

  // ── Bookings ───────────────────────────────────────────────────────────────

  createBooking(request: BookingRequest): Observable<ApiResponse<BookingDto>> {
    return this.http.post<ApiResponse<BookingDto>>(`${this.base}/bookings`, request);
  }

  getMyBookings(status?: string, page = 0, size = 10): Observable<PagedResponse<BookingDto>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<PagedResponse<BookingDto>>(`${this.base}/bookings/my`, { params });
  }

  updateBookingStatus(id: number, status: string, reason?: string): Observable<ApiResponse<BookingDto>> {
    return this.http.patch<ApiResponse<BookingDto>>(
      `${this.base}/bookings/${id}/status`, { status, reason }
    );
  }

  cancelBooking(id: number, reason?: string): Observable<ApiResponse<void>> {
    let params = new HttpParams();
    if (reason) params = params.set('reason', reason);
    return this.http.delete<ApiResponse<void>>(`${this.base}/bookings/${id}/cancel`, { params });
  }

  // ── Reviews ────────────────────────────────────────────────────────────────

  submitReview(request: ReviewRequest): Observable<ApiResponse<ReviewDto>> {
    return this.http.post<ApiResponse<ReviewDto>>(`${this.base}/reviews`, request);
  }

  // ── Users ──────────────────────────────────────────────────────────────────

  getMyProfile(): Observable<any> {
    return this.http.get(`${this.base}/users/me`);
  }
}
