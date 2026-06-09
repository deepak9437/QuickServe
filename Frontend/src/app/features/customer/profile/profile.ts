import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {

  user: any = {};

  constructor() {

    this.user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );
  }

  editProfile() {
    alert('Navigate to Edit Profile Page');
  }
}