import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, Service } from '../../services/admin-data.service';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {
  private adminDataService = inject(AdminDataService);
  private cdr = inject(ChangeDetectorRef);

  services: Service[] = [];
  showModal = false;
  editingService: Service | null = null;
  searchTerm = '';
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.loading = true;
    this.error = null;

    this.adminDataService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load services';
        console.error('Services loading error:', error);
        this.loading = false;
      }
    });
  }

  get filteredServices() {
    return this.services.filter(service =>
      service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(service?: Service) {
    this.editingService = service ? { ...service } : {
      id: 0,
      name: '',
      description: '',
      features: [],
      price: '',
      status: 'inactive'
    };
    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.editingService = null;
  }

  saveService() {
    if (!this.editingService) return;

    const serviceData = { ...this.editingService };

    if (this.editingService.id === 0) {
      // Add new service
      const { id, ...newServiceData } = serviceData;
      this.adminDataService.addService(newServiceData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to add service';
          console.error('Add service error:', error);
        }
      });
    } else {
      // Update existing service
      this.adminDataService.updateService(this.editingService.id, serviceData).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          this.error = 'Failed to update service';
          console.error('Update service error:', error);
        }
      });
    }
  }

  deleteService(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.adminDataService.deleteService(id).subscribe({
        next: () => {
          // Service will be automatically removed from the list via the service
        },
        error: (error) => {
          this.error = 'Failed to delete service';
          console.error('Delete service error:', error);
        }
      });
    }
  }

  toggleStatus(service: Service) {
    const newStatus = service.status === 'active' ? 'inactive' : 'active';
    this.adminDataService.updateService(service.id, { status: newStatus }).subscribe({
      next: () => {
        service.status = newStatus;
      },
      error: (error) => {
        this.error = 'Failed to update service status';
        console.error('Toggle status error:', error);
      }
    });
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
