import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
}

export interface AuthResponse {
  user: User;
  tokens: {
    refresh: string;
    access: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load from localStorage on init
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('current_user');

    if (token) {
      this.tokenSubject.next(token);
    }

    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login/`, credentials).pipe(
      tap(response => {
        this.setSession(response);
      }),
      catchError(this.handleError)
    );
  }

  register(userData: { email: string; password: string; username: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register/`, userData).pipe(
      tap(response => {
        this.setSession(response);
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post(`${this.API_URL}/logout/`, { refresh_token: refreshToken }).pipe(
      tap(() => {
        this.clearSession();
      }),
      catchError(() => {
        // Even if logout fails on server, clear local session
        this.clearSession();
        return throwError(() => new Error('Logout failed'));
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post(`${this.API_URL}/refresh/`, { refresh: refreshToken }).pipe(
      tap((response: any) => {
        const newToken = response.access;
        localStorage.setItem('access_token', newToken);
        this.tokenSubject.next(newToken);
      }),
      catchError(() => {
        this.clearSession();
        return throwError(() => new Error('Token refresh failed'));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.is_admin : false;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('access_token', authResult.tokens.access);
    localStorage.setItem('refresh_token', authResult.tokens.refresh);
    localStorage.setItem('current_user', JSON.stringify(authResult.user));

    this.tokenSubject.next(authResult.tokens.access);
    this.currentUserSubject.next(authResult.user);
  }

  clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');

    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.error && typeof error.error === 'object') {
        // Handle Django REST framework error format
        const errors = error.error;
        if (errors.non_field_errors) {
          errorMessage = errors.non_field_errors[0];
        } else if (errors.detail) {
          errorMessage = errors.detail;
        } else {
          // Get first error from fields
          const firstKey = Object.keys(errors)[0];
          if (firstKey && Array.isArray(errors[firstKey])) {
            errorMessage = errors[firstKey][0];
          }
        }
      } else if (error.status === 0) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else {
        errorMessage = `Server error: ${error.status} ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
