import { Injectable } from '@angular/core';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
  description: string;
}

export interface Provider {
  id: number;
  name: string;
  profession: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  price: string;
  priceUnit: string;
  avatar: string;
  verified: boolean;
  featured: boolean;
  tags: string[];
  yearsExp: number;
  completedJobs: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
  service: string;
}

@Injectable({ providedIn: 'root' })
export class ProviderService {

  getCategories(): ServiceCategory[] {
    return [
      { id: 'plumbing', name: 'Plumbing', icon: '🔧', count: 142, color: '#2D5016', description: 'Repairs, installations & maintenance' },
      { id: 'electrical', name: 'Electrical', icon: '⚡', count: 98, color: '#C4622D', description: 'Wiring, fixtures & safety checks' },
      { id: 'cleaning', name: 'Cleaning', icon: '🧹', count: 267, color: '#4A7C59', description: 'Home, office & deep cleaning' },
      { id: 'carpentry', name: 'Carpentry', icon: '🪚', count: 85, color: '#8B5E3C', description: 'Furniture, repairs & custom builds' },
      { id: 'painting', name: 'Painting', icon: '🎨', count: 119, color: '#6B4C8A', description: 'Interior, exterior & decorative' },
      { id: 'tutoring', name: 'Tutoring', icon: '📚', count: 334, color: '#1D6A8A', description: 'All subjects, all ages' },
      { id: 'gardening', name: 'Gardening', icon: '🌿', count: 76, color: '#3D7A2E', description: 'Lawn care, landscaping & more' },
      { id: 'moving', name: 'Moving', icon: '📦', count: 54, color: '#B85A00', description: 'Local & long-distance moves' },
    ];
  }

  getFeaturedProviders(): Provider[] {
    return [
      {
        id: 1, name: 'Arjun Sharma', profession: 'Master Plumber',
        category: 'Plumbing', rating: 4.9, reviews: 214, location: 'Bhubaneswar',
        distance: '1.2 km', price: '₹400', priceUnit: '/hr',
        avatar: 'AS', verified: true, featured: true,
        tags: ['Emergency', 'Commercial', 'Residential'],
        yearsExp: 12, completedJobs: 847
      },
      {
        id: 2, name: 'Priya Nayak', profession: 'Certified Electrician',
        category: 'Electrical', rating: 4.8, reviews: 189, location: 'Cuttack',
        distance: '0.8 km', price: '₹450', priceUnit: '/hr',
        avatar: 'PN', verified: true, featured: true,
        tags: ['Wiring', 'Solar', 'Safety Audit'],
        yearsExp: 8, completedJobs: 623
      },
      {
        id: 3, name: 'Sushma Das', profession: 'Home Cleaning Expert',
        category: 'Cleaning', rating: 4.9, reviews: 342, location: 'Puri',
        distance: '2.1 km', price: '₹300', priceUnit: '/hr',
        avatar: 'SD', verified: true, featured: false,
        tags: ['Deep Clean', 'Move-in/out', 'Eco-friendly'],
        yearsExp: 6, completedJobs: 1120
      },
      {
        id: 4, name: 'Ravi Mohanty', profession: 'Math & Science Tutor',
        category: 'Tutoring', rating: 4.7, reviews: 127, location: 'Bhubaneswar',
        distance: '3.4 km', price: '₹350', priceUnit: '/hr',
        avatar: 'RM', verified: true, featured: false,
        tags: ['JEE', 'NEET', 'CBSE', 'Olympiad'],
        yearsExp: 10, completedJobs: 456
      },
      {
        id: 5, name: 'Kabita Panda', profession: 'Interior Painter',
        category: 'Painting', rating: 4.8, reviews: 98, location: 'Cuttack',
        distance: '1.7 km', price: '₹380', priceUnit: '/hr',
        avatar: 'KP', verified: true, featured: true,
        tags: ['Interior', 'Texture', 'Waterproofing'],
        yearsExp: 7, completedJobs: 312
      },
      {
        id: 6, name: 'Deepak Sahoo', profession: 'Furniture Carpenter',
        category: 'Carpentry', rating: 4.6, reviews: 74, location: 'Bhubaneswar',
        distance: '4.2 km', price: '₹500', priceUnit: '/hr',
        avatar: 'DS', verified: false, featured: false,
        tags: ['Custom Build', 'Repair', 'Modular'],
        yearsExp: 15, completedJobs: 289
      },
    ];
  }

  getTestimonials(): Testimonial[] {
    return [
      {
        id: 1, name: 'Meera Tripathi', role: 'Homeowner, Bhubaneswar',
        avatar: 'MT',
        text: 'Found an amazing plumber within 20 minutes. Arjun fixed our burst pipe at midnight — truly lifesaving service. The app made booking incredibly easy.',
        rating: 5, service: 'Plumbing'
      },
      {
        id: 2, name: 'Suresh Behera', role: 'Business Owner, Cuttack',
        avatar: 'SB',
        text: 'LocalServe connected me with a certified electrician for our office rewiring. Professional, punctual, and the price was exactly as quoted. Highly recommend!',
        rating: 5, service: 'Electrical'
      },
      {
        id: 3, name: 'Anita Rath', role: 'Parent, Puri',
        avatar: 'AR',
        text: 'My daughter\'s grades improved dramatically after just 3 months with Ravi sir. The tutor matching feature is brilliant — perfectly matched to her learning style.',
        rating: 5, service: 'Tutoring'
      },
    ];
  }
}
