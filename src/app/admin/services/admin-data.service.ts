import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
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

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
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
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample blogs
    this.blogsSubject.next([
      {
        id: 1,
        title: 'Digital Marketing Trends 2024',
        excerpt: 'Explore the latest trends shaping digital marketing...',
        author: 'Admin',
        publishDate: '2024-01-15',
        status: 'published',
        image: 'assets/blog.jpg'
      }
    ]);

    // Sample services
    this.servicesSubject.next([
      {
        id: 1,
        name: 'Brand Identity',
        description: 'Build recognition and trust with powerful brand systems.',
        features: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
        price: 'Starting from ₹25,000',
        status: 'active'
      }
    ]);

    // Sample enquiries
    this.enquiriesSubject.next([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        company: 'Tech Corp',
        service: 'Digital Marketing',
        message: 'Looking for comprehensive digital marketing services.',
        date: '2024-01-15',
        status: 'new'
      }
    ]);

    // Sample reviews
    this.reviewsSubject.next([
      {
        id: 1,
        name: 'Sarah Johnson',
        company: 'Tech Innovations',
        rating: 5,
        review: 'Exceptional service! The team delivered beyond expectations.',
        date: '2024-01-15',
        status: 'approved'
      }
    ]);

    // Sample jobs
    this.jobsSubject.next([
      {
        id: 1,
        title: 'Frontend Developer',
        department: 'Technology',
        location: 'Bangalore',
        type: 'full-time',
        experience: '2-4 years',
        description: 'We are looking for a skilled Frontend Developer.',
        requirements: ['React/Angular expertise', 'HTML/CSS/JavaScript'],
        status: 'active',
        applications: 12
      }
    ]);
  }

  // Blog methods
  getBlogs(): Observable<Blog[]> {
    return this.blogs$;
  }

  addBlog(blog: Blog): void {
    const currentBlogs = this.blogsSubject.value;
    blog.id = Math.max(...currentBlogs.map(b => b.id), 0) + 1;
    this.blogsSubject.next([...currentBlogs, blog]);
  }

  updateBlog(blog: Blog): void {
    const currentBlogs = this.blogsSubject.value;
    const index = currentBlogs.findIndex(b => b.id === blog.id);
    if (index !== -1) {
      currentBlogs[index] = blog;
      this.blogsSubject.next([...currentBlogs]);
    }
  }

  deleteBlog(id: number): void {
    const currentBlogs = this.blogsSubject.value;
    this.blogsSubject.next(currentBlogs.filter(b => b.id !== id));
  }

  // Service methods
  getServices(): Observable<Service[]> {
    return this.services$;
  }

  addService(service: Service): void {
    const currentServices = this.servicesSubject.value;
    service.id = Math.max(...currentServices.map(s => s.id), 0) + 1;
    this.servicesSubject.next([...currentServices, service]);
  }

  updateService(service: Service): void {
    const currentServices = this.servicesSubject.value;
    const index = currentServices.findIndex(s => s.id === service.id);
    if (index !== -1) {
      currentServices[index] = service;
      this.servicesSubject.next([...currentServices]);
    }
  }

  deleteService(id: number): void {
    const currentServices = this.servicesSubject.value;
    this.servicesSubject.next(currentServices.filter(s => s.id !== id));
  }

  // Enquiry methods
  getEnquiries(): Observable<Enquiry[]> {
    return this.enquiries$;
  }

  updateEnquiry(enquiry: Enquiry): void {
    const currentEnquiries = this.enquiriesSubject.value;
    const index = currentEnquiries.findIndex(e => e.id === enquiry.id);
    if (index !== -1) {
      currentEnquiries[index] = enquiry;
      this.enquiriesSubject.next([...currentEnquiries]);
    }
  }

  deleteEnquiry(id: number): void {
    const currentEnquiries = this.enquiriesSubject.value;
    this.enquiriesSubject.next(currentEnquiries.filter(e => e.id !== id));
  }

  // Review methods
  getReviews(): Observable<Review[]> {
    return this.reviews$;
  }

  addReview(review: Review): void {
    const currentReviews = this.reviewsSubject.value;
    review.id = Math.max(...currentReviews.map(r => r.id), 0) + 1;
    this.reviewsSubject.next([...currentReviews, review]);
  }

  updateReview(review: Review): void {
    const currentReviews = this.reviewsSubject.value;
    const index = currentReviews.findIndex(r => r.id === review.id);
    if (index !== -1) {
      currentReviews[index] = review;
      this.reviewsSubject.next([...currentReviews]);
    }
  }

  deleteReview(id: number): void {
    const currentReviews = this.reviewsSubject.value;
    this.reviewsSubject.next(currentReviews.filter(r => r.id !== id));
  }

  // Job methods
  getJobs(): Observable<Job[]> {
    return this.jobs$;
  }

  addJob(job: Job): void {
    const currentJobs = this.jobsSubject.value;
    job.id = Math.max(...currentJobs.map(j => j.id), 0) + 1;
    this.jobsSubject.next([...currentJobs, job]);
  }

  updateJob(job: Job): void {
    const currentJobs = this.jobsSubject.value;
    const index = currentJobs.findIndex(j => j.id === job.id);
    if (index !== -1) {
      currentJobs[index] = job;
      this.jobsSubject.next([...currentJobs]);
    }
  }

  deleteJob(id: number): void {
    const currentJobs = this.jobsSubject.value;
    this.jobsSubject.next(currentJobs.filter(j => j.id !== id));
  }

  // Statistics
  getStats() {
    return {
      totalBlogs: this.blogsSubject.value.length,
      totalServices: this.servicesSubject.value.length,
      totalEnquiries: this.enquiriesSubject.value.length,
      totalReviews: this.reviewsSubject.value.length,
      totalCareers: this.jobsSubject.value.length
    };
  }
}