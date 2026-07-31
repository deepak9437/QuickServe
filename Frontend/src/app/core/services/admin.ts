import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private apiUrl = "https://quick-serve.in/quickserve/admin";

  constructor(private http: HttpClient) {}

  getDashboardStats() {
    return this.http.get<any>(`${this.apiUrl}/dashboard_stats`);
  }
  approveProvider(id: number) {
    return this.http.put(
      `https://quick-serve.in/quickserve/provider/approve/${id}`,
      {},
    );
  }

  rejectProvider(id: number) {
    return this.http.put(
      `https://quick-serve.in/quickserve/provider/reject/${id}`,
      {},
    );
  }
  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  getProviders() {
    return this.http.get<any[]>(`${this.apiUrl}/providers`);
  }
  getBookings() {
    return this.http.get<any[]>(`${this.apiUrl}/bookings`);
  }
  getPendingProviders() {
    return this.http.get<any[]>(
      "https://quick-serve.in/quickserve/view/pending",
    );
  }
}
