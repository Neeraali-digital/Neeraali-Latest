import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'neeraali-digital';
  slides: string[] = ['../assets/slide1.png', '../assets/slide2.png'];
  currentSlide: number = 0;
  private slideInterval: any;
  loading: boolean = true;
  clientLogos: string[] = [
    '../assets/clientLogos/l1.jpeg',
    '../assets/clientLogos/l2.jpeg',
    '../assets/clientLogos/l3.jpeg',
    '../assets/clientLogos/l4.jpeg',
    '../assets/clientLogos/l5.jpeg',
    '../assets/clientLogos/l6.jpeg',
    // '../assets/clientLogos/l7.jpeg'
  ];

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.startSlideShow();
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

  navigateToService(serviceId: string) {
    this.router.navigate(['/service', serviceId]);
  }
}
