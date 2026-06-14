import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const tokenService = inject(TokenService);

  // SSR safe
  if (typeof window === 'undefined') {
    return true;
  }

  if (!tokenService.isTokenExpired()) {
    return true;
  }

  tokenService.clearToken();
  router.navigate(['/login']);

  return false;
};
