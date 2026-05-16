import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProviderService } from '../../services/provider';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  providerService = inject(ProviderService);
  categories = this.providerService.getCategories();
}
