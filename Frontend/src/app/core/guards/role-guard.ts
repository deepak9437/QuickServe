// src/app/core/guards/role.guard.ts

import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = sessionStorage.getItem("user");

  if (!userData) {
    router.navigate(["/login"]);
    return false;
  }

  const user = JSON.parse(userData);

  const expectedRole = route.data?.["role"];

  if (user.role !== expectedRole) {
    router.navigate(["/"]);

    return false;
  }

  return true;
};
