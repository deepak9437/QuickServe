import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://quick-serve.in/quickserve";
  private apiUrl1 = "https://quick-serve.in/quickserve/user";
  private apiUrl2 = "https://quick-serve.in/quickserve/provider";

  // 1. Add a BehaviorSubject to hold and stream the current user's state.
  // It checks localStorage on initialization so users stay logged in on refresh.
  private currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  // 2. Expose the subject as an Observable that components can subscribe to.
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Current User Methods
  setCurrentUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearCurrentUser() {
    localStorage.removeItem("user");
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  registerUser(data: any): Observable<any> {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("userEmail", data.userEmail);
    formData.append("address", data.address);
    formData.append("pincode", data.pincode);
    formData.append("role", "CUSTOMER");
    formData.append("userPhone", data.userPhone);

    return this.http.post(`${this.apiUrl1}/user_register`, formData, {
      responseType: "text",
    });
  }

  loginUser(loginData: any) {
    const formData = new FormData();

    formData.append("userEmail", loginData.userEmail);
    formData.append("password", loginData.password);

    return this.http.post(`${this.apiUrl1}/user_login`, formData);
  }

  registerProvider(provider: any) {
    const formData = new FormData();

    formData.append("fullName", provider.fullName);
    formData.append("password", provider.password);
    formData.append("gender", provider.gender);
    formData.append("userEmail", provider.userEmail);
    formData.append("address", provider.address);
    formData.append("pincode", provider.pincode);
    formData.append("userPhone", provider.userPhone);

    formData.append("skills", provider.skills);
    formData.append("experience", provider.experience);
    formData.append("description", provider.description);

    formData.append("documentType", provider.documentType);

    formData.append("documentURL", provider.documentURL);
    formData.append("certificate", provider.certificate);

    if (provider.extraCertificate) {
      formData.append("extraCertificate", provider.extraCertificate);
    }

    return this.http.post(`${this.apiUrl2}/provider_register`, formData);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.apiUrl1}/user_update`, data);
  }

  getAllProviders() {
    return this.http.get("https://quick-serve.in/quickserve/view/pending");
  }

  getDashboardData(pId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/dashboard/${pId}`);
  }

  getUserDashboardData(uId: number) {
    return this.http.get(
      `https://quick-serve.in/quickserve/user/dashboard/${uId}`,
    );
  }

  getProviderId(userId: number) {
    return this.http.get<number>(
      `https://quick-serve.in/quickserve/provider/provider-id/${userId}`,
    );
  }

  // ----------------------------------------------------------------------------------------
  // Provider Dashboard Booking Actions

  acceptBooking(id: number) {
    return this.http.put(`${this.apiUrl}/provider/accept/${id}`, {});
  }

  cancelBooking(id: number) {
    return this.http.put(`${this.apiUrl}/provider/cancel/${id}`, {});
  }

  generateOtp(id: number) {
    return this.http.put(`${this.apiUrl}/provider/generateOtp/${id}`, {});
  }

  verifyOtp(bookingId: number, otp: string) {
    return this.http.put(
      `${this.apiUrl}/provider/verifyOtp/${bookingId}?otp=${otp}`,
      {},
      { responseType: "text" },
    );
  }

  updateAvailability(pId: number, available: boolean) {
    return this.http.put(
      `${this.apiUrl}/provider/availability/${pId}?available=${available}`,
      {},
    );
  }
  getAvailability(userId:number){

    return this.http.get<boolean>(
        `${this.apiUrl}/provider/availability/${userId}`
    );

}
updateProfilePic(userId: number, profilePic: File) {
  const formData = new FormData();

  formData.append("profilePic", profilePic);

  return this.http.put(
    `${this.apiUrl}/user/profile/${userId}`,
    formData
  );
}
}
