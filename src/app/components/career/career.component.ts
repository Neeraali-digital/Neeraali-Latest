import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicDataService, PublicJob } from '../../services/public-data.service';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  jobs: PublicJob[] = [];
  filteredJobs: PublicJob[] = [];
  searchTerm: string = '';
  loading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private publicDataService: PublicDataService
  ) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.error = null;

    this.publicDataService.getJobs().subscribe({
      next: (jobs) => {
        // Filter only active jobs for public view
        this.jobs = jobs.filter(job => job.status === 'active');
        this.filteredJobs = [...this.jobs];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load jobs';
        console.error('Jobs loading error:', error);
        this.loading = false;
      }
    });
  }

  viewJobDetail(job: PublicJob) {
    if (job && job.title) {
      const slug = this.toSlug(job.title);
      // Pass both slug and id to ensure we can find it? 
      // User asked "instead of showing the job id... display the job title".
      this.router.navigate(['/career', slug]);
    }
  }

  private toSlug(text: string): string {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  filterJobs() {
    if (!this.searchTerm.trim()) {
      this.filteredJobs = [...this.jobs];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredJobs = this.jobs.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.type.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterJobs();
  }
}
