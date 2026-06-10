import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private apiUrl = "http://localhost:8080/admin";

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard-stats`);
  }

  getRecentActivities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recent-activities`);
  }
}
