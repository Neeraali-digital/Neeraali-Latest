import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

export interface PublicReview {
  id: number;
  name: string;
  company: string;
  rating: number;
  review: string;
  image?: string;
  date: string;
}

export interface PublicJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  job_description: string;
  responsibilities: string;
  requirements: string[];
  working_days_timings: string;
  how_to_apply: string;
  status: string;
  applications: number;
  created_at?: string;
}

export interface EnquiryForm {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
}

export interface JobApplication {
  job: number;
  application_type: 'interested' | 'referral';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  friend_first_name?: string;
  friend_last_name?: string;
  friend_email?: string;
  friend_phone?: string;
  cover_letter?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicDataService {
  private readonly API_URL = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

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

  // Review methods
  getReviews(): Observable<PublicReview[]> {
    return this.http.get<PublicReview[]>(`${this.API_URL}/reviews/`)
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      );
  }

  // Job methods
  getJobs(): Observable<PublicJob[]> {
    return this.http.get<PublicJob[]>(`${this.API_URL}/careers/`)
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      );
  }

  getJobDetail(id: number): Observable<PublicJob> {
    return this.http.get<PublicJob>(`${this.API_URL}/careers/${id}/`)
      .pipe(catchError(this.handleError));
  }

  // Enquiry methods
  submitEnquiry(enquiry: EnquiryForm): Observable<any> {
    return this.http.post(`${this.API_URL}/enquiries/`, enquiry)
      .pipe(catchError(this.handleError));
  }

  // Job Application methods
  submitJobApplication(application: JobApplication): Observable<any> {
    return this.http.post(`${this.API_URL}/careers/applications/`, application)
      .pipe(catchError(this.handleError));
  }
}
