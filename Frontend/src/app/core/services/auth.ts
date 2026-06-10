import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl1 = "http://localhost:3030/quickserve/user";
  private apiUrl2 = "http://localhost:3030/quickserve/provider";

  constructor(private http: HttpClient) {}

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

    return this.http.post(`${this.apiUrl1}/user_register`, formData);
  }

  loginUser(loginData: any) {
    const formData = new FormData();

    formData.append("userEmail", loginData.userEmail);
    formData.append("password", loginData.password);

    return this.http.post(`${this.apiUrl1}/user_login`, formData, {
      responseType: "text",
    });
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
    return this.http.get("http://localhost:3030/quickserve/view/all");
  }
}
