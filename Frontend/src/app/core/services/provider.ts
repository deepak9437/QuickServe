import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  private apiUrl = "http://13.233.86.215:3030/quickserve";

  constructor(private http: HttpClient) {}

  getAllProviders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/view/approved`);
  }
}
