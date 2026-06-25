import { Routes } from "@angular/router";
import { HomeComponent } from "./features/customer/home/home";
import { ServicesComponent } from "./features/customer/services/services";
import { ProviderProfileComponent } from "./features/customer/provider-profile/provider-profile";
import { LoginComponent } from "./features/auth/login/login";
import { SignupComponent } from "./features/auth/signup/signup";
import { DashboardComponent } from "./features/customer/dashboard/dashboard";
import { ProfileComponent } from "./features/customer/profile/profile";
import { RegisterComponent } from "./features/provider/register/register";
import { providerdashboardComponent } from "./features/provider/dashboard/dashboard";
import { Booking } from "./features/customer/booking/booking";
import { ViewProfileComponent } from "./features/customer/view-profile/view-profile";
import { AdminDashboardComponent } from "./features/admin/dashboard/dashboard";
import { ProviderApprovalComponent } from "./features/admin/provider-approval/provider-approval";
import { AboutComponent } from "./features/about/about";
import { ForgotPasswordComponent } from "./features/auth/forgot-password/forgot-password";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "services",
    component: ServicesComponent,
  },

  {
    path: "provider/:id",
    component: ProviderProfileComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "provider-register",
    component: RegisterComponent,
  },
  {
    path: "provider-dashboard",
    component: providerdashboardComponent,
  },

  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
  },
  {
    path: "booking",
    component: Booking,
  },
  {
    path: "view-profile",
    component: ViewProfileComponent,
  },
  {
    path: "admin/provider-approval",
    component: ProviderApprovalComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "admin/users",
    loadComponent: () =>
      import("./features/admin/users/users").then((m) => m.UsersComponent),
  },
  {
    path: "admin/providers",
    loadComponent: () =>
      import("./features/admin/providers/providers").then(
        (m) => m.ProvidersComponent,
      ),
  },
  {
    path: "admin/bookings",
    loadComponent: () =>
      import("./features/admin/bookings/bookings").then(
        (m) => m.BookingsComponent,
      ),
  },
  {
    path: "admin/reports",
    loadComponent: () =>
      import("./features/admin/reports/reports").then(
        (m) => m.ReportsComponent,
      ),
  },
];
