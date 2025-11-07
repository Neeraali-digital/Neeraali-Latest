import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid
          alert('Your session has expired. Please log in again.');
          this.authService.logout().subscribe({
            next: () => {
              this.router.navigate(['/admin/login']);
            },
            error: () => {
              // Even if logout fails, clear session and navigate
              this.authService.clearSession();
              this.router.navigate(['/admin/login']);
            }
          });
        }
        return throwError(() => error);
      })
    );
  }
}
