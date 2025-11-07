import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicDataService, EnquiryForm } from '../../services/public-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
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

  constructor(private publicDataService: PublicDataService) {}

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
