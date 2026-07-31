import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  private apiUrl = "https://quick-serve.in/quickserve";

  constructor(private http: HttpClient) {}

  submitReview(
    bookingId: number,
    uId: number,
    pId: number,
    rating: number,
    comment: string,
  ) {
    const formData = new FormData();

    formData.append("bId", bookingId.toString());
    formData.append("uId", uId.toString());
    formData.append("pId", pId.toString());
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    return this.http.post(`${this.apiUrl}/review/set_review`, formData, {
      responseType: "text",
    });
  }
  getAllReviews() {
    return this.http.get<any[]>(`${this.apiUrl}/review/all`);
  }
}
