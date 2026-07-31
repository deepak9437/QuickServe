import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Service {
  private apiUrl = "https://quick-serve.in/quickserve";

  constructor(private http: HttpClient) {}

  viewProviders() {
    return this.http.get(`${this.apiUrl}/view/approved`);
  }
}
