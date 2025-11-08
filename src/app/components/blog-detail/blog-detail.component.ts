import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicDataService, PublicBlog } from '../../services/public-data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogId: number | null = null;
  blog: PublicBlog | null = null;
  loading = true;
  error: string | null = null;
  heroBackgroundImage: string = '../../../assets/blog.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicDataService: PublicDataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogId = id ? +id : null;

    if (this.blogId) {
      this.loadBlogDetail(this.blogId);
    } else {
      this.router.navigate(['/blog']);
    }
  }

  loadBlogDetail(id: number) {
    this.loading = true;
    this.error = null;
    this.publicDataService.getBlogDetail(id).subscribe({
      next: (blog) => {
        this.blog = blog;
        // Set dynamic background image if blog has an image
        this.heroBackgroundImage = blog.image_url ? `${environment.apiUrl}${blog.image_url}` : '../../../assets/blog.jpg';
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blog details. Please try again later.';
        this.loading = false;
        console.error('Error loading blog detail:', error);
        this.router.navigate(['/blog']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}
