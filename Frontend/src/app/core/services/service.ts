import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiUrl = 'http://localhost:3030/quickserve/entry';

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    const formData = new FormData();

    formData.append('fullName', user.fullName);
    formData.append('password', user.password);
    formData.append('gender', user.gender);
    formData.append('userEmail', user.userEmail);
    formData.append('address', user.address);
    formData.append('pincode', user.pincode);
    formData.append('role', 'CUSTOMER');
    formData.append('userPhone', user.userPhone);

    return this.http.post(`${this.apiUrl}/user_register`, formData);
  }
}
