import { JobPosting, LinkedInPost } from '../types';

// Active job postings
const MOCK_JOBS: JobPosting[] = [
  {
    id: 'project-coordinator-hamilton',
    ref: 'CG-2026-003',
    title: 'Logistics Project Coordinator',
    location: 'Hamilton, ON',
    type: 'Full-time · Onsite',
    salary: '$55,000 - $65,000 CAD',
    summary:
      'Coordinator role on the Operations team of an established logistics and transportation organization. Manages project timelines, vendor and carrier relationships, and client communication end-to-end.',
    description: `Working with an established and growing organization in logistics and transportation. The Project Coordinator joins the Operations team to own project timelines, service schedules, and client communication across a high-volume slate of active mandates. Strong long-term growth and mentorship environment.

**What you'll be doing**

- Coordinate project timelines, service schedules, and customer expectations end-to-end
- Manage multiple active projects in a high-volume, deadline-driven environment
- Serve as a primary point of contact between clients, carriers, and internal teams
- Provide consistent updates to stakeholders across project lifecycles
- Track progress, milestones, and deliverables in Excel and internal systems
- Prepare and verify shipping documentation
- Build and maintain vendor and carrier relationships
- Support day-to-day operations including data entry and administrative coordination
- Handle high volumes of email, phone, and Teams communication, with occasional after-hours support

**What we're looking for**

- Experience in logistics, transportation, or project coordination (3PL exposure is an asset)
- Strong organizational and multitasking skills; able to manage competing priorities
- High attention to detail and problem-solving ability
- Professional written and verbal communication
- Customer-focused, proactive mindset
- Comfortable in a fast-paced, team-oriented environment

**Compensation & benefits**

- $55,000 - $65,000 CAD
- Medical, dental, vision, disability, and life insurance
- Paid vacation plus additional personal time
- On-site parking
- Training, mentorship, and long-term growth opportunities
- Full-time, permanent, onsite in Hamilton`,
    responsibilities: [
      'Coordinate project timelines, service schedules, and customer expectations end-to-end',
      'Manage multiple active projects in a high-volume, deadline-driven environment',
      'Serve as a primary point of contact between clients, carriers, and internal teams',
      'Track progress, milestones, and deliverables in Excel and internal systems',
      'Prepare and verify shipping documentation',
      'Build and maintain vendor and carrier relationships',
      'Support day-to-day operations including data entry and administrative coordination',
    ],
    requirements: [
      'Experience in logistics, transportation, or project coordination (3PL exposure an asset)',
      'Strong organizational and multitasking skills',
      'High attention to detail and problem-solving ability',
      'Professional written and verbal communication',
      'Customer-focused, proactive mindset',
      'Comfortable in a fast-paced, team-oriented environment',
    ],
    createdAt: new Date('2026-03-31').toISOString(),
  },
  {
    id: 'customs-rater-sarnia',
    ref: 'CG-2026-002',
    title: 'Customs Rater',
    location: 'Sarnia, ON',
    type: 'Full-time · Onsite',
    salary: '$50,000 - $60,000 CAD',
    summary:
      'Handles documentation from importers, freight forwarders, airlines, and transports — verifying, entering, and updating customs files. Open to candidates in Sarnia, Windsor, or Mississauga.',
    description: `Reporting to the Brokerage Manager. The Customs Rater handles documentation received from importers, freight forwarders, airlines, and transports — verifying it, entering it into the customs system, and updating or creating files as needed. The role coordinates with importers to complete documentation and works closely with the internal customs and freight teams.

**Locations**

Open to candidates in Sarnia (preferred), Windsor, or Mississauga, ON. Full-time onsite, Monday to Friday, day shift.

**What you'll do**

- Verify and enter customs documentation from importers, forwarders, airlines, and transports
- Update existing files and open new ones as required
- Request supporting documents from importers to complete files
- Coordinate with internal customs and freight teams
- Apply HS tariff classification and local/national brokerage procedures

**What we're looking for**

- Minimum 1 year of experience in a Customs Rater capacity
- International ocean customs experience required
- Working knowledge of customs import regulations, freight forwarding, and HS tariff classification
- Familiarity with local and national brokerage procedures
- CCS (Certified Customs Specialist) is a strong asset and supports the top end of the range
- Candidates must be based in Canada

**Compensation & benefits**

- $50,000 - $60,000 CAD
- Comprehensive health and dental
- Equal opportunity employer`,
    responsibilities: [
      'Verify and enter customs documentation from importers, forwarders, airlines, and transports',
      'Update existing files and open new ones as required',
      'Request supporting documents from importers to complete files',
      'Coordinate with internal customs and freight teams',
      'Apply HS tariff classification and local/national brokerage procedures',
    ],
    requirements: [
      'Minimum 1 year of experience in a Customs Rater capacity',
      'International ocean customs experience required',
      'Working knowledge of customs import regulations, freight forwarding, and HS tariff classification',
      'Familiarity with local and national brokerage procedures',
      'CCS designation is a strong asset (supports the top end of the range)',
      'Based in Canada — Sarnia, Windsor, or Mississauga preferred',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lrm-monroe',
    ref: 'CG-2026-001',
    title: 'Labor Relations Manager',
    location: 'Monroe, OH',
    type: 'Full-time',
    salary: '$100,000 - $125,000 + up to 10% bonus',
    summary:
      'Sole HR and labor relations leader for a single unionized site. Manages a team of three onsite HR reps and serves as the SME for collective bargaining, grievances, and NLRA compliance.',
    description: `Sole HR and labor relations leader for a single unionized site in Monroe, OH. Onsite five days a week, managing three HR representatives and acting as the organization's primary expert on labor relations.

**What you'll own**

- Day-to-day HR leadership for the site: employee relations, performance management, investigations, policy
- Full grievance lifecycle from intake through arbitration, including evidence prep and collaboration with legal counsel
- Collective bargaining support: research, costing, proposal development, ratification
- Interpretation and consistent administration of the collective agreement
- Compliance across NLRA, FLSA, Title VII, ADA, FMLA, and related state law
- Coaching site leaders on labor relations best practices and union interactions

**What we're looking for**

- 7-10 years of progressive HR experience with significant labor relations responsibility
- Proven experience in unionized environments, including grievance handling and collective bargaining
- Strong working knowledge of U.S. labor and employment law
- Teamsters experience a strong asset
- Bachelor's in HR, Industrial/Labor Relations, Business, or related field
- PHR, SPHR, SHRM-CP, or SHRM-SCP preferred
- Manufacturing, logistics, healthcare, or utilities background is an asset

**Compensation & benefits**

- $100,000 - $125,000 base + up to 10% bonus
- Full benefits and 401(k) matching
- 3 weeks PTO
- Onsite, 5 days a week
- Occasional travel for bargaining sessions and hearings`,
    responsibilities: [
      'Lead all HR operations for the site, managing 3 onsite HR representatives',
      'Serve as SME for collective agreement interpretation and administration',
      'Manage the full grievance process from intake through arbitration',
      'Support collective bargaining: research, costing, proposal development, negotiations',
      'Investigate complex employee relations matters and advise on corrective action',
      'Build and maintain constructive relationships with union leaders and stewards',
      'Ensure compliance with NLRA, FLSA, Title VII, ADA, and FMLA',
      'Coach site leaders on labor relations best practices and union interactions',
    ],
    requirements: [
      "Bachelor's in HR, Industrial/Labor Relations, Business, or related field",
      '7-10 years of progressive HR experience with significant labor relations responsibility',
      'Proven experience in unionized environments, including grievance handling and collective bargaining',
      'Strong working knowledge of U.S. labor and employment law',
      'Teamsters experience a strong asset',
      'PHR, SPHR, SHRM-CP, or SHRM-SCP preferred',
    ],
    createdAt: new Date().toISOString(),
  },
];

// Mock data for LinkedIn Posts
const MOCK_POSTS: LinkedInPost[] = [
  {
    id: 'p1',
    author: 'Tyler Ortolano',
    role: 'Managing Partner @ Certus Supply Chain Search',
    content: 'The demand for high-impact Sales and Operations leadership in the 3PL and Asset-Based space has never been higher. We are seeing a shift towards leaders who can navigate complex global forwarding and customs compliance with ease. #3PL #Logistics #Leadership #Recruitment',
    date: '2h ago',
    avatar: 'https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png',
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    author: 'Certus Group',
    role: 'Supply Chain Search & Specialized Recruitment',
    content: 'Certainty Delivered. Our latest placement involved a critical search for a Customs Brokerage Manager for a global forwarder. Another successful mandate closed in the Freight Forwarding sector.',
    date: '1d ago',
    avatar: 'https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date().toISOString()
  }
];

export const getJobs = async (): Promise<JobPosting[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_JOBS), 500);
  });
};

export const getJobsByDomain = async (): Promise<JobPosting[]> => {
  return getJobs();
};

export const saveJob = async (job: Partial<JobPosting>): Promise<void> => {
  console.log('[Mock Service] Saving job:', job);
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const deleteJob = async (id: string | number): Promise<void> => {
  console.log('[Mock Service] Deleting job:', id);
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const login = async (): Promise<boolean> => {
  console.log('[Mock Service] Login requested');
  return true;
};

export const logout = async (): Promise<void> => {
  console.log('[Mock Service] Logout requested');
};

export const isLoggedIn = (): boolean => {
  return true;
};

export const isAdmin = async (user: any): Promise<boolean> => {
  return true;
};

export const onAuthChange = (callback: (user: any) => void) => {
  // Simulate a logged in user
  setTimeout(() => {
    callback({
      uid: 'mock-admin',
      email: 'admin@certusgroup.com',
      displayName: 'Admin User'
    });
  }, 100);
  return () => {};
};

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_POSTS), 500);
  });
};

export const saveLinkedInPost = async (post: Partial<LinkedInPost>): Promise<void> => {
  console.log('[Mock Service] Saving LinkedIn post:', post);
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const deleteLinkedInPost = async (id: string): Promise<void> => {
  console.log('[Mock Service] Deleting LinkedIn post:', id);
  return new Promise((resolve) => setTimeout(resolve, 500));
};
