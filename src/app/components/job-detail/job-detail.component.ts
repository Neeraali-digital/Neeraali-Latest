import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicDataService, PublicJob } from '../../services/public-data.service';
import { JobApplicationModalComponent } from '../job-application-modal/job-application-modal.component';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, JobApplicationModalComponent],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: PublicJob | null = null;
  loading = true;
  error: string | null = null;
  showApplicationModal = false;
  applicationType: 'interested' | 'referral' = 'interested';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicDataService: PublicDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idOrSlug = params['id'];
      if (idOrSlug) {
        // Check if it's a number (ID) or string (Slug)
        if (!isNaN(+idOrSlug)) {
          this.loadJobDetail(+idOrSlug);
        } else {
          this.loadJobBySlug(idOrSlug);
        }
      } else {
        this.router.navigate(['/career']);
      }
    });
  }

  loadJobBySlug(slug: string) {
    this.loading = true;
    this.error = null;

    this.publicDataService.getJobs().subscribe({
      next: (jobs) => {
        const job = jobs.find(j => this.toSlug(j.title) === slug);
        if (job) {
          // Found the job, now load full details using its ID
          this.loadJobDetail(job.id);
        } else {
          this.error = 'Job not found';
          this.loading = false;
          // Optional: navigate back after delay?
        }
      },
      error: (error) => {
        this.error = 'Failed to load jobs';
        console.error('Jobs loading error:', error);
        this.loading = false;
      }
    });
  }

  private toSlug(text: string): string {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  loadJobDetail(jobId: number) {
    this.loading = true;
    this.error = null;

    this.publicDataService.getJobDetail(jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load job details';
        console.error('Job detail loading error:', error);
        this.loading = false;
        this.router.navigate(['/career']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/career']);
  }

  onInterested() {
    this.applicationType = 'interested';
    this.showApplicationModal = true;
  }

  referFriend() {
    this.applicationType = 'referral';
    this.showApplicationModal = true;
  }

  closeApplicationModal() {
    this.showApplicationModal = false;
  }

  onApplicationSubmitted() {
    this.successMessage = this.applicationType === 'referral'
      ? 'Thank you for referring your friend! We will review the application and get in touch soon.'
      : 'Thank you for your application! We will review it and get back to you soon.';

    // Clear success message after 5 seconds
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }



  shareOnSocial(platform: string) {
    const url = window.location.href;
    const text = `Check out this job opportunity: ${this.job?.title}`;

    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  }
}
