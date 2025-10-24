import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Who we are', href: '#who-we-are' },
    { label: 'What we do', href: '#what-we-do' },
    { label: 'Our work', href: '#our-work' },
    { label: 'Career', href: '#career' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Contact', href: '#contact' }
  ];

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSection(href: string) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMobileMenuOpen = false;
  }
}