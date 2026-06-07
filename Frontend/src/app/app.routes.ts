import { Routes } from '@angular/router';
import { HomeComponent } from './features/customer/home/home';
import { ServicesComponent } from './features/customer/services/services';
import { ProviderProfileComponent } from './features/customer/provider-profile/provider-profile';
import { LoginComponent } from './features/auth/login/login';
import { SignupComponent } from './features/auth/signup/signup';
import { DashboardComponent } from './features/customer/dashboard/dashboard';
import { ProfileComponent } from './features/customer/profile/profile';
import { RegisterComponent } from './features/provider/register/register';
import { providerdashboardComponent } from './features/provider/dashboard/dashboard';
import { Booking } from './features/customer/booking/booking';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },

  {
    path: 'provider/:id',
    component: ProviderProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'provider-register',
    component: RegisterComponent,
  },
  {
    path: 'provider-dashboard',
    component: providerdashboardComponent,
  },
  {
    path: 'booking',
    component: Booking,
  }
];
