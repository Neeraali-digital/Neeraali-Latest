import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  status: 'published' | 'draft';
  image: string;
}

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  blogs: Blog[] = [
    {
      id: 1,
      title: 'Digital Marketing Trends 2024',
      excerpt: 'Explore the latest trends shaping digital marketing...',
      author: 'Admin',
      publishDate: '2024-01-15',
      status: 'published',
      image: 'assets/blog.jpg'
    },
    {
      id: 2,
      title: 'Social Media Strategy Guide',
      excerpt: 'Complete guide to building effective social media...',
      author: 'Admin',
      publishDate: '2024-01-10',
      status: 'draft',
      image: 'assets/blog.jpg'
    }
  ];

  showModal = false;
  editingBlog: Blog | null = null;
  searchTerm = '';

  ngOnInit() {}

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
      publishDate: new Date().toISOString().split('T')[0],
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
    if (this.editingBlog) {
      if (this.editingBlog.id === 0) {
        this.editingBlog.id = Math.max(...this.blogs.map(b => b.id)) + 1;
        this.blogs.push(this.editingBlog);
      } else {
        const index = this.blogs.findIndex(b => b.id === this.editingBlog!.id);
        if (index !== -1) {
          this.blogs[index] = this.editingBlog;
        }
      }
    }
    this.closeModal();
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogs = this.blogs.filter(b => b.id !== id);
    }
  }

  toggleStatus(blog: Blog) {
    blog.status = blog.status === 'published' ? 'draft' : 'published';
  }
}