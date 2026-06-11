import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private apiUrl = "http://localhost:3030/quickserve/admin";

  constructor(private http: HttpClient) {}

  getDashboardStats() {
    return this.http.get<any>(`${this.apiUrl}/dashboard_stats`);
  }
}
