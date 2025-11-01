import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Service {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {
  services: Service[] = [
    {
      id: 1,
      name: 'Brand Identity',
      description: 'Build recognition and trust with powerful brand systems.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
      price: 'Starting from ₹25,000',
      status: 'active'
    },
    {
      id: 2,
      name: 'Digital Marketing',
      description: 'SEO, PPC, Email & Content strategies that get you discovered.',
      features: ['SEO Optimization', 'PPC Campaigns', 'Content Marketing', 'Email Marketing'],
      price: 'Starting from ₹15,000/month',
      status: 'active'
    }
  ];

  showModal = false;
  editingService: Service | null = null;
  searchTerm = '';

  ngOnInit() {}

  get filteredServices() {
    return this.services.filter(service => 
      service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(service?: Service) {
    this.editingService = service ? { ...service, features: [...service.features] } : {
      id: 0,
      name: '',
      description: '',
      features: [],
      price: '',
      status: 'active'
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingService = null;
  }

  saveService() {
    if (this.editingService) {
      if (this.editingService.id === 0) {
        this.editingService.id = Math.max(...this.services.map(s => s.id)) + 1;
        this.services.push(this.editingService);
      } else {
        const index = this.services.findIndex(s => s.id === this.editingService!.id);
        if (index !== -1) {
          this.services[index] = this.editingService;
        }
      }
    }
    this.closeModal();
  }

  deleteService(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.services = this.services.filter(s => s.id !== id);
    }
  }

  toggleStatus(service: Service) {
    service.status = service.status === 'active' ? 'inactive' : 'active';
  }

  addFeature() {
    if (this.editingService) {
      this.editingService.features.push('');
    }
  }

  removeFeature(index: number) {
    if (this.editingService) {
      this.editingService.features.splice(index, 1);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}