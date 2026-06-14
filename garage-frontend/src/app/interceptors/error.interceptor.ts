import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 || error.status === 403) {

        // SSR safe
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })

  );
};
