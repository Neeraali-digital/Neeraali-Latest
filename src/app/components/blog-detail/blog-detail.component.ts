import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogId: string | null = null;
  blog: any = null;

  blogs = [
    {
      id: '1',
      title: 'The Future of Digital Marketing in 2024',
      excerpt: 'Discover the latest trends and strategies that will shape digital marketing this year.',
      content: `<p>Digital marketing continues to evolve at a rapid pace, and 2024 promises to bring exciting new opportunities for brands to connect with their audiences. In this comprehensive guide, we'll explore the key trends that will define the digital marketing landscape this year.</p>
      
      <h3>1. AI-Powered Personalization</h3>
      <p>Artificial Intelligence is revolutionizing how brands deliver personalized experiences. From chatbots to predictive analytics, AI enables marketers to create highly targeted campaigns that resonate with individual customers.</p>
      
      <h3>2. Voice Search Optimization</h3>
      <p>With the growing popularity of voice assistants, optimizing for voice search has become crucial. Brands need to adapt their SEO strategies to accommodate natural language queries and conversational search patterns.</p>
      
      <h3>3. Video-First Content Strategy</h3>
      <p>Video content continues to dominate social media platforms. Short-form videos, live streaming, and interactive video experiences are becoming essential components of successful digital marketing campaigns.</p>`,
      date: 'March 15, 2024',
      category: 'Digital Marketing',
      readTime: '5 min read',
      author: 'Neeraali Team'
    },
    {
      id: '2',
      title: 'Building Brand Identity That Resonates',
      excerpt: 'Learn how to create a brand identity that connects with your target audience.',
      content: `<p>A strong brand identity is the foundation of successful business growth. It's more than just a logo or color scheme – it's the complete visual and emotional experience that customers associate with your brand.</p>
      
      <h3>Understanding Your Brand Core</h3>
      <p>Before diving into visual elements, it's crucial to define your brand's core values, mission, and unique value proposition. This foundation will guide all your branding decisions.</p>
      
      <h3>Visual Identity Elements</h3>
      <p>Your visual identity includes logos, typography, color palettes, and imagery style. Each element should work harmoniously to create a cohesive brand experience across all touchpoints.</p>
      
      <h3>Consistency Across Channels</h3>
      <p>Maintaining consistency across all marketing channels – from your website to social media to print materials – is essential for building brand recognition and trust.</p>`,
      date: 'March 10, 2024',
      category: 'Branding',
      readTime: '7 min read',
      author: 'Neeraali Team'
    },
    {
      id: '3',
      title: 'Web Design Trends for Modern Businesses',
      excerpt: 'Explore the latest web design trends that drive conversions and user engagement.',
      content: `<p>Web design trends are constantly evolving, driven by technological advances and changing user expectations. Here are the key trends shaping modern web design in 2024.</p>
      
      <h3>Minimalist Design Philosophy</h3>
      <p>Clean, uncluttered designs with plenty of white space continue to dominate. This approach improves user experience by reducing cognitive load and focusing attention on key elements.</p>
      
      <h3>Interactive Micro-Animations</h3>
      <p>Subtle animations and micro-interactions enhance user engagement without overwhelming the experience. These elements provide feedback and guide users through their journey.</p>
      
      <h3>Mobile-First Approach</h3>
      <p>With mobile traffic accounting for over 50% of web visits, designing for mobile devices first has become standard practice. This ensures optimal performance across all devices.</p>`,
      date: 'March 5, 2024',
      category: 'Web Design',
      readTime: '6 min read',
      author: 'Neeraali Team'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.blog = this.blogs.find(b => b.id === this.blogId);
    if (!this.blog) {
      this.router.navigate(['/blog']);
    }
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}