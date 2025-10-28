import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  activeSection = '#home';
  showNavbar = false;

  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Who we are', href: '#who-we-are' },
    { label: 'What we do', href: '#what-we-do' },
    { label: 'Our work', href: '#our-work' },
    { label: 'Career', href: '/career', isRoute: true },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Contact', href: '#contact' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    this.isScrolled = currentScrollY > 50;
    this.showNavbar = currentScrollY > 100;
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = this.navItems.map(item => item.href);
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.querySelector(sections[i]);
      if (section) {
        const offsetTop = (section as HTMLElement).offsetTop;
        if (scrollPosition >= offsetTop) {
          this.activeSection = sections[i];
          break;
        }
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSection(href: string) {
    // If we're not on the home page, navigate to home first, then scroll
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        // Wait a bit for the page to load, then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.isMobileMenuOpen = false;
  }

  navigateToRoute(href: string) {
    this.router.navigate([href]);
    this.isMobileMenuOpen = false;
  }
}
