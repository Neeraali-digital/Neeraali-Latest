import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Review {
  id: number;
  name: string;
  company: string;
  rating: number;
  review: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

@Component({
  selector: 'app-review-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent implements OnInit {
  reviews: Review[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Tech Innovations',
      rating: 5,
      review: 'Exceptional service! The team delivered beyond our expectations with creative solutions and professional approach.',
      date: '2024-01-15',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Digital Solutions',
      rating: 4,
      review: 'Great work on our digital marketing campaign. Saw significant improvement in our online presence.',
      date: '2024-01-12',
      status: 'pending'
    }
  ];

  showModal = false;
  editingReview: Review | null = null;
  searchTerm = '';
  statusFilter = '';

  ngOnInit() {}

  get filteredReviews() {
    return this.reviews.filter(review => {
      const matchesSearch = review.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           review.company.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || review.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openModal(review?: Review) {
    this.editingReview = review ? { ...review } : {
      id: 0,
      name: '',
      company: '',
      rating: 5,
      review: '',
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingReview = null;
  }

  saveReview() {
    if (this.editingReview) {
      if (this.editingReview.id === 0) {
        this.editingReview.id = Math.max(...this.reviews.map(r => r.id)) + 1;
        this.reviews.push(this.editingReview);
      } else {
        const index = this.reviews.findIndex(r => r.id === this.editingReview!.id);
        if (index !== -1) {
          this.reviews[index] = this.editingReview;
        }
      }
    }
    this.closeModal();
  }

  deleteReview(id: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviews = this.reviews.filter(r => r.id !== id);
    }
  }

  updateStatus(review: Review, status: 'approved' | 'pending' | 'rejected') {
    review.status = status;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}