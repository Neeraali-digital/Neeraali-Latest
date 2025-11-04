import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  sidebarOpen = true;
  showUserMenu = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  get currentUser() {
    return this.authService['currentUserSubject'].value;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.showUserMenu = false; // Close menu
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/admin/login']);
      },
      error: () => {
        // Even if logout fails, clear local session and redirect
        this.router.navigate(['/admin/login']);
      }
    });
  }

  // Close user menu when clicking outside
  closeUserMenu() {
    this.showUserMenu = false;
  }
}
