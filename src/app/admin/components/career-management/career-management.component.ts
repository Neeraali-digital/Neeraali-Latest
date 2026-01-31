import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, Job } from '../../services/admin-data.service';
import { JobApplicationsComponent } from '../job-applications/job-applications.component';

@Component({
  selector: 'app-career-management',
  standalone: true,
  imports: [CommonModule, FormsModule, JobApplicationsComponent],
  templateUrl: './career-management.component.html',
  styleUrls: ['./career-management.component.css']
})
export class CareerManagementComponent implements OnInit {
  private adminDataService = inject(AdminDataService);
  private cdr = inject(ChangeDetectorRef);

  jobs: Job[] = [];
  showModal = false;
  editingJob: Job | null = null;
  searchTerm = '';
  statusFilter = 'all';
  loading = true;
  error: string | null = null;
  showApplicationsModal = false;
  selectedJobId: number | null = null;

  // Validation errors
  titleError = '';
  companyError = '';
  locationError = '';
  typeError = '';
  experienceError = '';
  descriptionError = '';
  requirementsError = '';
  statusError = '';
  responsibilitiesError = '';
  howToApplyError = '';
  workingDaysError = '';


  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.error = null;

    this.adminDataService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load jobs';
        console.error('Jobs loading error:', error);
        this.loading = false;
      }
    });
  }

  get filteredJobs() {
    return this.jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || job.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openModal(job?: Job) {
    this.editingJob = job ? { ...job } : {
      id: 0,
      title: '',
      company: 'Neeraali Digital',
      location: 'Bengaluru (On-site)',
      type: 'full-time',
      experience: '',
      job_description: '',
      requirements: [],
      status: 'active',
      applications: 0,
      responsibilities: '',
      working_days_timings: '',
      how_to_apply: ''
    };
    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.editingJob = null;
  }

  saveJob() {
    if (!this.editingJob) return;

    // Reset validation errors
    this.titleError = '';
    this.companyError = '';
    this.locationError = '';
    this.typeError = '';
    this.experienceError = '';
    this.descriptionError = '';
    this.requirementsError = '';
    this.statusError = '';
    this.responsibilitiesError = '';
    this.workingDaysError = '';

    // Validate required fields
    let isValid = true;

    if (!this.editingJob.title || this.editingJob.title.trim() === '') {
      this.titleError = 'Job title is required';
      isValid = false;
    }

    if (!this.editingJob.company || this.editingJob.company.trim() === '') {
      this.companyError = 'Company is required';
      isValid = false;
    }

    if (!this.editingJob.location || this.editingJob.location.trim() === '') {
      this.locationError = 'Location is required';
      isValid = false;
    }

    if (!this.editingJob.type || this.editingJob.type.trim() === '') {
      this.typeError = 'Job type is required';
      isValid = false;
    }

    if (!this.editingJob.experience || this.editingJob.experience.trim() === '') {
      this.experienceError = 'Experience is required';
      isValid = false;
    }

    if (!this.editingJob.job_description || this.editingJob.job_description.trim() === '') {
      this.descriptionError = 'Job Description is required';
      isValid = false;
    }

    if (!this.editingJob.requirements || this.editingJob.requirements.length === 0 || this.editingJob.requirements.every(req => req.trim() === '')) {
      this.requirementsError = 'At least one requirement is required';
      isValid = false;
    }

    if (!this.editingJob.status || this.editingJob.status.trim() === '') {
      this.statusError = 'Status is required';
      isValid = false;
    }

    // Optional validations but assuming required per user request "display only..."
    if (!this.editingJob.responsibilities || this.editingJob.responsibilities.trim() === '') {
      this.responsibilitiesError = 'Responsibilities are required';
      isValid = false;
    }

    if (!this.editingJob.working_days_timings || this.editingJob.working_days_timings.trim() === '') {
      this.workingDaysError = 'Working days & timings are required';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const jobData = { ...this.editingJob };

    if (this.editingJob.id === 0) {
      // Add new job
      const { id, ...newJobData } = jobData;
      this.adminDataService.addJob(newJobData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to add job';
          console.error('Add job error:', error);
        }
      });
    } else {
      // Update existing job
      this.adminDataService.updateJob(this.editingJob.id, jobData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to update job';
          console.error('Update job error:', error);
        }
      });
    }
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.adminDataService.deleteJob(id).subscribe({
        next: () => {
          // Job will be automatically removed from the list via the service
        },
        error: (error) => {
          this.error = 'Failed to delete job';
          console.error('Delete job error:', error);
        }
      });
    }
  }

  toggleStatus(job: Job) {
    const newStatus = job.status === 'active' ? 'inactive' : 'active';
    this.adminDataService.updateJob(job.id, { status: newStatus }).subscribe({
      next: () => {
        job.status = newStatus;
      },
      error: (error) => {
        this.error = 'Failed to update job status';
        console.error('Toggle status error:', error);
      }
    });
  }

  addRequirement() {
    if (this.editingJob) {
      this.editingJob.requirements.push('');
    }
  }

  removeRequirement(index: number) {
    if (this.editingJob) {
      this.editingJob.requirements.splice(index, 1);
    }
  }

  getJobTypeOptions(): string[] {
    return ['full-time', 'part-time', 'contract', 'internship'];
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800';
      case 'part-time': return 'bg-green-100 text-green-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'internship': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  viewApplications(job: Job) {
    this.selectedJobId = job.id;
    this.showApplicationsModal = true;
  }

  closeApplicationsModal() {
    this.showApplicationsModal = false;
    this.selectedJobId = null;
  }
}
