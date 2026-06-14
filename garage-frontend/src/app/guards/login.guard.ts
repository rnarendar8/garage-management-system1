import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const loginGuard: CanActivateFn = () => {

  const router = inject(Router);
  const tokenService = inject(TokenService);

  // SSR safe
  if (typeof window === 'undefined') {
    return true;
  }

  // User has a valid token
  if (!tokenService.isTokenExpired()) {
    router.navigate(['/app/dashboard']);
    return false;
  }

  // Remove invalid/expired token
  tokenService.clearToken();

  return true;
};
