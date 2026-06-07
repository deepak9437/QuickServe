import { CanActivateFn } from '@angular/router';

export const providerGuard: CanActivateFn = (route, state) => {
  return true;
};
