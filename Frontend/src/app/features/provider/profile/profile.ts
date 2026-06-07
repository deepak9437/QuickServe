import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  provider = {
    fullName: 'Rajesh Kumar',
    email: 'rajesh@gmail.com',
    phone: '+91 9876543210',
    skills: 'Electrician',
    experience: 8,
    rating: 4.9,
    totalReviews: 128,
    address: 'Bhubaneswar, Odisha',
    status: 'Approved',
    description:
      'Experienced electrician specializing in wiring, installation, maintenance and repair services.',
  };
}
