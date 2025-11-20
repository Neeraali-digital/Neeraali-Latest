import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, JobApplication } from '../../services/admin-data.service';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit, OnChanges {
  @Input() jobId: number | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  applications: JobApplication[] = [];
  selectedApplication: JobApplication | null = null;
  loading = true;
  error: string | null = null;
  showDetailModal = false;

  constructor(private adminDataService: AdminDataService) {}

  ngOnInit() {
    if (this.isOpen) {
      this.loadApplications();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.isOpen) {
      this.loadApplications();
    }
  }

  loadApplications() {
    this.loading = true;
    this.error = null;

    this.adminDataService.getJobApplications(this.jobId || undefined).subscribe({
      next: (applications) => {
        this.applications = applications;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load applications';
        console.error('Applications loading error:', error);
        console.error('Error details:', error.error);
        this.loading = false;
      }
    });
  }

  viewApplication(application: JobApplication) {
    // If we have limited data, fetch full details
    if (!application.email || !application.phone) {
      this.adminDataService.getJobApplication(application.id).subscribe({
        next: (fullApplication) => {
          this.selectedApplication = fullApplication;
          this.showDetailModal = true;
          this.closeModal.emit();
        },
        error: (error) => {
          console.error('Failed to load full application details:', error);
          // Fallback to showing what we have
          this.selectedApplication = application;
          this.showDetailModal = true;
          this.closeModal.emit();
        }
      });
    } else {
      this.selectedApplication = application;
      this.showDetailModal = true;
      this.closeModal.emit();
    }
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedApplication = null;
  }

  updateApplicationStatus(applicationId: number, status: string) {
    this.adminDataService.updateJobApplicationStatus(applicationId, status).subscribe({
      next: (updatedApplication) => {
        // Update the application in the list
        const index = this.applications.findIndex(app => app.id === applicationId);
        if (index !== -1) {
          this.applications[index] = updatedApplication;
        }
        
        // Update selected application if it's the same one
        if (this.selectedApplication && this.selectedApplication.id === applicationId) {
          this.selectedApplication = updatedApplication;
        }
      },
      error: (error) => {
        console.error('Failed to update application status:', error);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getApplicationTypeColor(type: string): string {
    return type === 'referral' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  }

  onClose() {
    this.closeModal.emit();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onStatusChange(applicationId: number, event: Event) {
    const target = event.target as HTMLSelectElement;
    this.updateApplicationStatus(applicationId, target.value);
  }

  deleteApplication(applicationId: number) {
    if (confirm('Are you sure you want to delete this application?')) {
      this.adminDataService.deleteJobApplication(applicationId).subscribe({
        next: () => {
          this.applications = this.applications.filter(app => app.id !== applicationId);
          if (this.selectedApplication && this.selectedApplication.id === applicationId) {
            this.closeDetailModal();
          }
        },
        error: (error) => {
          console.error('Failed to delete application:', error);
          alert('Failed to delete application');
        }
      });
    }
  }
}