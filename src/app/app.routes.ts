import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { CareerComponent } from './components/career/career.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'service/:id', component: ServiceDetailComponent },
  { path: 'career', component: CareerComponent },
  { path: 'career/:id', component: JobDetailComponent },
  { path: '**', redirectTo: '' }
];
