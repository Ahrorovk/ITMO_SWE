import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    if (token) {
      console.log('AuthInterceptor: Token exists:', token.substring(0, 20) + '...');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // Проверяем, что заголовок действительно добавлен
      console.log('AuthInterceptor: Authorization header:', req.headers.get('Authorization')?.substring(0, 30) + '...');
    } else {
      console.warn('AuthInterceptor: localStorage content:', {
        auth_token: localStorage.getItem('auth_token') ? 'exists' : 'missing',
        user_info: localStorage.getItem('user_info') ? 'exists' : 'missing'
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if ((error.status === 401 || error.status === 403) && !req.url.includes('/api/auth/')) {
          console.error('AuthInterceptor: Request headers:', {
            'Authorization': req.headers.get('Authorization') ? 'Present' : 'Missing',
            'Content-Type': req.headers.get('Content-Type')
          });
          console.error('AuthInterceptor: Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message
          });

          const hadToken = req.headers.get('Authorization');

          if (hadToken) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            console.error('AuthInterceptor: Token was NOT sent! Check why getToken() returned null.');
          }
        }
        return throwError(() => error);
      })
    );
  }
}

