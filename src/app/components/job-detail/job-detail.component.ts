import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface JobDetail {
  id: string;
  title: string;
  location: string;
  type: string;
  shiftWork: string;
  careerArea: string;
  contractualLocation: string;
  termOfEmployment: string;
  jobDescription: string;
  theOpportunity: string;
  whatYoullBeDoing: string;
  yourWorkLocation: string;
  whoYouAre: string;
  securityVetting: string;
  pay: string;
  benefitsAndCulture: string;
  additionalInformation: string;
}

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: JobDetail | null = null;

  private jobs: JobDetail[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      location: 'Morecambe, United Kingdom',
      type: 'Full-time',
      shiftWork: 'No',
      careerArea: 'Placements',
      contractualLocation: 'Heysham 2',
      termOfEmployment: 'Fixed Term',
      jobDescription: 'We are seeking a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions that drive our business forward and enhance user experiences across our platforms.',
      theOpportunity: 'This represents an exceptional career advancement opportunity for experienced software engineers looking to work on mission-critical systems in a supportive environment. You will have the chance to lead technical initiatives, mentor junior team members, and contribute to architectural decisions that shape the future of our technology stack. Working in a collaborative atmosphere with access to cutting-edge tools and technologies, you will be part of a team that values innovation, continuous learning, and work-life balance. This role offers significant professional growth potential and the opportunity to make a meaningful impact on projects that serve millions of users worldwide.',
      whatYoullBeDoing: 'As a Senior Software Engineer, you will design and implement complex software systems using modern programming languages and frameworks. You will collaborate closely with product managers, designers, and other engineers to deliver high-quality solutions that meet business requirements. Your responsibilities will include writing clean, maintainable code, conducting thorough code reviews, participating in technical design discussions, and ensuring that all deliverables meet our high standards for performance, security, and scalability. You will also mentor junior developers, contribute to our engineering best practices, and help troubleshoot production issues when they arise.',
      yourWorkLocation: 'This position is based at our modern office facility in Morecambe, United Kingdom, offering a comfortable and well-equipped work environment. We provide flexible working arrangements including hybrid options that allow you to balance office collaboration with remote work as needed. Our office is easily accessible by public transport and includes amenities such as free parking, modern workspaces, and recreational facilities. The location provides an excellent quality of life with access to beautiful coastal areas and a strong sense of community.',
      whoYouAre: 'You are a highly skilled software engineer with 5+ years of professional experience in full-stack development, demonstrating expertise in multiple programming languages and frameworks. You possess strong problem-solving abilities and a proven track record of delivering complex software solutions on time and within budget. You excel at collaborating with cross-functional teams and have excellent communication skills that allow you to explain technical concepts to both technical and non-technical stakeholders. You are passionate about writing clean, maintainable code and staying current with industry best practices and emerging technologies.',
      securityVetting: 'Due to the nature of our work in critical infrastructure and sensitive systems, all candidates for this position will undergo comprehensive security vetting procedures. This includes background checks, reference verification, and potentially enhanced security clearance depending on the specific requirements of your assigned projects. The vetting process is thorough but fair, designed to ensure the highest standards of security and trustworthiness. We will guide you through each step of the process and provide support throughout to make it as smooth as possible.',
      pay: 'We offer a highly competitive compensation package that reflects your experience, skills, and the value you bring to our organization. The salary range for this position is £65,000 - £85,000 annually, depending on your qualifications and experience level. In addition to base salary, you will be eligible for performance-based bonuses, profit sharing, and other incentives that can significantly increase your total compensation. We regularly review and adjust our pay scales to ensure we remain competitive in the market and reward our top performers appropriately.',
      benefitsAndCulture: 'Our comprehensive benefits package is designed to support your well-being and professional development. You will receive full health insurance coverage including medical, dental, and vision plans, plus access to mental health support services. We provide a generous pension scheme with employer contributions, flexible holiday allowance, and paid parental leave. Our culture emphasizes work-life balance with flexible working hours, remote work options, and a focus on continuous learning through training budgets, conference attendance, and professional development opportunities. We foster an inclusive environment where diverse perspectives are valued and innovation is encouraged.',
      additionalInformation: 'This is a fixed-term contract position initially for 12 months with strong potential for extension or conversion to a permanent role based on performance and business needs. You will work as part of our core engineering team on projects that have significant impact across the organization. The role offers excellent opportunities for career progression within our growing technology department. We are committed to providing a supportive onboarding process and ongoing mentorship to help you succeed in this position. All applicants must be eligible to work in the UK and willing to undergo the necessary security clearance procedures.'
    },
    {
      id: '2',
      title: 'Project Manager',
      location: 'Morecambe, United Kingdom',
      type: 'Full-time',
      shiftWork: 'No',
      careerArea: 'Placements',
      contractualLocation: 'Heysham 2',
      termOfEmployment: 'Fixed Term',
      jobDescription: 'We are looking for an experienced Project Manager to lead and coordinate complex projects from inception to completion, ensuring they are delivered on time, within budget, and to the highest quality standards.',
      theOpportunity: 'This is a fantastic opportunity for a seasoned project manager to take on leadership roles in high-stakes projects that drive our organizational objectives. You will work with cross-functional teams across multiple departments, managing complex stakeholder relationships and driving successful project outcomes. This role offers significant visibility within the organization and the chance to influence strategic decisions. You will have access to comprehensive training, mentorship from senior leaders, and opportunities to develop your project management expertise further. The position provides a platform for career advancement and the satisfaction of seeing your projects make a real difference to our operations and stakeholders.',
      whatYoullBeDoing: 'As Project Manager, you will be responsible for the full project lifecycle from initiation through closure. This includes developing detailed project plans, managing budgets and resources, coordinating team activities, and maintaining clear communication with all stakeholders. You will conduct risk assessments, implement mitigation strategies, and ensure that all project deliverables meet quality standards and regulatory requirements. You will also prepare regular progress reports, facilitate project meetings, and resolve issues that arise during project execution. Your role will involve close collaboration with technical teams, business stakeholders, and external partners to ensure seamless project delivery.',
      yourWorkLocation: 'The role is based at our headquarters in Morecambe, United Kingdom, in a modern office environment designed to support collaborative work. We offer flexible working arrangements that allow you to balance office-based work with remote options as appropriate for your role. The office provides excellent facilities including meeting rooms, collaborative spaces, and modern IT infrastructure. Located in a scenic coastal area, the location offers a high quality of life with good transport links and access to recreational activities. We support sustainable commuting with bike storage, public transport passes, and electric vehicle charging points.',
      whoYouAre: 'You are an accomplished project manager with a proven track record of successfully delivering complex projects in a technical or engineering environment. You hold relevant project management certifications such as PRINCE2, PMP, or APM, and have at least 5 years of experience in project management roles. You possess strong leadership and communication skills, with the ability to influence and motivate teams without direct authority. You are highly organized, detail-oriented, and comfortable working under pressure while maintaining a positive attitude. You have excellent stakeholder management skills and the ability to navigate complex organizational dynamics effectively.',
      securityVetting: 'Given the sensitive nature of our projects and the need to maintain the highest standards of security and confidentiality, all candidates will be required to undergo comprehensive security vetting. This process includes detailed background checks, verification of employment history, and potentially enhanced security clearance depending on project requirements. The vetting procedure is conducted professionally and confidentially, with support provided throughout the process. We understand that security requirements are important, and we will work with you to ensure a smooth and transparent vetting experience.',
      pay: 'We provide a competitive compensation package that recognizes your expertise and experience in project management. The salary range for this position is £55,000 - £70,000 per annum, with the exact figure depending on your qualifications, experience, and performance. You will also be eligible for an annual performance bonus based on individual and project achievements. Additional compensation elements include profit sharing opportunities and other incentives designed to reward successful project delivery. We conduct regular salary reviews to ensure our compensation remains competitive within the industry.',
      benefitsAndCulture: 'Our benefits package is comprehensive and designed to support your professional and personal well-being. You will receive full medical coverage including health insurance, dental care, and optical benefits. We offer a competitive pension scheme with generous employer contributions, 25 days annual leave plus bank holidays, and flexible working options. Professional development is a priority, with access to training courses, certification support, and conference attendance. Our culture promotes work-life balance, diversity and inclusion, and continuous improvement. We encourage innovation and provide platforms for sharing knowledge and best practices across the organization.',
      additionalInformation: 'This fixed-term position is initially for 18 months with excellent prospects for extension or conversion to a permanent role based on performance and business requirements. You will join a supportive team environment with access to experienced mentors and comprehensive onboarding. The role offers significant career development opportunities within our growing project management community. We are committed to providing the resources and support you need to excel in this challenging and rewarding position. Candidates must be eligible to work in the UK and available for the full duration of the contract.'
    },
    {
      id: '3',
      title: 'UX Designer',
      location: 'Morecambe, United Kingdom',
      type: 'Full-time',
      shiftWork: 'No',
      careerArea: 'Placements',
      contractualLocation: 'Heysham 2',
      termOfEmployment: 'Fixed Term',
      jobDescription: 'Join our design team as a UX Designer and create intuitive, user-centered digital experiences that delight our users and drive business success across our digital platforms and applications.',
      theOpportunity: 'This is an exciting opportunity for a talented UX designer to join a forward-thinking organization where design excellence is valued and user experience drives decision-making. You will work on diverse projects that impact millions of users, contributing to the design of innovative digital solutions that solve real-world problems. The role offers creative freedom, access to cutting-edge design tools and methodologies, and the chance to collaborate with talented designers, researchers, and developers. You will be part of a design community that values continuous learning, experimentation, and pushing the boundaries of what is possible in user experience design.',
      whatYoullBeDoing: 'As a UX Designer, you will lead the user experience design process from research through implementation. Your responsibilities include conducting user research and usability testing, creating user personas and journey maps, designing wireframes, prototypes, and high-fidelity mockups. You will collaborate closely with product managers, developers, and other stakeholders to ensure designs are technically feasible and aligned with business objectives. You will also conduct design critiques, iterate on designs based on user feedback and data, and contribute to the development of design systems and guidelines that ensure consistency across our digital products.',
      yourWorkLocation: 'This position is located at our creative office space in Morecambe, United Kingdom, featuring an inspiring design environment with natural light, collaborative workspaces, and state-of-the-art design equipment. We embrace flexible working arrangements that allow you to work from the office, remotely, or in hybrid arrangements that best suit your creative process. The office is situated in a beautiful coastal location with excellent transport links and amenities. We provide ergonomic workstations, high-quality monitors, design software licenses, and other tools necessary for professional design work.',
      whoYouAre: 'You are a passionate UX designer with 3+ years of experience creating user-centered digital experiences. You have a strong portfolio demonstrating your design process, problem-solving abilities, and impact on user experience and business metrics. You are proficient in industry-standard design tools and have experience with prototyping, user testing, and design systems. You possess excellent communication skills and the ability to advocate for users while collaborating effectively with cross-functional teams. You stay current with UX trends and best practices, and you are eager to learn and adapt to new challenges and technologies.',
      securityVetting: 'As part of our commitment to maintaining secure and trustworthy digital experiences, candidates for this role will undergo appropriate security vetting procedures. This includes background verification and reference checks to ensure suitability for working with sensitive user data and systems. The vetting process is conducted professionally and confidentially, with clear communication throughout. We recognize the importance of security in design work and will provide guidance and support to help you understand and complete the necessary requirements.',
      pay: 'We offer a competitive compensation package that reflects the value of exceptional UX design talent. The salary range for this position is £45,000 - £60,000 annually, depending on your experience and demonstrated impact. In addition to base salary, you will be eligible for performance bonuses tied to project success and user experience improvements. We also provide additional incentives such as profit sharing and recognition programs for outstanding design contributions. Our compensation structure is designed to attract and retain top design talent.',
      benefitsAndCulture: 'Our benefits package supports both your professional growth and personal well-being. You will receive comprehensive health coverage including medical, dental, and mental health support. We offer a generous pension scheme, 25 days annual leave, and flexible working arrangements. Professional development is prioritized with design conference budgets, training allowances, and access to online learning platforms. Our creative culture encourages experimentation, values diverse perspectives, and provides opportunities for sharing work through internal design showcases and external publications. We foster an environment where design thinking is integrated across the organization.',
      additionalInformation: 'This is a fixed-term contract position for 12 months with strong potential for extension based on performance and project needs. You will work within our established design team while having opportunities to collaborate with other departments. The role provides exposure to a wide range of projects and stakeholders, offering valuable experience in enterprise-level UX design. We are committed to your success and provide comprehensive onboarding, mentorship, and resources to help you thrive. Candidates must be eligible to work in the UK and demonstrate a passion for creating exceptional user experiences.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      this.job = this.jobs.find(j => j.id === jobId) || null;
      if (!this.job) {
        this.router.navigate(['/career']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/career']);
  }

  onInterested() {
    // Handle "I am interested" action
    alert('Thank you for your interest! We will contact you soon.');
  }

  referFriend() {
    // Handle "Refer a friend" action
    alert('Thank you for considering referring a friend! We appreciate your support.');
  }

  shareOnSocial(platform: string) {
    // Handle social media sharing
    const url = window.location.href;
    const text = `Check out this job opportunity: ${this.job?.title}`;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  }
}
