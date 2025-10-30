import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  constructor(private router: Router) {}
  blogs = [
    {
      id: '1',
      title: 'The Future of Digital Marketing in 2024',
      excerpt: 'Discover the latest trends and strategies that will shape digital marketing this year.',
      image: '../../../assets/blog1.jpg',
      date: 'March 15, 2024',
      category: 'Digital Marketing',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Building Brand Identity That Resonates',
      excerpt: 'Learn how to create a brand identity that connects with your target audience.',
      image: '../../../assets/blog2.jpg',
      date: 'March 10, 2024',
      category: 'Branding',
      readTime: '7 min read'
    },
    {
      id: '3',
      title: 'Web Design Trends for Modern Businesses',
      excerpt: 'Explore the latest web design trends that drive conversions and user engagement.',
      image: '../../../assets/blog3.jpg',
      date: 'March 5, 2024',
      category: 'Web Design',
      readTime: '6 min read'
    }
  ];

  readBlog(blogId: string) {
    this.router.navigate(['/blog', blogId]);
  }
}