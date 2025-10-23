import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'neeraali-digital';
  slides: string[] = ['../assets/slide1.png', '../assets/slide2.png'];
  currentSlide: number = 0;
  private slideInterval: any;
  loading: boolean = true;

  ngOnInit() {
    this.startSlideShow();
    // Simulate loading time
    setTimeout(() => {
      this.loading = false;
    }, 3000); // Hide loading after 3 seconds
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); // Change slide every 3 seconds
  }
}
