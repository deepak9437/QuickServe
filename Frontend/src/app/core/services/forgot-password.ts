import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ForgotPasswordService {
  private apiUrl = "http://localhost:3030/quickserve/user";

  constructor(private http: HttpClient) {}

  forgotPassword(email: string) {
    const formData = new FormData();

    formData.append("userEmail", email);

    return this.http.post(`${this.apiUrl}/forgot-password`, formData, {
      responseType: "text",
    });
  }

  verifyOtp(email: string, otp: string) {
    const formData = new FormData();

    formData.append("userEmail", email);
    formData.append("otp", otp);

    return this.http.post(`${this.apiUrl}/verify-otp`, formData, {
      responseType: "text",
    });
  }

  resetPassword(email: string, newPassword: string) {
    const formData = new FormData();

    formData.append("userEmail", email);
    formData.append("newPassword", newPassword);

    return this.http.post(`${this.apiUrl}/reset-password`, formData, {
      responseType: "text",
    });
  }
}
