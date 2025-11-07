import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { BlogManagementComponent } from './components/blog-management/blog-management.component';
import { ServiceManagementComponent } from './components/service-management/service-management.component';
import { EnquiryManagementComponent } from './components/enquiry-management/enquiry-management.component';
import { ReviewManagementComponent } from './components/review-management/review-management.component';
import { CareerManagementComponent } from './components/career-management/career-management.component';
import { AuthGuard } from './guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'blogs', component: BlogManagementComponent },
      { path: 'services', component: ServiceManagementComponent },
      { path: 'enquiries', component: EnquiryManagementComponent },
      { path: 'reviews', component: ReviewManagementComponent },
      { path: 'careers', component: CareerManagementComponent }
    ]
  }
];