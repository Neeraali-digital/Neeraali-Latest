import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, Blog } from '../../services/admin-data.service';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  private adminDataService = inject(AdminDataService);

  blogs: Blog[] = [];
  showModal = false;
  editingBlog: Blog | null = null;
  searchTerm = '';
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.error = null;

    this.adminDataService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blogs';
        console.error('Blogs loading error:', error);
        this.loading = false;
      }
    });
  }

  get filteredBlogs() {
    return this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(blog?: Blog) {
    this.editingBlog = blog ? { ...blog } : {
      id: 0,
      title: '',
      excerpt: '',
      author: 'Admin',
      publish_date: new Date().toISOString().split('T')[0],
      status: 'draft',
      image: ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingBlog = null;
  }

  saveBlog() {
    if (!this.editingBlog) return;

    const blogData = { ...this.editingBlog };

    if (this.editingBlog.id === 0) {
      // Add new blog
      const { id, ...newBlogData } = blogData;
      this.adminDataService.addBlog(newBlogData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to add blog';
          console.error('Add blog error:', error);
        }
      });
    } else {
      // Update existing blog
      this.adminDataService.updateBlog(this.editingBlog.id, blogData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to update blog';
          console.error('Update blog error:', error);
        }
      });
    }
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.adminDataService.deleteBlog(id).subscribe({
        next: () => {
          // Blog will be automatically removed from the list via the service
        },
        error: (error) => {
          this.error = 'Failed to delete blog';
          console.error('Delete blog error:', error);
        }
      });
    }
  }

  toggleStatus(blog: Blog) {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    this.adminDataService.updateBlog(blog.id, { status: newStatus }).subscribe({
      next: () => {
        blog.status = newStatus;
      },
      error: (error) => {
        this.error = 'Failed to update blog status';
        console.error('Toggle status error:', error);
      }
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
