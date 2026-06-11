import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class ServiceBooking {
  private apiUrl = "http://localhost:3030/quickserve";

  constructor(private http: HttpClient) {}

  bookService(data: any): Observable<any> {
    let params = new HttpParams()
      .set("uId", data.uId)
      .set("pId", data.pId)
      .set("serviceName", data.serviceName)
      .set("problem", data.problem)
      .set("address", data.address)
      .set("bookingDate", data.bookingDate);

    return this.http.post(`${this.apiUrl}/booking/customer_booking`, null, {
      params,
    });
  }
}
