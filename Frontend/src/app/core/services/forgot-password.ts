import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ForgotPasswordService {
  private apiUrl = "https://quick-serve.in/quickserve/forgot";

  constructor(private http: HttpClient) {}

  forgotPassword(email: string) {
    return this.http.get(`${this.apiUrl}/forgot_password/${email}`, {
      responseType: "text",
    });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(
      `${this.apiUrl}/verifyOtp/${email}/${otp}`,
      {},
      { responseType: "text" },
    );
  }

  resetPassword(email: string, newPassword: string) {
    const body = {
      userEmail: email,
      newPassword: newPassword,
    };

    return this.http.put(`${this.apiUrl}/updatePassword`, body, {
      responseType: "text",
    });
  }
}
