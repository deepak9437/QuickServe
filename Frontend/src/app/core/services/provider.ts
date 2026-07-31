import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  private apiUrl = "https://quick-serve.in/quickserve";

  constructor(private http: HttpClient) {}

  getAllProviders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/view/approved`);
  }
}
