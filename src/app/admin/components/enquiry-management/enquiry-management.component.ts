import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
}

@Component({
  selector: 'app-enquiry-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry-management.component.html',
  styleUrls: ['./enquiry-management.component.css']
})
export class EnquiryManagementComponent implements OnInit {
  enquiries: Enquiry[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      company: 'Tech Corp',
      service: 'Digital Marketing',
      message: 'Looking for comprehensive digital marketing services for our startup.',
      date: '2024-01-15',
      status: 'new'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '+91 8765432109',
      company: 'Design Studio',
      service: 'Web Solutions',
      message: 'Need a modern website with e-commerce functionality.',
      date: '2024-01-14',
      status: 'contacted'
    }
  ];

  searchTerm = '';
  statusFilter = '';
  showModal = false;
  selectedEnquiry: Enquiry | null = null;

  ngOnInit() {}

  get filteredEnquiries() {
    return this.enquiries.filter(enquiry => {
      const matchesSearch = enquiry.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           enquiry.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           enquiry.service.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || enquiry.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  viewEnquiry(enquiry: Enquiry) {
    this.selectedEnquiry = enquiry;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEnquiry = null;
  }

  updateStatus(enquiry: Enquiry, status: 'new' | 'contacted' | 'closed') {
    enquiry.status = status;
  }

  deleteEnquiry(id: number) {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      this.enquiries = this.enquiries.filter(e => e.id !== id);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}