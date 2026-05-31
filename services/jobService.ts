import { JobPosting, LinkedInPost } from '../types';

// Active job postings
const MOCK_JOBS: JobPosting[] = [
  {
    id: 'hr-coordinator-brantford',
    ref: 'CG-2026-005',
    title: 'Human Resources Coordinator',
    location: 'Brantford, ON',
    type: 'Full-time · Onsite',
    salary: '$58,000 - $60,000 CAD',
    summary:
      'HR Coordinator for an established Canadian manufacturing site. Broad exposure across recruitment, employee relations, onboarding, payroll support, and engagement. Reports to the Senior Manager of HR; partners closely with the onsite HRBP.',
    description: `An established Canadian manufacturing organization is adding an HR Coordinator to support its Brantford plant. Reports to the Senior Manager of HR and partners with the onsite HRBP. Supports both hourly and salaried employees in a fast-paced plant environment. Strong fit for someone continuing to build a career in HR with broad operational exposure.

**What you'll be doing**

- Support full-cycle recruitment: resume review, interview coordination, onboarding admin, background checks, agency communication
- Run onboarding and orientation for new hires
- Serve as a point of contact for employees and supervisors on HR policies and day-to-day questions
- Support attendance tracking, weekly payroll audits, and reporting
- Assist with employee relations, documentation, and disciplinary administration under HR leadership
- Maintain HR files, records, employee documentation, and reporting databases
- Coordinate service awards, engagement initiatives, training, and social events
- Support benefits administration and third-party provider communication
- Support compliance administration, audits, and workplace documentation

**What we're looking for**

- Diploma or degree in HR, Business, or related field
- 1-3 years of HR experience, ideally in manufacturing, industrial, warehousing, or production
- Strong organizational skills; comfortable juggling priorities in a fast-paced setting
- Comfortable interacting with employees and leadership at all levels
- Professional, approachable, highly discreet with sensitive information
- HRIS and timekeeping system familiarity (ADP Workforce Now is an asset)
- CHRP designation (or working toward it) is an asset

**Compensation & benefits**

- $58,000 - $60,000 CAD
- Health and dental benefits
- Company pension program
- Paid time off
- On-site parking
- Full-time, onsite, Monday to Friday`,
    responsibilities: [
      'Support full-cycle recruitment: resume review, interview coordination, onboarding, background checks',
      'Run onboarding and orientation for new hires',
      'Be the point of contact for employees and supervisors on HR policies and day-to-day questions',
      'Support attendance tracking, weekly payroll audits, and reporting',
      'Assist with employee relations, documentation, and disciplinary administration',
      'Maintain HR files, records, documentation, and reporting databases',
      'Coordinate service awards, engagement initiatives, training, and social events',
      'Support benefits administration and third-party provider communication',
      'Support compliance administration, audits, and workplace documentation',
    ],
    requirements: [
      'Diploma or degree in HR, Business, or related field',
      '1-3 years of HR experience (manufacturing or industrial environment preferred)',
      'Strong organizational skills and ability to manage multiple priorities',
      'Professional, approachable, discreet with sensitive information',
      'HRIS / timekeeping familiarity (ADP Workforce Now is an asset)',
      'CHRP designation or working toward it is an asset',
    ],
    createdAt: new Date('2026-05-27').toISOString(),
  },
  {
    id: 'hr-ops-manager-mississauga',
    ref: 'CG-2026-004',
    title: 'HR Operations Manager',
    location: 'Mississauga, ON',
    type: 'Full-time · Permanent',
    salary: '$85,000 - $90,000 + 10-15% bonus + 3% DPSP match',
    summary:
      'New HR leadership seat reporting to the CHRO of a growing supply chain / transportation organization. Owns employee relations, benefits administration, HRIS, and HR reporting across a ~250-person workforce.',
    description: `Reports to the CHRO. This is a newly-created HR leadership seat for an established supply chain and transportation organization that has never previously had a functional HR manager — strong opportunity to build out the function. The role covers employee relations, benefits administration (US + Canada), HRIS ownership, and HR reporting. Workforce is approximately 250 across office, drivers, and agency staff.

**What you'll own**

- Employee relations strategy: trust, accountability, retention, and day-to-day investigations
- Functional lead on employee relations matters; documenting and supporting leaders through corrective action
- Manage the US and Canadian benefits programs and work with partners on improvements
- HRIS and talent management system ownership; partner across the business to improve them
- Regular and ad-hoc HR reporting and dashboards for leadership
- Annual budgeting headcount template and ongoing budget-to-actual review with Finance
- Vendor management for HR partnerships
- Lead the company social committee and contribute to other HR committees as time permits

**What we're looking for**

- 2+ years in the supply chain, transportation, warehouse, distribution, or logistics industry (blue-collar environment experience preferred)
- HRIS experience required
- Strong working knowledge of employment law: Canada Labour Code and provincial standards
- Bachelor's degree or equivalent; working toward formal HR accreditation
- Excellent organizational, analytical, and communication skills
- Comfortable handling confidential information
- Proficient with Microsoft Office and able to learn new HR systems quickly

**Compensation & benefits**

- $85,000 - $90,000 base
- 10-15% bonus depending on experience
- 3% DPSP matching
- Equal opportunity employer

**Reporting & team**

Reports to the CHRO. No direct reports; works closely with the HR Coordinator and other HR team members.`,
    responsibilities: [
      'Lead employee relations strategy and act as the functional lead on day-to-day ER matters',
      'Manage US and Canadian benefits programs and partner on plan improvements',
      'Own HRIS and talent management systems; identify and drive improvements',
      'Provide regular HR reports and ad-hoc dashboards to leadership',
      'Prepare annual budgeting headcount templates and review budget-to-actual with Finance',
      'Manage HR vendor relationships',
      'Support investigations and ensure they are well-documented and timely',
      'Lead the company social committee and contribute to other HR committees',
    ],
    requirements: [
      '2+ years in supply chain, transportation, warehouse, distribution, or logistics',
      'Blue-collar / operational environment experience preferred',
      'HRIS experience required',
      'Working knowledge of CLC and provincial employment standards',
      "Bachelor's degree or equivalent; working toward formal HR accreditation",
      'Strong analytical, organizational, and communication skills',
      'Ability to handle confidential information with discretion',
    ],
    createdAt: new Date('2026-04-30').toISOString(),
  },
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
