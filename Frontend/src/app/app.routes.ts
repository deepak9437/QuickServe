import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'services', loadComponent: () => import('./pages/service-list/service-list').then(m => m.ServiceList) },
  { path: 'providers', loadComponent: () => import('./pages/provider-detail/provider-detail').then(m => m.ProviderDetail) },
  { path: '**', redirectTo: '' }
];
