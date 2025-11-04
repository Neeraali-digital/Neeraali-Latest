import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publish_date: string;
  status: 'published' | 'draft';
  image: string;
  content?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
  status: 'active' | 'inactive';
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface Review {
  id: number;
  name: string;
  company: string;
  rating: number;
  review: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  description: string;
  requirements: string[];
  status: 'active' | 'inactive';
  applications: number;
}

export interface DashboardStats {
  totalBlogs: number;
  totalServices: number;
  totalEnquiries: number;
  totalReviews: number;
  totalCareers: number;
  activeJobs: number;
  publishedBlogs: number;
  activeServices: number;
  newEnquiries: number;
  pendingReviews: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private readonly API_URL = 'http://localhost:8000/api';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private blogsSubject = new BehaviorSubject<Blog[]>([]);
  private servicesSubject = new BehaviorSubject<Service[]>([]);
  private enquiriesSubject = new BehaviorSubject<Enquiry[]>([]);
  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  private jobsSubject = new BehaviorSubject<Job[]>([]);

  blogs$ = this.blogsSubject.asObservable();
  services$ = this.servicesSubject.asObservable();
  enquiries$ = this.enquiriesSubject.asObservable();
  reviews$ = this.reviewsSubject.asObservable();
  jobs$ = this.jobsSubject.asObservable();

  constructor() {
    // Load data on initialization
    this.loadAllData();
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'An error occurred'));
  }

  loadAllData(): void {
    this.loadBlogs();
    this.loadServices();
    this.loadEnquiries();
    this.loadReviews();
    this.loadJobs();
  }

  // Blog methods
  loadBlogs(): void {
    this.http.get<Blog[]>(`${this.API_URL}/blogs/admin/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (blogs) => this.blogsSubject.next(blogs),
        error: (error) => console.error('Failed to load blogs:', error)
      });
  }

  getBlogs(): Observable<Blog[]> {
    return this.blogs$;
  }

  addBlog(blog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>(`${this.API_URL}/blogs/admin/`, blog, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadBlogs()),
        catchError(this.handleError)
      );
  }

  updateBlog(id: number, blog: Partial<Blog>): Observable<Blog> {
    return this.http.put<Blog>(`${this.API_URL}/blogs/admin/${id}/`, blog, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadBlogs()),
        catchError(this.handleError)
      );
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/blogs/admin/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadBlogs()),
        catchError(this.handleError)
      );
  }

  // Service methods
  loadServices(): void {
    this.http.get<Service[]>(`${this.API_URL}/services/admin/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (services) => this.servicesSubject.next(services),
        error: (error) => console.error('Failed to load services:', error)
      });
  }

  getServices(): Observable<Service[]> {
    return this.services$;
  }

  addService(service: Partial<Service>): Observable<Service> {
    return this.http.post<Service>(`${this.API_URL}/services/admin/`, service, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadServices()),
        catchError(this.handleError)
      );
  }

  updateService(id: number, service: Partial<Service>): Observable<Service> {
    return this.http.put<Service>(`${this.API_URL}/services/admin/${id}/`, service, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadServices()),
        catchError(this.handleError)
      );
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/services/admin/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadServices()),
        catchError(this.handleError)
      );
  }

  // Enquiry methods
  loadEnquiries(): void {
    this.http.get<Enquiry[]>(`${this.API_URL}/enquiries/admin/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (enquiries) => this.enquiriesSubject.next(enquiries),
        error: (error) => console.error('Failed to load enquiries:', error)
      });
  }

  getEnquiries(): Observable<Enquiry[]> {
    return this.enquiries$;
  }

  updateEnquiry(id: number, enquiry: Partial<Enquiry>): Observable<Enquiry> {
    return this.http.put<Enquiry>(`${this.API_URL}/enquiries/admin/${id}/`, enquiry, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadEnquiries()),
        catchError(this.handleError)
      );
  }

  deleteEnquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/enquiries/admin/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadEnquiries()),
        catchError(this.handleError)
      );
  }

  // Review methods
  loadReviews(): void {
    this.http.get<Review[]>(`${this.API_URL}/reviews/admin/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (reviews) => this.reviewsSubject.next(reviews),
        error: (error) => console.error('Failed to load reviews:', error)
      });
  }

  getReviews(): Observable<Review[]> {
    return this.reviews$;
  }

  addReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(`${this.API_URL}/reviews/admin/`, review, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadReviews()),
        catchError(this.handleError)
      );
  }

  updateReview(id: number, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.API_URL}/reviews/admin/${id}/`, review, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadReviews()),
        catchError(this.handleError)
      );
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/reviews/admin/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadReviews()),
        catchError(this.handleError)
      );
  }

  // Job methods
  loadJobs(): void {
    this.http.get<Job[]>(`${this.API_URL}/careers/admin/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (jobs) => this.jobsSubject.next(jobs),
        error: (error) => console.error('Failed to load jobs:', error)
      });
  }

  getJobs(): Observable<Job[]> {
    return this.jobs$;
  }

  addJob(job: Partial<Job>): Observable<Job> {
    return this.http.post<Job>(`${this.API_URL}/careers/admin/`, job, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadJobs()),
        catchError(this.handleError)
      );
  }

  updateJob(id: number, job: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${this.API_URL}/careers/admin/${id}/`, job, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadJobs()),
        catchError(this.handleError)
      );
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/careers/admin/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadJobs()),
        catchError(this.handleError)
      );
  }

  // Dashboard stats
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API_URL}/dashboard/stats/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}
