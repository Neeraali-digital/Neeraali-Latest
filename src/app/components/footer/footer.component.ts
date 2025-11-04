import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showPrivacyPolicy = false;
  
  digitalServices = [
    'Search Engine Optimisation',
    'Local SEO',
    'Social Media Marketing',
    'Web Development',
    'Performance Ad (Google Ads)',
    'Influencer Marketing'
  ];

  companyLinks = [
    'Digital Marketing Company In Banglore',
    'SEO Company in Bangalore',
    'B2B Marketing Company in Bangalore',
    'Performance Marketing Company in Bangalore',
    'Social Media Marketing Company in Bangalore',
    'PPC Company in Bangalore',
    'Creative Advertising Agency in Bangalore',
    'Website Development Company in Bangalore',
    'Content Writing Company in Bangalore',
    'Logo Design Company in Bangalore'
  ];

  socialMediaLinks = [
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/neeraali-digital-marketing-services/' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/neeraali_digitalmarketing?igsh=MWk1dTdyempxeWlhZw%3D%3D&utm_source=qr' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/share/1G5zgN3mAY/?mibextid=wwXIfr' }
  ];

  contactInfo = {
    phone: '+91 99458 83333',
    email: 'connect@neeraali.com',
    address: 'Kirloskar Business Park, Hebbal, Bengaluru 560024'
  };
}