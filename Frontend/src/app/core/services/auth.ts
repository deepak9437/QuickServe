import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3030/quickserve/entry';

  constructor(private http: HttpClient) {}

  registerUser(data: any): Observable<any> {
    const formData = new FormData();

    formData.append('fullName', data.fullName);
    formData.append('password', data.password);
    formData.append('gender', data.gender);
    formData.append('userEmail', data.userEmail);
    formData.append('address', data.address);
    formData.append('pincode', data.pincode);
    formData.append('role', 'CUSTOMER');
    formData.append('userPhone', data.userPhone);

    return this.http.post(`${this.apiUrl}/user_register`, formData);
  }

  loginUser(loginData: any) {
    const formData = new FormData();

    formData.append('userEmail', loginData.userEmail);
    formData.append('password', loginData.password);

    return this.http.post(`${this.apiUrl}/user_login`, formData, { responseType: 'text' });
  }

  registerProvider(provider: any) {
    const formData = new FormData();

    formData.append('fullName', provider.fullName);
    formData.append('password', provider.password);
    formData.append('gender', provider.gender);
    formData.append('userEmail', provider.userEmail);
    formData.append('address', provider.address);
    formData.append('pincode', provider.pincode);
    formData.append('userPhone', provider.userPhone);

    formData.append('skills', provider.skills);
    formData.append('experience', provider.experience);
    formData.append('description', provider.description);

    formData.append('documentType', provider.documentType);

    formData.append('documentURL', provider.documentURL);
    formData.append('certificate', provider.certificate);

    if (provider.extraCertificate) {
      formData.append('extraCertificate', provider.extraCertificate);
    }

    return this.http.post(`${this.apiUrl}/provider_register`, formData);
  }
}
