import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
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

  constructor(private router: Router) {}

  viewJobDetail(jobId: string) {
    this.router.navigate(['/career', jobId]);
  }
}
