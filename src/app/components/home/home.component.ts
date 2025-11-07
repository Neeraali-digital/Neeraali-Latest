import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { FooterComponent } from '../footer/footer.component';
import { AdminDataService, Service } from '../../admin/services/admin-data.service';
import { PublicDataService, PublicReview } from '../../services/public-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, FormsModule, FooterComponent],
  providers: [AdminDataService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'neeraali-digital';
  slides: string[] = ['../assets/slide1.png', '../assets/slide2.png'];
  currentSlide: number = 0;
  private slideInterval: any;
  loading: boolean = true;
  services: Service[] = [];
  clientLogos: string[] = [
    '../assets/clientLogos/2.png',
    '../assets/clientLogos/1.png',
    '../assets/clientLogos/3.png',
    '../assets/clientLogos/4.png',
    // '../assets/clientLogos/5.png',
    '../assets/clientLogos/7.png',
    '../assets/clientLogos/8.png',
    '../assets/clientLogos/9.png',
    '../assets/clientLogos/10.png',
    '../assets/clientLogos/11.png',
    '../assets/clientLogos/12.png',
    '../assets/clientLogos/13.png',
    '../assets/clientLogos/14.png',
    '../assets/clientLogos/15.png',
    '../assets/clientLogos/16.png',
    '../assets/clientLogos/17.png',
    '../assets/clientLogos/18.png',
    '../assets/clientLogos/6.png',
    // '../assets/clientLogos/19.png',
    // '../assets/clientLogos/20.png',
  ];

  clientReviews = [
    {
      name: 'Rahul Sharma',
      company: 'TechStart India',
      review: 'Neeraali Digital transformed our brand identity completely. Their creative approach and strategic thinking helped us stand out in a competitive market.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Priya Patel',
      company: 'GrowthCorp Solutions',
      review: 'Outstanding digital marketing results! Our online presence increased by 300% within just 3 months of working with them.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Arjun Singh',
      company: 'Creative Studios India',
      review: 'Professional, creative, and results-driven. The team at Neeraali Digital exceeded all our expectations with their innovative solutions.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Anjali Gupta',
      company: 'NextGen Technologies',
      review: 'Their web development and SEO services helped us achieve top rankings on Google. Highly recommend their expertise!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  currentReviewIndex = 0;

  showQuoteModal: boolean = false;
  quoteForm = {
    name: '',
    email: '',
    phone: '',
    website: '',
    company: '',
    service: '',
    message: ''
  };

  constructor(private router: Router, private adminDataService: AdminDataService, private publicDataService: PublicDataService) {}

  ngOnInit() {
    this.startSlideShow();
    this.loadServices();
    this.loadReviews();
  }

  private loadServices() {
    this.adminDataService.getPublicServices().subscribe({
      next: (services: Service[]) => {
        this.services = services;
        console.log(services,'eeeeeeeeeeeeeeeeeeee');

      },
      error: (error: any) => {
        console.error('Failed to load services:', error);
      }
    });
  }

  private loadReviews() {
    this.publicDataService.getReviews().subscribe({
      next: (reviews: PublicReview[]) => {
        if (reviews && reviews.length > 0) {
          this.clientReviews = reviews.map(review => ({
            name: review.name,
            company: review.company,
            review: review.review,
            rating: review.rating,
            image: review.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
          }));
        }
      },
      error: (error: any) => {
        console.error('Failed to load reviews:', error);
        // Keep fallback reviews if API fails
      }
    });
  }

  onLoadingFinished() {
    this.loading = false;
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);
  }

  private initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
  }

  getQuote() {
    this.showQuoteModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeQuoteModal(event?: Event) {
    if (event && (event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.showQuoteModal = false;
      document.body.style.overflow = 'auto';
      this.resetForm();
    } else if (!event) {
      this.showQuoteModal = false;
      document.body.style.overflow = 'auto';
      this.resetForm();
    }
  }

  submitQuote() {
    if (this.quoteForm.name && this.quoteForm.email && this.quoteForm.phone && this.quoteForm.service) {
      console.log('Quote form submitted:', this.quoteForm);
      // Here you would typically send the data to your backend
      alert('Thank you for your quote request! We will get back to you soon.');
      this.closeQuoteModal();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  private resetForm() {
    this.quoteForm = {
      name: '',
      email: '',
      phone: '',
      website: '',
      company: '',
      service: '',
      message: ''
    };
  }

  navigateToService(service: Service) {
    const serviceId = service.name.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/service', serviceId]);
  }

  nextReview() {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.clientReviews.length;
  }

  prevReview() {
    this.currentReviewIndex = this.currentReviewIndex === 0 ? this.clientReviews.length - 1 : this.currentReviewIndex - 1;
  }

  goToReview(index: number) {
    this.currentReviewIndex = index;
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
}
