import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private apiUrl = "http://13.233.86.215:3030/quickserve/admin";

  constructor(private http: HttpClient) {}

  getDashboardStats() {
    return this.http.get<any>(`${this.apiUrl}/dashboard_stats`);
  }
  approveProvider(id: number) {
    return this.http.put(
      `http://13.233.86.215:3030/quickserve/provider/approve/${id}`,
      {},
    );
  }

  rejectProvider(id: number) {
    return this.http.put(
      `http://13.233.86.215:3030/quickserve/provider/reject/${id}`,
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
      "http://13.233.86.215:3030/quickserve/view/pending",
    );
  }
}
