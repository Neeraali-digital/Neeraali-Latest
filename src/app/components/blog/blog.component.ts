import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PublicDataService, PublicBlog } from '../../services/public-data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: PublicBlog[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private publicDataService: PublicDataService
  ) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.error = null;
    this.publicDataService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blogs. Please try again later.';
        this.loading = false;
        console.error('Error loading blogs:', error);
      }
    });
  }

  getImageUrl(imageUrl: string | null | undefined): string {
    if (imageUrl) {
      // If it's already a full URL, return as is
      if (imageUrl.startsWith('http')) {
        return imageUrl;
      }
      // Otherwise, prepend the backend URL
      return `${environment.apiUrl}${imageUrl}`;
    }
    return '';
  }

  readBlog(blogId: number) {
    this.router.navigate(['/blog', blogId]);
  }
}
