import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublicDataService, EnquiryForm } from '../../services/public-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm: EnquiryForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitError = '';

  constructor(private publicDataService: PublicDataService, private route: ActivatedRoute) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Check if there's a fragment in the URL (e.g., #send-message)
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'send-message') {
        // Scroll to the send-message section after a short delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById('send-message');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  submitContact() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';
    this.submitError = '';

    this.publicDataService.submitEnquiry(this.contactForm).subscribe({
      next: (response) => {
        this.submitMessage = 'Thank you! Your enquiry has been submitted successfully. We will get back to you within 24 hours.';
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Enquiry submission error:', error);
        this.submitError = 'Failed to submit enquiry. Please try again or contact us directly.';
        this.isSubmitting = false;
      }
    });
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    };
  }
}
