import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  blogs: Blog[] = [];
  showModal = false;
  editingBlog: Blog | null = null;
  searchTerm = '';
  loading = true;
  error: string | null = null;
  selectedFile: File | null = null;
  isDragOver = false;

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
      content: '',
      related_to: '',
      author: 'Admin',
      publish_date: new Date().toISOString().split('T')[0],
      read_time: 5,
      status: 'draft',
      image: ''
    };
    this.selectedFile = null;
    this.isDragOver = false;
    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.editingBlog = null;
  }

  saveBlog() {
    if (!this.editingBlog) return;

    this.loading = true;
    this.error = null;

    const blogData = { ...this.editingBlog };

    if (this.editingBlog.id === 0) {
      // Add new blog
      const { id, ...newBlogData } = blogData;
      this.adminDataService.addBlog(newBlogData, this.selectedFile).subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to add blog';
          console.error('Add blog error:', error);
        }
      });
    } else {
      // Update existing blog
      this.adminDataService.updateBlog(this.editingBlog.id, blogData, this.selectedFile).subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
        },
        error: (error) => {
          this.loading = false;
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
    // Include required fields for the update
    const updateData = {
      status: newStatus as 'published' | 'draft',
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      related_to: blog.related_to,
      author: blog.author,
      publish_date: blog.publish_date,
      read_time: blog.read_time
    };
    this.adminDataService.updateBlog(blog.id, updateData).subscribe({
      next: () => {
        blog.status = newStatus;
      },
      error: (error) => {
        this.error = 'Failed to update blog status';
        console.error('Toggle status error:', error);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.validateAndSetFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.validateAndSetFile(files[0]);
    }
  }

  validateAndSetFile(file: File) {
    // Check file type
    if (!file.type.startsWith('image/')) {
      this.error = 'Please select a valid image file';
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      this.error = 'File size must be less than 5MB';
      return;
    }

    this.selectedFile = file;
    this.error = null;
  }

  removeFile() {
    this.selectedFile = null;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
