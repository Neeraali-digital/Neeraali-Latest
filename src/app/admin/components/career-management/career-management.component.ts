import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  description: string;
  requirements: string[];
  status: 'active' | 'inactive';
  applications: number;
}

@Component({
  selector: 'app-career-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './career-management.component.html',
  styleUrls: ['./career-management.component.css']
})
export class CareerManagementComponent implements OnInit {
  jobs: Job[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Technology',
      location: 'Bangalore',
      type: 'full-time',
      experience: '2-4 years',
      description: 'We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences.',
      requirements: ['React/Angular expertise', 'HTML/CSS/JavaScript', 'Responsive design', 'Git version control'],
      status: 'active',
      applications: 12
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Bangalore',
      type: 'full-time',
      experience: '1-3 years',
      description: 'Join our marketing team to create and execute digital marketing campaigns that drive results.',
      requirements: ['SEO/SEM knowledge', 'Social media marketing', 'Google Analytics', 'Content creation'],
      status: 'active',
      applications: 8
    }
  ];

  showModal = false;
  editingJob: Job | null = null;
  searchTerm = '';
  statusFilter = '';

  ngOnInit() {}

  get filteredJobs() {
    return this.jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || job.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openModal(job?: Job) {
    this.editingJob = job ? { ...job, requirements: [...job.requirements] } : {
      id: 0,
      title: '',
      department: '',
      location: 'Bangalore',
      type: 'full-time',
      experience: '',
      description: '',
      requirements: [],
      status: 'active',
      applications: 0
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingJob = null;
  }

  saveJob() {
    if (this.editingJob) {
      if (this.editingJob.id === 0) {
        this.editingJob.id = Math.max(...this.jobs.map(j => j.id)) + 1;
        this.jobs.push(this.editingJob);
      } else {
        const index = this.jobs.findIndex(j => j.id === this.editingJob!.id);
        if (index !== -1) {
          this.jobs[index] = this.editingJob;
        }
      }
    }
    this.closeModal();
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job posting?')) {
      this.jobs = this.jobs.filter(j => j.id !== id);
    }
  }

  toggleStatus(job: Job) {
    job.status = job.status === 'active' ? 'inactive' : 'active';
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

  trackByIndex(index: number): number {
    return index;
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'internship': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}