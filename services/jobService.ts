import { JobPosting, LinkedInPost } from '../types';

// Mock data for Job Postings
const MOCK_JOBS: JobPosting[] = [
  {
    id: '1',
    ref: 'CG-2024-001',
    title: 'VP of Sales - 3PL & Asset-Based',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$180,000 - $220,000',
    posted: '2 days ago',
    summary: 'Leading national sales strategy for a premier asset-based transportation provider.',
    description: 'We are seeking a high-impact VP of Sales to drive revenue growth and strategic partnerships within our 3PL and Asset-Based divisions.',
    responsibilities: [
      'Develop and execute national sales strategies',
      'Lead a high-performing team of account executives',
      'Manage key enterprise relationships',
      'Drive market expansion in the 3PL sector',
      'Collaborate with operations to ensure service excellence'
    ],
    requirements: [
      '12+ years in logistics sales leadership',
      'Proven track record in 3PL or Asset-Based environments',
      'Strong network within the transportation industry',
      'Exceptional negotiation and closing skills'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    ref: 'CG-2024-002',
    title: 'Operations Manager - Freight Forwarding',
    location: 'Remote / Atlanta, GA',
    type: 'Full-time',
    salary: '$120,000 - $145,000',
    posted: '1 week ago',
    summary: 'Overseeing global air and ocean operations for a leading forwarder.',
    description: 'The Operations Manager will lead a team of specialists to ensure seamless global freight movement and exceptional client service.',
    responsibilities: [
      'Manage end-to-end air and ocean freight operations',
      'Optimize carrier procurement and routing',
      'Ensure compliance with international shipping regulations',
      'Drive operational efficiency and cost-reduction initiatives'
    ],
    requirements: [
      '7+ years in freight forwarding operations',
      'Deep knowledge of air and ocean logistics',
      'Experience with global TMS platforms',
      'Strong problem-solving and leadership abilities'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    ref: 'CG-2024-003',
    title: 'Customs Brokerage Manager',
    location: 'Dallas, TX',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    posted: '3 days ago',
    summary: 'Leading compliance and brokerage operations for a growing regional hub.',
    description: 'We need an expert Customs Brokerage Manager to oversee our compliance programs and lead our brokerage team in Dallas.',
    responsibilities: [
      'Manage daily customs entry and compliance operations',
      'Ensure adherence to CBP regulations and trade laws',
      'Develop and mentor a team of licensed brokers',
      'Liaise with government agencies and clients'
    ],
    requirements: [
      'Licensed Customs Broker (LCB) required',
      '8+ years in customs brokerage management',
      'Strong understanding of HTS classification and valuation',
      'Excellent communication and regulatory knowledge'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    ref: 'CG-2024-004',
    title: 'Director of Operations - Asset-Based',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$190,000 - $240,000',
    posted: '5 days ago',
    summary: 'Strategic operational leadership for a large-scale asset-based carrier.',
    description: 'The Director of Operations will oversee the entire fleet and terminal network, driving safety, efficiency, and profitability.',
    responsibilities: [
      'Direct all asset-based terminal and fleet operations',
      'Implement safety and maintenance excellence programs',
      'Optimize asset utilization and driver retention',
      'Manage P&L for the operations division'
    ],
    requirements: [
      '15+ years in asset-based transportation leadership',
      'Proven experience managing large-scale fleet operations',
      'Strong financial acumen and P&L experience',
      'Advanced degree in Logistics or Business preferred'
    ],
    createdAt: new Date().toISOString()
  }
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
