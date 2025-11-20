import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicDataService, JobApplication, PublicJob } from '../../services/public-data.service';

@Component({
  selector: 'app-job-application-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-application-modal.component.html',
  styleUrls: ['./job-application-modal.component.css']
})
export class JobApplicationModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() job: PublicJob | null = null;
  @Input() applicationType: 'interested' | 'referral' = 'interested';
  @Output() closeModal = new EventEmitter<void>();
  @Output() applicationSubmitted = new EventEmitter<void>();

  application: JobApplication = {
    job: 0,
    application_type: 'interested',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    friend_first_name: '',
    friend_last_name: '',
    friend_email: '',
    friend_phone: '',
    cover_letter: ''
  };

  isSubmitting = false;
  errors: any = {};

  constructor(private publicDataService: PublicDataService) {}

  ngOnInit() {
    if (this.job) {
      this.application.job = this.job.id;
      this.application.application_type = this.applicationType;
    }
  }

  ngOnChanges() {
    if (this.job && this.isOpen) {
      this.application.job = this.job.id;
      this.application.application_type = this.applicationType;
      this.resetForm();
    }
  }

  resetForm() {
    this.application = {
      job: this.job?.id || 0,
      application_type: this.applicationType,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      friend_first_name: '',
      friend_last_name: '',
      friend_email: '',
      friend_phone: '',
      cover_letter: ''
    };
    this.errors = {};
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.application.first_name.trim()) {
      this.errors.first_name = 'First name is required';
      isValid = false;
    }

    if (!this.application.last_name.trim()) {
      this.errors.last_name = 'Last name is required';
      isValid = false;
    }

    if (!this.application.email.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.application.email)) {
      this.errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!this.application.phone.trim()) {
      this.errors.phone = 'Phone number is required';
      isValid = false;
    }

    if (this.applicationType === 'referral') {
      if (!this.application.friend_first_name?.trim()) {
        this.errors.friend_first_name = 'Friend\'s first name is required';
        isValid = false;
      }

      if (!this.application.friend_last_name?.trim()) {
        this.errors.friend_last_name = 'Friend\'s last name is required';
        isValid = false;
      }

      if (!this.application.friend_email?.trim()) {
        this.errors.friend_email = 'Friend\'s email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.application.friend_email)) {
        this.errors.friend_email = 'Please enter a valid email address';
        isValid = false;
      }

      if (!this.application.friend_phone?.trim()) {
        this.errors.friend_phone = 'Friend\'s phone number is required';
        isValid = false;
      }
    }

    return isValid;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    this.publicDataService.submitJobApplication(this.application).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.applicationSubmitted.emit();
        this.onClose();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Application submission error:', error);
        if (error.error && typeof error.error === 'object') {
          this.errors = error.error;
        } else {
          this.errors.general = 'Failed to submit application. Please try again.';
        }
      }
    });
  }

  onClose() {
    this.resetForm();
    this.closeModal.emit();
  }

  get modalTitle(): string {
    return this.applicationType === 'referral' ? 'Refer a Friend' : 'Apply for Position';
  }
}