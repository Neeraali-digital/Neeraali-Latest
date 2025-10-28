import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  shiftWork: string;
  careerArea: string;
  contractualLocation: string;
  termOfEmployment: string;
}

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
  jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      location: 'Morecambe, United Kingdom',
      type: 'Full-time',
      shiftWork: 'No',
      careerArea: 'Placements',
      contractualLocation: 'Heysham 2',
      termOfEmployment: 'Fixed Term'
    },
    {
      id: '2',
      title: 'Project Manager',
      location: 'Morecambe, United Kingdom',
      type: 'Full-time',
      shiftWork: 'No',
      careerArea: 'Placements',
      contractualLocation: 'Heysham 2',
      termOfEmployment: 'Fixed Term'
    },
    {
      id: '3',
      title: 'UX Designer',
      location: 'Morecambe, United Kingdom',
      type: 'Full-time',
      shiftWork: 'No',
      careerArea: 'Placements',
      contractualLocation: 'Heysham 2',
      termOfEmployment: 'Fixed Term'
    }
  ];

  filteredJobs: Job[] = [...this.jobs];
  searchTerm: string = '';

  constructor(private router: Router) {}

  viewJobDetail(jobId: string) {
    this.router.navigate(['/career', jobId]);
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
        job.careerArea.toLowerCase().includes(term)
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterJobs();
  }
}
