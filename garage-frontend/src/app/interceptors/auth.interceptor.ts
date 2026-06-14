import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  // SSR safe
  if (typeof window === 'undefined') {
    return next(req);
  }

  // Check expired token
  if (tokenService.isTokenExpired()) {

    tokenService.clearToken();

    router.navigate(['/login']);

    return next(req);
  }

  // Get valid token
  const token = tokenService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
