import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Service {
  private apiUrl = "http://localhost:3030/quickserve";

  constructor(private http: HttpClient) {}

  viewProviders() {
    return this.http.get(`${this.apiUrl}/view/approved`);
  }
}
