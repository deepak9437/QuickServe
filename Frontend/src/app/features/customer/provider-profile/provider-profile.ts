import { Component } from '@angular/core';

@Component({
  selector: 'app-provider-profile',
  imports: [],
  templateUrl: './provider-profile.html',
  styleUrl: './provider-profile.css',
})
export class ProviderProfileComponent {
  provider = {
    fullName: 'Rajesh Kumar',
    skills: 'Electrician',
    experience: 8,
    description:
      'Experienced electrician specializing in wiring, installations, maintenance, and repair services.',
    phone: '9876543210',
    rating: 4.9,
    reviews: 128,
  };
}
