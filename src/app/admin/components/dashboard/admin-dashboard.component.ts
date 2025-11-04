import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataService, DashboardStats } from '../../services/admin-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private adminDataService = inject(AdminDataService);

  stats: DashboardStats = {
    totalBlogs: 0,
    totalServices: 0,
    totalEnquiries: 0,
    totalReviews: 0,
    totalCareers: 0,
    activeJobs: 0,
    publishedBlogs: 0,
    activeServices: 0,
    newEnquiries: 0,
    pendingReviews: 0
  };

  recentActivities = [
    { type: 'enquiry', message: 'New enquiry from John Doe', time: '2 hours ago' },
    { type: 'blog', message: 'Blog "Digital Marketing Trends" published', time: '5 hours ago' },
    { type: 'review', message: 'New 5-star review received', time: '1 day ago' },
    { type: 'career', message: 'New job application for Frontend Developer', time: '2 days ago' }
  ];

  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.error = null;

    this.adminDataService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load dashboard stats';
        console.error('Dashboard stats error:', error);
        this.loading = false;
      }
    });
  }
}
