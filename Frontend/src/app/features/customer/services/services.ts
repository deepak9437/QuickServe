import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  providers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      skill: 'Electrician',
      experience: 8,
      rating: 4.9,
      reviews: 128,
      avatar: '👨‍🔧',
    },
    {
      id: 2,
      name: 'Prakash Das',
      skill: 'Plumber',
      experience: 6,
      rating: 4.8,
      reviews: 95,
      avatar: '🚿',
    },
    {
      id: 3,
      name: 'Sunita Mohanty',
      skill: 'Cleaning Expert',
      experience: 5,
      rating: 4.9,
      reviews: 210,
      avatar: '🧹',
    },
    {
      id: 4,
      name: 'Ramesh Nayak',
      skill: 'Carpenter',
      experience: 10,
      rating: 4.7,
      reviews: 75,
      avatar: '🪚',
    },
    {
      id: 5,
      name: 'Sanjay Rout',
      skill: 'Painter',
      experience: 7,
      rating: 4.8,
      reviews: 110,
      avatar: '🎨',
    },
    {
      id: 6,
      name: 'Amit Behera',
      skill: 'AC Repair',
      experience: 9,
      rating: 4.9,
      reviews: 160,
      avatar: '❄️',
    },
    {
      id: 7,
      name: 'Amit das',
      skill: 'AC Repair',
      experience: 8,
      rating: 4.9,
      reviews: 160,
      avatar: '❄️',
    },
  ];
}
