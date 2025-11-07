import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, Review } from '../../services/admin-data.service';

@Component({
  selector: 'app-review-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent implements OnInit {
  private adminDataService = inject(AdminDataService);
  private cdr = inject(ChangeDetectorRef);

  reviews: Review[] = [];
  showModal = false;
  editingReview: Review | null = null;
  searchTerm = '';
  statusFilter = 'all';
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.error = null;

    this.adminDataService.getReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load reviews';
        console.error('Reviews loading error:', error);
        this.loading = false;
      }
    });
  }

  get filteredReviews() {
    return this.reviews.filter(review => {
      const matchesSearch = review.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           review.company.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || review.status === this.statusFilter;
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
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.editingReview = null;
  }

  saveReview() {
    if (!this.editingReview) return;

    const reviewData = { ...this.editingReview };

    if (this.editingReview.id === 0) {
      // Add new review
      const { id, ...newReviewData } = reviewData;
      this.adminDataService.addReview(newReviewData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to add review';
          console.error('Add review error:', error);
        }
      });
    } else {
      // Update existing review
      this.adminDataService.updateReview(this.editingReview.id, reviewData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to update review';
          console.error('Update review error:', error);
        }
      });
    }
  }

  deleteReview(id: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.adminDataService.deleteReview(id).subscribe({
        next: () => {
          // Review will be automatically removed from the list via the service
        },
        error: (error) => {
          this.error = 'Failed to delete review';
          console.error('Delete review error:', error);
        }
      });
    }
  }

  updateReviewStatus(review: Review, newStatus: Review['status']) {
    this.adminDataService.updateReview(review.id, { status: newStatus }).subscribe({
      next: () => {
        review.status = newStatus;
      },
      error: (error) => {
        this.error = 'Failed to update review status';
        console.error('Update review status error:', error);
      }
    });
  }

  getStatusClass(status: Review['status']): string {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  }

  getStatusColor(status: Review['status']): string {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  updateStatus(review: Review, status: Review['status']) {
    this.updateReviewStatus(review, status);
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}
