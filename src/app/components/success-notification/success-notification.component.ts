import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md animate-slide-in">
      <div class="flex items-center">
        <span class="material-icons mr-2">check_circle</span>
        <span style="font-family: 'Poppins', sans-serif;">{{ message }}</span>
        <button (click)="close()" class="ml-4 text-white hover:text-gray-200">
          <span class="material-icons text-sm">close</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class SuccessNotificationComponent {
  @Input() show = false;
  @Input() message = '';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}