import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  related_to: string;
  author: string;
  publish_date: string;
  read_time?: number;
  status: 'published' | 'draft';
  image: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
  status: 'active' | 'inactive';
  order: number;
  hero_section: {
    title: string;
    subtitle: string;
    description: string;
    button_text: string;
  };
  services_section: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  faq_section: Array<{
    question: string;
    answer: string;
  }>;
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
  image?: string;
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
  applications_count?: number;
  shift_work: string;
  career_area: string;
  contractual_location: string;
  term_of_employment: string;
  job_description: string;
  the_opportunity: string;
  what_youll_be_doing: string;
  your_work_location: string;
  who_you_are: string;
  security_vetting: string;
  pay: string;
  benefits_and_culture: string;
  additional_information: string;
}

export interface JobApplication {
  id: number;
  job: number;
  job_title: string;
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
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  created_at: string;
  applicant_name?: string;
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
  private readonly API_URL = `${environment.apiUrl}/api`;
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

    // Handle 401 Unauthorized - token expired
    if (error.status === 401) {
      this.authService.logout();
      return throwError(() => new Error('Session expired. Please login again.'));
    }

    // Handle token invalid or expired
    if (error.error && error.error.code === 'token_not_valid') {
      this.authService.logout();
      return throwError(() => new Error('Session expired. Please login again.'));
    }

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
    this.http.get(`${this.API_URL}/blogs/admin/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      )
      .subscribe({
        next: (blogs) => this.blogsSubject.next(blogs),
        error: (error) => console.error('Failed to load blogs:', error)
      });
  }

  getBlogs(): Observable<Blog[]> {
    return this.blogs$;
  }

  addBlog(blog: Partial<Blog>, file?: File | null): Observable<Blog> {
    if (file) {
      const formData = new FormData();
      Object.keys(blog).forEach(key => {
        const value = (blog as any)[key];
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      formData.append('image', file);

      return this.http.post<Blog>(`${this.API_URL}/blogs/admin/`, formData, {
        headers: new HttpHeaders({
          'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
        })
      }).pipe(
        tap(() => this.loadBlogs()),
        catchError(this.handleError)
      );
    } else {
      return this.http.post<Blog>(`${this.API_URL}/blogs/admin/`, blog, { headers: this.getHeaders() })
        .pipe(
          tap(() => this.loadBlogs()),
          catchError(this.handleError)
        );
    }
  }

  updateBlog(id: number, blog: Partial<Blog>, file?: File | null): Observable<Blog> {
    if (file) {
      const formData = new FormData();
      Object.keys(blog).forEach(key => {
        const value = (blog as any)[key];
        // Skip image field if it's a URL string (existing image)
        if (key !== 'image' && value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      formData.append('image', file);

      return this.http.put<Blog>(`${this.API_URL}/blogs/admin/${id}/`, formData, {
        headers: new HttpHeaders({
          'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
        })
      }).pipe(
        tap(() => this.loadBlogs()),
        catchError(this.handleError)
      );
    } else {
      // Remove image field if it's a URL string to avoid sending it as text
      const { image, ...blogData } = blog;
      return this.http.put<Blog>(`${this.API_URL}/blogs/admin/${id}/`, blogData, { headers: this.getHeaders() })
        .pipe(
          tap(() => this.loadBlogs()),
          catchError(this.handleError)
        );
    }
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
    this.http.get(`${this.API_URL}/services/admin/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      )
      .subscribe({
        next: (services) => this.servicesSubject.next(services),
        error: (error) => console.error('Failed to load services:', error)
      });
  }

  getServices(): Observable<Service[]> {
    return this.services$;
  }

  getPublicServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.API_URL}/services/`)
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      );
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

  updateServiceOrder(serviceOrders: Array<{id: number, order: number}>): Observable<any> {
    return this.http.post(`${this.API_URL}/services/admin/update-order/`, { service_orders: serviceOrders }, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadServices()),
        catchError(this.handleError)
      );
  }

  // Enquiry methods
  loadEnquiries(): void {
    this.http.get(`${this.API_URL}/enquiries/admin/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      )
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
    this.http.get(`${this.API_URL}/reviews/admin/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      )
      .subscribe({
        next: (reviews) => this.reviewsSubject.next(reviews),
        error: (error) => console.error('Failed to load reviews:', error)
      });
  }

  getReviews(): Observable<Review[]> {
    return this.reviews$;
  }

  addReview(review: Partial<Review>, file?: File | null): Observable<Review> {
    if (file) {
      const formData = new FormData();
      Object.keys(review).forEach(key => {
        const value = (review as any)[key];
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      formData.append('image', file);

      return this.http.post<Review>(`${this.API_URL}/reviews/admin/`, formData, {
        headers: new HttpHeaders({
          'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
        })
      }).pipe(
        tap(() => this.loadReviews()),
        catchError(this.handleError)
      );
    } else {
      return this.http.post<Review>(`${this.API_URL}/reviews/admin/`, review, { headers: this.getHeaders() })
        .pipe(
          tap(() => this.loadReviews()),
          catchError(this.handleError)
        );
    }
  }

  updateReview(id: number, review: Partial<Review>, file?: File | null): Observable<Review> {
    if (file) {
      const formData = new FormData();
      Object.keys(review).forEach(key => {
        const value = (review as any)[key];
        // Skip image field if it's a URL string (existing image)
        if (key !== 'image' && value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      formData.append('image', file);

      return this.http.put<Review>(`${this.API_URL}/reviews/admin/${id}/`, formData, {
        headers: new HttpHeaders({
          'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
        })
      }).pipe(
        tap(() => this.loadReviews()),
        catchError(this.handleError)
      );
    } else {
      // Remove image field if it's a URL string to avoid sending it as text
      const { image, ...reviewData } = review;
      return this.http.put<Review>(`${this.API_URL}/reviews/admin/${id}/`, reviewData, { headers: this.getHeaders() })
        .pipe(
          tap(() => this.loadReviews()),
          catchError(this.handleError)
        );
    }
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
    this.http.get(`${this.API_URL}/careers/admin/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      )
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

  // Job Application methods
  getJobApplications(jobId?: number): Observable<JobApplication[]> {
    const url = jobId 
      ? `${this.API_URL}/careers/admin/applications/?job_id=${jobId}`
      : `${this.API_URL}/careers/admin/applications/`;
    return this.http.get<JobApplication[]>(url, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.results || response),
        catchError(this.handleError)
      );
  }

  getJobApplication(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.API_URL}/careers/admin/applications/${id}/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateJobApplicationStatus(id: number, status: string): Observable<JobApplication> {
    return this.http.patch<JobApplication>(`${this.API_URL}/careers/admin/applications/${id}/`, { status }, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteJobApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/careers/admin/applications/${id}/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Dashboard stats
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API_URL}/dashboard/stats/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}
