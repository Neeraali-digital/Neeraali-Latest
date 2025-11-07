import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface PublicBlog {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicDataService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'An error occurred'));
  }

  // Blog methods
  getBlogs(): Observable<PublicBlog[]> {
    return this.http.get<PublicBlog[]>(`${this.API_URL}/blogs/`)
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      );
  }

  getBlogDetail(id: number): Observable<PublicBlog> {
    return this.http.get<PublicBlog>(`${this.API_URL}/blogs/${id}/`)
      .pipe(catchError(this.handleError));
  }
}
