import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'service/:id', component: ServiceDetailComponent },
  { path: '**', redirectTo: '' }
];
