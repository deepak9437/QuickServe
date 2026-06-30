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

import { ViewProfileComponent } from "./features/customer/view-profile/view-profile";
import { AdminDashboardComponent } from "./features/admin/dashboard/dashboard";
import { ProviderApprovalComponent } from "./features/admin/provider-approval/provider-approval";
import { AboutComponent } from "./features/about/about";
import { ForgotPasswordComponent } from "./features/auth/forgot-password/forgot-password";
import { roleGuard } from "./core/guards/role-guard";
import { ProviderProfile } from "./features/provider/profile/profile";
import { Layout } from "./features/admin/layout/layout";

import { authGuard } from "./core/guards/auth-guard";

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
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },

  // CUSTOMER
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: "customer" },
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: "customer" },
  },
  {
    path: "view-profile",
    component: ViewProfileComponent,
    canActivate: [authGuard],
  },

  // PROVIDER
  {
    path: "provider-register",
    component: RegisterComponent,
  },
  {
    path: "provider-dashboard",
    component: providerdashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: "provider" },
  },
  {
    path: "provider-profile",
    component: ProviderProfile,
    canActivate: [authGuard, roleGuard],
    data: { role: "provider" },
  },
  // ADMIN
  // ADMIN
  {
    path: "admin",
    component: Layout,
    canActivate: [authGuard, roleGuard],
    data: { role: "admin" },

    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },

      {
        path: "dashboard",
        component: AdminDashboardComponent,
      },

      {
        path: "provider-approval",
        component: ProviderApprovalComponent,
      },

      {
        path: "users",
        loadComponent: () =>
          import("./features/admin/users/users").then((m) => m.UsersComponent),
      },

      {
        path: "providers",
        loadComponent: () =>
          import("./features/admin/providers/providers").then(
            (m) => m.ProvidersComponent,
          ),
      },

      {
        path: "bookings",
        loadComponent: () =>
          import("./features/admin/bookings/bookings").then(
            (m) => m.BookingsComponent,
          ),
      },

      {
        path: "reports",
        loadComponent: () =>
          import("./features/admin/reports/reports").then(
            (m) => m.ReportsComponent,
          ),
      },
    ],
  },
  {
    path: "about",
    component: AboutComponent,
  },
];
