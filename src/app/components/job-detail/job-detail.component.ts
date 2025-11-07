import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicDataService, PublicJob } from '../../services/public-data.service';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: PublicJob | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicDataService: PublicDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      if (jobId) {
        this.loadJobDetail(+jobId);
      } else {
        this.router.navigate(['/career']);
      }
    });
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
    // Handle "I am interested" action
    alert('Thank you for your interest! We will contact you soon.');
  }

  referFriend() {
    // Handle "Refer a friend" action
    alert('Thank you for considering referring a friend! We appreciate your support.');
  }

  shareOnSocial(platform: string) {
    // Handle social media sharing
    const url = window.location.href;
    const text = `Check out this job opportunity: ${this.job?.title}`;

    let shareUrl = '';
    switch (platform) {
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
