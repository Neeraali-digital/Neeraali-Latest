import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = '#home';
  showNavbar = true;
  private routerSubscription: Subscription = new Subscription();

  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Who we are', href: '#who-we-are' },
    { label: 'What we do', href: '#what-we-do' },
    { label: 'Career', href: '/career', isRoute: true },
    { label: 'Blogs', href: '/blog', isRoute: true },
    { label: 'Contact', href: '/contact', isRoute: true }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.setActiveSectionFromRoute();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveSectionFromRoute();
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    this.isScrolled = currentScrollY > 50;
    this.showNavbar = true;
    this.updateActiveSection();
  }

  updateActiveSection() {
    if (this.router.url !== '/') {
      return; // Only update on home page
    }
    const sections = this.navItems.filter(item => !item.isRoute).map(item => item.href);
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

  setActiveSectionFromRoute() {
    const currentUrl = this.router.url;
    const routeItem = this.navItems.find(item => item.isRoute && item.href === currentUrl);
    if (routeItem) {
      this.activeSection = routeItem.href;
    } else if (currentUrl === '/') {
      this.activeSection = '#home';
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
