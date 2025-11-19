import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminDataService, Service } from '../../services/admin-data.service';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
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

  // Validation errors
  nameError: string | null = null;
  descriptionError: string | null = null;
  priceError: string | null = null;
  statusError: string | null = null;

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
      status: 'inactive',
      order: 0,
      hero_section: {
        title: '',
        subtitle: '',
        description: '',
        button_text: ''
      },
      services_section: [],
      faq_section: []
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

    // Reset errors
    this.nameError = null;
    this.descriptionError = null;
    this.priceError = null;
    this.statusError = null;

    // Validate required fields
    let hasErrors = false;

    if (!this.editingService.name || this.editingService.name.trim() === '') {
      this.nameError = 'Service name is required';
      hasErrors = true;
    }

    if (!this.editingService.description || this.editingService.description.trim() === '') {
      this.descriptionError = 'Description is required';
      hasErrors = true;
    }

    if (!this.editingService.price || this.editingService.price.trim() === '') {
      this.priceError = 'Price is required';
      hasErrors = true;
    }

    if (!this.editingService.status) {
      this.statusError = 'Status is required';
      hasErrors = true;
    }

    if (hasErrors) {
      return; // Stop submission if there are validation errors
    }

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

  addServiceItem() {
    if (this.editingService) {
      this.editingService.services_section.push({
        icon: '',
        title: '',
        description: ''
      });
    }
  }

  removeServiceItem(index: number) {
    if (this.editingService) {
      this.editingService.services_section.splice(index, 1);
    }
  }

  addFaqItem() {
    if (this.editingService) {
      this.editingService.faq_section.push({
        question: '',
        answer: ''
      });
    }
  }

  removeFaqItem(index: number) {
    if (this.editingService) {
      this.editingService.faq_section.splice(index, 1);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByServiceId(index: number, service: Service): number {
    return service.id;
  }

  onDrop(event: CdkDragDrop<Service[]>) {
    if (event.previousIndex !== event.currentIndex && this.searchTerm.length === 0) {
      console.log(`Dragging from index ${event.previousIndex} to ${event.currentIndex}`);
      
      // Get the services being moved
      const movedService = this.services[event.previousIndex];
      const targetService = this.services[event.currentIndex];
      
      console.log(`Moving service "${movedService.name}" (order: ${movedService.order}) to position of "${targetService.name}" (order: ${targetService.order})`);
      
      // Store original orders for potential rollback
      const originalMovedOrder = movedService.order;
      const originalTargetOrder = targetService.order;
      
      // Update the main services array immediately for UI feedback
      moveItemInArray(this.services, event.previousIndex, event.currentIndex);
      
      // Swap the order values
      const serviceOrders = [
        { id: movedService.id, order: originalTargetOrder },
        { id: targetService.id, order: originalMovedOrder }
      ];
      
      console.log('Sending order updates:', serviceOrders);
      
      // Update backend
      this.adminDataService.updateServiceOrder(serviceOrders).subscribe({
        next: () => {
          console.log('Service order updated successfully');
          // Update the order values in the local array
          const movedIndex = this.services.findIndex(s => s.id === movedService.id);
          const targetIndex = this.services.findIndex(s => s.id === targetService.id);
          if (movedIndex !== -1) this.services[movedIndex].order = originalTargetOrder;
          if (targetIndex !== -1) this.services[targetIndex].order = originalMovedOrder;
        },
        error: (error) => {
          this.error = 'Failed to update service order';
          console.error('Update order error:', error);
          // Revert on error
          this.loadServices();
        }
      });
    }
  }
}
