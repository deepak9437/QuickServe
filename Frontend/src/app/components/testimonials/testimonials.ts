import { Component, inject } from '@angular/core';
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss'
})
export class Testimonials {
  providerService = inject(ProviderService);
  testimonials = this.providerService.getTestimonials();
}
