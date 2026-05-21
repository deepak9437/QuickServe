import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  private api = inject(ApiService);

  stats = [
    { value: '2,400+', label: 'Verified Pros' },
    { value: '18,000+', label: 'Jobs Done' },
    { value: '4.9★', label: 'Avg Rating' },
    { value: '15 min', label: 'Avg Response' },
  ];
}
