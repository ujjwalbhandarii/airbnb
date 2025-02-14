import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { OptionsI } from '../types';
import { ApiService } from './api.service';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;

  constructor(private apiService: ApiService) {}

  signin(email: string, password: string): Observable<any> {
    const options: OptionsI = {
      responseType: 'json',
    };

    const body = {
      email,
      password,
    };

    return this.apiService
      .post(`${this.apiUrl}/signin`, { ...options, ...body })
      .pipe(
        tap((response: any) => {
          // Save the tokens to localStorage or sessionStorage
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        })
      );
  }

  signup(userData: {
    name: string;
    email: string;
    password: string;
    mobile_number: string;
    image?: string;
  }): Observable<any> {
    const options: OptionsI = {
      // responseType: 'json',
    };

    const body = {
      ...userData,
      role: 'USER',
    };

    return this.apiService
      .post(`${this.apiUrl}/signup`, { ...options, ...body })
      .pipe(
        tap((response: any) => {
          alert('Account created!');
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    const options: OptionsI = {
      responseType: 'json',
    };

    const body = { refreshToken };

    return this.apiService
      .post(`${this.apiUrl}/refresh`, { ...options, ...body })
      .pipe(
        tap((response: any) => {
          // Update the access token
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  signout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
