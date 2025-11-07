import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService, Service } from '../../admin/services/admin-data.service';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  private adminDataService = inject(AdminDataService);
  service: Service | null = null;
  faqs: FAQItem[] = [];

  clientLogos: string[] = [
    '../assets/clientLogos/1.png',
    '../assets/clientLogos/2.png',
    '../assets/clientLogos/3.png',
    '../assets/clientLogos/4.png',
    // '../assets/clientLogos/5.png',
    '../assets/clientLogos/6.png',
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
    // '../assets/clientLogos/19.png',
    // '../assets/clientLogos/20.png',
  ];

  services: Service[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.adminDataService.getServices().subscribe({
      next: (services: Service[]) => {
        this.services = services.filter((service: Service) => service.status === 'active');
        this.route.params.subscribe(params => {
          const serviceId = params['id'];
          // Find service by name slug
          const serviceName = serviceId.replace(/-/g, ' ').toLowerCase();
          this.service = this.services.find(s => s.name.toLowerCase() === serviceName) || null;
          if (!this.service) {
            this.router.navigate(['/']);
          } else {
            // Initialize FAQs when service is loaded
            this.faqs = this.service.faq_section ? this.service.faq_section.map(faq => ({
              question: faq.question,
              answer: faq.answer,
              isOpen: false
            })) : [];
          }
        });
      },
      error: (error: any) => {
        console.error('Failed to load services:', error);
        this.router.navigate(['/']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  toggleFAQ(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
