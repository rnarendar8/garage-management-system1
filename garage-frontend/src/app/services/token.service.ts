import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isTokenExpired(): boolean {

    // SSR safe
    if (typeof window === 'undefined') {
      return false;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return true;
    }

    try {

      const decoded = jwtDecode<JwtPayload>(token);

      const currentTime = Math.floor(Date.now() / 1000);

      return decoded.exp < currentTime;

    } catch (error) {
      return true;
    }
  }


  getToken(): string | null {

    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem('token');
  }


  clearToken(): void {

    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}
