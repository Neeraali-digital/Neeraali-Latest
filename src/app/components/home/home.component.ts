import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
    '../assets/clientLogos/l7.jpeg',
    '../assets/clientLogos/l5.jpeg'
  ];

  ngOnInit() {
    this.startSlideShow();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
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
}
