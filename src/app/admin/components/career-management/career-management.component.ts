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
  departmentError = '';
  locationError = '';
  typeError = '';
  experienceError = '';
  shiftWorkError = '';
  careerAreaError = '';
  contractualLocationError = '';
  termOfEmploymentError = '';
  descriptionError = '';
  requirementsError = '';
  statusError = '';
  jobDescriptionError = '';
  theOpportunityError = '';
  whatYoullBeDoingError = '';
  yourWorkLocationError = '';
  whoYouAreError = '';
  securityVettingError = '';
  payError = '';
  benefitsAndCultureError = '';
  additionalInformationError = '';

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
                           job.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || job.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openModal(job?: Job) {
    this.editingJob = job ? { ...job } : {
      id: 0,
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      experience: '',
      description: '',
      requirements: [],
      status: 'inactive',
      applications: 0,
      shift_work: 'No',
      career_area: 'General',
      contractual_location: '',
      term_of_employment: 'Permanent',
      job_description: '',
      the_opportunity: '',
      what_youll_be_doing: '',
      your_work_location: '',
      who_you_are: '',
      security_vetting: '',
      pay: '',
      benefits_and_culture: '',
      additional_information: ''
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
    this.departmentError = '';
    this.locationError = '';
    this.typeError = '';
    this.experienceError = '';
    this.shiftWorkError = '';
    this.careerAreaError = '';
    this.contractualLocationError = '';
    this.termOfEmploymentError = '';
    this.descriptionError = '';
    this.requirementsError = '';
    this.statusError = '';
    this.jobDescriptionError = '';
    this.theOpportunityError = '';
    this.whatYoullBeDoingError = '';
    this.yourWorkLocationError = '';
    this.whoYouAreError = '';
    this.securityVettingError = '';
    this.payError = '';
    this.benefitsAndCultureError = '';
    this.additionalInformationError = '';

    // Validate required fields
    let isValid = true;

    if (!this.editingJob.title || this.editingJob.title.trim() === '') {
      this.titleError = 'Job title is required';
      isValid = false;
    }

    if (!this.editingJob.department || this.editingJob.department.trim() === '') {
      this.departmentError = 'Department is required';
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

    if (!this.editingJob.shift_work || this.editingJob.shift_work.trim() === '') {
      this.shiftWorkError = 'Shift work is required';
      isValid = false;
    }

    if (!this.editingJob.career_area || this.editingJob.career_area.trim() === '') {
      this.careerAreaError = 'Career area is required';
      isValid = false;
    }

    if (!this.editingJob.contractual_location || this.editingJob.contractual_location.trim() === '') {
      this.contractualLocationError = 'Contractual location is required';
      isValid = false;
    }

    if (!this.editingJob.term_of_employment || this.editingJob.term_of_employment.trim() === '') {
      this.termOfEmploymentError = 'Term of employment is required';
      isValid = false;
    }

    if (!this.editingJob.description || this.editingJob.description.trim() === '') {
      this.descriptionError = 'Description is required';
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

    if (!this.editingJob.job_description || this.editingJob.job_description.trim() === '') {
      this.jobDescriptionError = 'Job description is required';
      isValid = false;
    }

    if (!this.editingJob.the_opportunity || this.editingJob.the_opportunity.trim() === '') {
      this.theOpportunityError = 'The opportunity is required';
      isValid = false;
    }

    if (!this.editingJob.what_youll_be_doing || this.editingJob.what_youll_be_doing.trim() === '') {
      this.whatYoullBeDoingError = 'What you\'ll be doing is required';
      isValid = false;
    }

    if (!this.editingJob.your_work_location || this.editingJob.your_work_location.trim() === '') {
      this.yourWorkLocationError = 'Your work location is required';
      isValid = false;
    }

    if (!this.editingJob.who_you_are || this.editingJob.who_you_are.trim() === '') {
      this.whoYouAreError = 'Who you are is required';
      isValid = false;
    }

    if (!this.editingJob.security_vetting || this.editingJob.security_vetting.trim() === '') {
      this.securityVettingError = 'Security vetting is required';
      isValid = false;
    }

    if (!this.editingJob.pay || this.editingJob.pay.trim() === '') {
      this.payError = 'Pay is required';
      isValid = false;
    }

    if (!this.editingJob.benefits_and_culture || this.editingJob.benefits_and_culture.trim() === '') {
      this.benefitsAndCultureError = 'Benefits and culture is required';
      isValid = false;
    }

    if (!this.editingJob.additional_information || this.editingJob.additional_information.trim() === '') {
      this.additionalInformationError = 'Additional information is required';
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
