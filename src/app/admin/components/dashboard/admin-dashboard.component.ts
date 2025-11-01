import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalBlogs: 12,
    totalServices: 8,
    totalEnquiries: 45,
    totalReviews: 28,
    totalCareers: 5
  };

  recentActivities = [
    { type: 'enquiry', message: 'New enquiry from John Doe', time: '2 hours ago' },
    { type: 'blog', message: 'Blog "Digital Marketing Trends" published', time: '5 hours ago' },
    { type: 'review', message: 'New 5-star review received', time: '1 day ago' },
    { type: 'career', message: 'New job application for Frontend Developer', time: '2 days ago' }
  ];

  ngOnInit() {}
}