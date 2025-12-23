import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'user_info';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.setAuthData(response))
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.setAuthData(response))
    );
  }

  logout(): void {
    console.log('AuthService: Logging out, removing token from localStorage');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      console.warn('AuthService: getToken() returned null. Checking localStorage...');
      console.warn('AuthService: localStorage keys:', Object.keys(localStorage));
      console.warn('AuthService: auth_token value:', localStorage.getItem(this.tokenKey));
    }
    return token;
  }

  getUser(): AuthResponse | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setAuthData(response: AuthResponse): void {
    if (!response || !response.token) {
      console.error('AuthService: Response object:', response);
      return;
    }
    console.log('AuthService: Token to save:', response.token.substring(0, 20) + '... (length: ' + response.token.length + ')');
    
    try {
      localStorage.setItem(this.tokenKey, response.token);
      localStorage.setItem(this.userKey, JSON.stringify(response));
      
      // Проверяем, что токен действительно сохранился
      const savedToken = localStorage.getItem(this.tokenKey);
      if (savedToken === response.token) {
        console.log('AuthService: Token saved successfully and verified');
      } else {
        console.error('AuthService: Token save verification FAILED!');
        console.error('AuthService: Expected:', response.token.substring(0, 20) + '...');
        console.error('AuthService: Got:', savedToken ? savedToken.substring(0, 20) + '...' : 'NULL');
      }
    } catch (e) {
      console.error('AuthService: Error saving to localStorage:', e);
    }
  }
}


