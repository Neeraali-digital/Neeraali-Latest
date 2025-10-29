import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  process: string[];
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service: ServiceDetail | null = null;

  faqs: FAQItem[] = [
    {
      question: 'How do you measure success?',
      answer: 'We track what really matters—leads, traffic, conversions, and ROI. Every campaign includes detailed reports and analytics so you can see your growth.',
      isOpen: false
    },
    {
      question: 'Which platforms do you focus on?',
      answer: 'We manage campaigns across Google Ads, Meta (Facebook & Instagram), LinkedIn, YouTube, and other emerging platforms—wherever your audience spends time.',
      isOpen: false
    },
    {
      question: 'Can I get a custom marketing plan?',
      answer: 'Of course! Every brand is different. We create customized digital marketing strategies that align perfectly with your goals and budget.',
      isOpen: false
    },
    {
      question: 'Do you handle branding and content too?',
      answer: 'Yes! Our creative team handles everything from design to storytelling, ensuring your brand looks great and communicates effectively.',
      isOpen: false
    },
    {
      question: 'When will I start seeing results?',
      answer: 'Paid campaigns can show impact within weeks, while organic growth through SEO usually takes a few months. We balance both for quick wins and lasting growth.',
      isOpen: false
    },
    {
      question: 'Do you offer ongoing support?',
      answer: 'Yes, we manage long-term marketing campaigns with continuous optimization and support—so your brand keeps growing month after month.',
      isOpen: false
    }
  ];

  private services: ServiceDetail[] = [
    {
      id: 'brand-identity',
      title: 'BRAND IDENTITY',
      description: 'Build recognition and trust with powerful brand systems that resonate with your audience.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
      benefits: ['Increased Recognition', 'Customer Trust', 'Market Differentiation', 'Professional Image'],
      process: ['Research & Discovery', 'Concept Development', 'Design Creation', 'Brand Implementation']
    },
    {
      id: 'digital-marketing',
      title: 'DIGITAL MARKETING',
      description: 'SEO, PPC, Email & Content strategies that get you discovered and drive conversions.',
      features: ['SEO Optimization', 'PPC Campaigns', 'Email Marketing', 'Content Strategy'],
      benefits: ['Increased Visibility', 'Higher Conversions', 'Better ROI', 'Targeted Reach'],
      process: ['Market Analysis', 'Strategy Planning', 'Campaign Execution', 'Performance Optimization']
    },
    {
      id: 'web-solutions',
      title: 'WEB SOLUTIONS',
      description: 'High-performing, conversion-ready websites that work as your best sales tool.',
      features: ['Responsive Design', 'E-commerce Solutions', 'CMS Development', 'Performance Optimization'],
      benefits: ['Better User Experience', 'Higher Conversions', 'Mobile Compatibility', 'Fast Loading'],
      process: ['Requirements Analysis', 'Design & Development', 'Testing & QA', 'Launch & Support']
    },
    {
      id: 'social-media',
      title: 'SOCIAL MEDIA',
      description: 'Creative storytelling that builds loyal communities and drives engagement.',
      features: ['Content Creation', 'Community Management', 'Social Strategy', 'Influencer Partnerships'],
      benefits: ['Brand Awareness', 'Customer Engagement', 'Community Building', 'Lead Generation'],
      process: ['Platform Analysis', 'Content Planning', 'Community Building', 'Performance Tracking']
    },
    {
      id: 'creative-design',
      title: 'CREATIVE DESIGN',
      description: 'From social creatives to campaigns that make people stop scrolling.',
      features: ['Graphic Design', 'Social Media Creatives', 'Print Design', 'Digital Assets'],
      benefits: ['Visual Impact', 'Brand Consistency', 'Audience Engagement', 'Professional Appeal'],
      process: ['Creative Brief', 'Concept Development', 'Design Execution', 'Final Delivery']
    },
    {
      id: 'performance-marketing',
      title: 'PERFORMANCE MARKETING',
      description: 'ROI-driven campaigns that convert and scale your business growth.',
      features: ['Paid Advertising', 'Conversion Optimization', 'Analytics & Reporting', 'A/B Testing'],
      benefits: ['Measurable Results', 'Cost Efficiency', 'Scalable Growth', 'Data-Driven Decisions'],
      process: ['Goal Setting', 'Campaign Setup', 'Optimization', 'Performance Analysis']
    },
    {
      id: 'video-production',
      title: 'VIDEO PRODUCTION',
      description: 'Visual stories that inspire, engage, and sell your brand message effectively.',
      features: ['Corporate Videos', 'Social Media Videos', 'Product Demos', 'Animation'],
      benefits: ['Higher Engagement', 'Better Storytelling', 'Increased Conversions', 'Brand Memorability'],
      process: ['Pre-Production', 'Filming', 'Post-Production', 'Final Delivery']
    },
    {
      id: 'influencer-marketing',
      title: 'INFLUENCER MARKETING',
      description: 'Real voices. Real impact. Real growth through authentic partnerships.',
      features: ['Influencer Partnerships', 'Campaign Management', 'Content Collaboration', 'Performance Tracking'],
      benefits: ['Authentic Reach', 'Trust Building', 'Targeted Audience', 'Cost-Effective Marketing'],
      process: ['Influencer Selection', 'Campaign Planning', 'Content Creation', 'Results Analysis']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const serviceId = params['id'];
      this.service = this.services.find(s => s.id === serviceId) || null;
      if (!this.service) {
        this.router.navigate(['/']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  toggleFAQ(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
