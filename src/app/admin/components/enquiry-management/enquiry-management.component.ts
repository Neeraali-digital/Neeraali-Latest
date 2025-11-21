import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, Enquiry } from '../../services/admin-data.service';

@Component({
  selector: 'app-enquiry-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry-management.component.html',
  styleUrls: ['./enquiry-management.component.css']
})
export class EnquiryManagementComponent implements OnInit {
  private adminDataService = inject(AdminDataService);

  enquiries: Enquiry[] = [];
  searchTerm = '';
  statusFilter = '';
  typeFilter = '';
  showModal = false;
  selectedEnquiry: Enquiry | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadEnquiries();
  }

  loadEnquiries() {
    this.loading = true;
    this.error = null;

    this.adminDataService.getEnquiries().subscribe({
      next: (enquiries) => {
        this.enquiries = enquiries;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load enquiries';
        console.error('Enquiries loading error:', error);
        this.loading = false;
      }
    });
  }

  get filteredEnquiries() {
    return this.enquiries.filter(enquiry => {
      const matchesSearch = enquiry.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           enquiry.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           enquiry.service.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === '' || enquiry.status === this.statusFilter;
      const matchesType = this.typeFilter === '' || enquiry.enquiry_type === this.typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }

  updateEnquiryStatus(enquiry: Enquiry, newStatus: Enquiry['status']) {
    this.adminDataService.updateEnquiry(enquiry.id, { status: newStatus }).subscribe({
      next: () => {
        enquiry.status = newStatus;
      },
      error: (error) => {
        this.error = 'Failed to update enquiry status';
        console.error('Update enquiry status error:', error);
      }
    });
  }

  deleteEnquiry(id: number) {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      this.adminDataService.deleteEnquiry(id).subscribe({
        next: () => {
          // Enquiry will be automatically removed from the list via the service
        },
        error: (error) => {
          this.error = 'Failed to delete enquiry';
          console.error('Delete enquiry error:', error);
        }
      });
    }
  }

  viewEnquiry(enquiry: Enquiry) {
    this.selectedEnquiry = enquiry;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEnquiry = null;
  }

  getStatusClass(status: Enquiry['status']): string {
    switch (status) {
      case 'new': return 'status-new';
      case 'contacted': return 'status-contacted';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }

  getStatusColor(status: Enquiry['status']): string {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  updateStatus(enquiry: Enquiry, status: Enquiry['status']) {
    this.updateEnquiryStatus(enquiry, status);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getEnquiryTypeLabel(enquiryType: string): string {
    switch (enquiryType) {
      case 'general': return 'General Enquiry';
      case 'web_analysis': return 'Web Analysis';
      default: return enquiryType;
    }
  }

  getEnquiryTypeColor(enquiryType: string): string {
    switch (enquiryType) {
      case 'general': return 'bg-blue-100 text-blue-800';
      case 'web_analysis': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  showWebAnalysisEnquiries() {
    this.typeFilter = 'web_analysis';
    this.statusFilter = '';
    this.searchTerm = '';
  }
}
