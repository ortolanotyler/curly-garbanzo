import { JobPosting, LinkedInPost } from '../types';

// Active job postings
const MOCK_JOBS: JobPosting[] = [
  {
    id: 'project-coordinator-hamilton',
    ref: 'CG-2026-039',
    title: 'Project Coordinator (Logistics)',
    location: 'Hamilton, ON',
    type: 'Full-time · Onsite · Permanent',
    salary: '$60,000 - $65,000 CAD',
    summary:
      'Customer-facing project coordinator on a growing logistics/3PL operations team, coordinating multiple simultaneous projects supporting U.S. retail-sector logistics. Owns timelines, installation schedules, vendor relationships, and client communication.',
    description: `An onsite Hamilton role on a fast-growing logistics/3PL operations team. You'll coordinate and support multiple projects at once — keeping timelines, installation schedules, and service expectations on track — primarily supporting U.S. retail-sector logistics. A strong opportunity to grow within the logistics field.

**Schedule & location**

Onsite in Hamilton, ON, Monday to Friday, 8:30am-5:00pm. Comfort with occasional after-hours phone support is needed. Company-paid on-site parking.

**What you'll be doing**

- Coordinate project timelines, installation schedules, and service expectations directly with customers
- Manage multiple high-priority projects simultaneously in a fast-paced environment
- Handle high volumes of email and after-hours phone support
- Keep clients updated via Teams and professional correspondence
- Track milestones, task assignments, and reporting in Excel
- Build and maintain strong vendor relationships
- Prepare shipping documentation and handle minor accounting and data entry

**What we're looking for**

- Customer-facing and/or project-coordination experience (3PL or logistics an asset, not required)
- Strong communication and interpersonal skills with a professional phone manner
- High level of multitasking, organization, and detail orientation under deadlines
- Comfortable resolving issues as they arise
- Proficiency with Microsoft Excel
- High school diploma; customer service experience
- Bilingual English/French is an asset
- Open to newer grads with a hunger to learn, or candidates from sales / account management

**Compensation & benefits**

- $60,000 - $65,000 CAD
- Medical and dental benefits, life/AD&D, long-term disability
- Paid vacation (2 weeks; 3 potentially negotiable) plus personal/volunteer time
- Company-paid on-site parking
- Permanent, full-time, Monday to Friday`,
    responsibilities: [
      'Coordinate project timelines, installation schedules, and service expectations with customers',
      'Manage multiple high-priority projects simultaneously',
      'Handle high volumes of email and after-hours phone support',
      'Keep clients updated via Teams and track milestones in Excel',
      'Build and maintain vendor relationships',
      'Prepare shipping documentation and handle minor accounting/data entry',
    ],
    requirements: [
      'Customer-facing and/or project-coordination experience (3PL/logistics an asset)',
      'Strong communication and interpersonal skills; professional phone manner',
      'High multitasking, organization, and attention to detail under deadlines',
      'Proficiency with Microsoft Excel',
      'High school diploma; customer service experience',
      'Bilingual English/French an asset',
    ],
    createdAt: new Date('2026-03-22').toISOString(),
  },
  {
    id: 'hr-manager-columbus',
    ref: 'CG-2026-033',
    title: 'Human Resources Manager',
    location: 'Columbus, OH',
    type: 'Full-time · Onsite',
    salary: '$100,000 - $110,000 + up to 10% bonus',
    summary:
      'Near-standalone HR Manager for a newly launched 3PL distribution site (~150 employees, two accounts, 7-day operation). Owns employee relations, talent, performance, compliance, and engagement, supported by an onsite HR admin. Reports to the GM and Director of US HR.',
    description: `A senior-leadership-team HR Manager role at a newly launched third-party logistics distribution site. Reports to the General Manager and the Director of US Human Resources. Near-standalone (supported by one onsite HR admin), owning generalist HR across employee relations, talent management, performance, compensation and benefits, and engagement. This is a challenging, change-heavy new site with great people — it needs a hands-on leader who can drive change.

**Site at a glance**

- ~150 employees (peaks up to ~250 with seasonal temps), supporting two accounts
- Large-scale, 7-day distribution operation across two shift patterns
- Non-union; diverse, multilingual workforce
- Roughly 80% office / 20% on the warehouse floor

**What you'll own**

- A positive employee-relations climate: open-door, investigations, counseling, and fair, consistent policy application
- Performance management: coaching leaders, action plans, corrective action, and documentation
- Compliance with federal and state law (ADA/ADEA, EEO, FLSA, FMLA, HIPAA, wage & hour, immigration)
- Recruitment, orientation, and temporary-staffing/vendor management within budget
- Compensation, benefits communication, recognition, and engagement programs
- Workers' compensation, OSHA support, and accident investigations
- HR reporting and trend analysis (turnover, retention, time-to-fill) with action plans
- Site training programs and supervisor/team-member coaching

**What we're looking for**

- 5-7+ years of HR experience in an exempt leadership role in distribution or manufacturing
- Strong knowledge of US employment law (ADA/ADEA, EEO, FLSA, FMLA, HIPAA, wage & hour, immigration)
- Proven employee-relations, investigations, and performance-management experience
- Strong consulting, problem-solving, and project-management skills; decisive in implementing solutions
- Comfortable in a fast-paced, high-change, high-volume environment
- Intermediate-to-advanced MS Office and HRIS experience (ADP Workforce Now a plus)
- Spanish language ability is an asset given the workforce
- Bachelor's degree preferred; PHR or SPHR preferred

**Compensation & benefits**

- $100,000 - $110,000 + up to 10% bonus
- 401(k) match (dollar-for-dollar on the first 3%, 50% on the next 2%)
- 3 weeks PTO
- Medical, dental, and vision
- Able to work extended hours as needed`,
    responsibilities: [
      'Maintain a positive employee-relations climate through fair, consistent policy application',
      'Coach leaders on performance management, corrective action, and documentation',
      'Ensure compliance with federal and state employment law',
      'Manage recruitment, orientation, and temporary-staffing/vendor relationships within budget',
      'Administer compensation, benefits communication, recognition, and engagement programs',
      'Manage workers’ compensation, OSHA support, and accident investigations',
      'Provide HR reporting and trend analysis with action plans',
      'Deliver site training and coach supervisors and team members',
    ],
    requirements: [
      '5-7+ years of HR experience in an exempt leadership role in distribution or manufacturing',
      'Strong knowledge of US employment law (ADA/ADEA, EEO, FLSA, FMLA, HIPAA, wage & hour, immigration)',
      'Proven employee-relations, investigations, and performance-management experience',
      'Strong consulting, problem-solving, and project-management skills',
      'Intermediate-to-advanced MS Office and HRIS experience (ADP Workforce Now a plus)',
      'Bachelor’s degree preferred; PHR or SPHR preferred',
    ],
    createdAt: new Date('2026-06-15').toISOString(),
  },
  {
    id: 'hr-generalist-york-pa',
    ref: 'CG-2026-032',
    title: 'HR Generalist (Bilingual English/Spanish)',
    location: 'York, PA',
    type: 'Full-time · Onsite · Permanent',
    salary: '$70,000 - $75,000',
    summary:
      'Standalone site HR Generalist for a non-union, multi-client distribution/warehouse operation (~50-60 employees). Owns the full HR cycle on the floor — employee relations, recruitment, payroll, benefits, leave, and compliance. Fluent Spanish required.',
    description: `A standalone HR Generalist role supporting a non-union, multi-client distribution/warehouse site of roughly 50-60 employees. Maintains a strong presence on the warehouse floor and serves as the primary HR partner to employees and site leadership. A mature, calm, solutions-driven generalist who can run the site's HR independently.

**What you'll own**

- Employee relations, workplace investigations, attendance, performance, and policy interpretation
- Recruitment and selection: screening, interviews, post-offer physicals, background checks, onboarding, and orientation
- Weekly payroll processing and audits; payroll records and corrections
- Benefits administration: enrollments, qualifying life events, terminations, and open enrollment
- Leave administration: FMLA, ADA accommodations, parental leave, and STD/LTD
- Compliance with federal, state, and local employment law; personnel records and HR documentation
- Health & safety support: investigations, training, and OSHA compliance alongside operations
- Employee engagement, recognition, and retention programs

**What we're looking for**

- 4+ years of HR experience, ideally supporting a warehouse, distribution, logistics, or manufacturing workforce
- Bilingual in English and Spanish (verbal and written) — required
- Knowledge of FMLA, ADA, EEOC, wage-and-hour, workers' compensation, and leave administration
- Experience with HRIS, payroll, and timekeeping systems (ADP and/or UKG preferred)
- Prior payroll-processing experience preferred
- Strong employee-relations, conflict-resolution, and judgment; able to maintain confidentiality
- Bachelor's in HR or related field preferred; HS diploma/GED required

**Compensation & benefits**

- $70,000 - $75,000
- Medical, dental, and vision; life and disability insurance
- 401(k) with company match
- 3 weeks PTO
- Wellness programs`,
    responsibilities: [
      'Serve as the standalone HR resource on the warehouse floor for employees and leaders',
      'Handle employee relations, investigations, attendance, and performance matters',
      'Run recruitment, selection, onboarding, and orientation',
      'Process and audit weekly payroll; maintain payroll records',
      'Administer benefits and leave (FMLA, ADA, parental, STD/LTD)',
      'Ensure compliance with federal, state, and local employment law',
      'Support health & safety investigations, training, and OSHA compliance',
      'Drive employee engagement, recognition, and retention',
    ],
    requirements: [
      '4+ years of HR experience, ideally in warehouse, distribution, logistics, or manufacturing',
      'Bilingual in English and Spanish (verbal and written) — required',
      'Knowledge of FMLA, ADA, EEOC, wage-and-hour, workers’ comp, and leave administration',
      'Experience with HRIS, payroll, and timekeeping systems (ADP and/or UKG preferred)',
      'Strong employee-relations, conflict-resolution, and confidentiality',
      'Bachelor’s in HR or related field preferred; HS diploma/GED required',
    ],
    createdAt: new Date('2026-06-15').toISOString(),
  },
  {
    id: 'bd-exec-trade-buffalo',
    ref: 'CG-2026-037',
    title: 'Business Development Executive — Customs & Trade',
    location: 'Buffalo, NY (Remote)',
    type: 'Full-time · Remote · Permanent',
    salary: '$100,000 base + uncapped commission',
    summary:
      'Remote hunter sales role winning net-new B2B business for a global customs brokerage and trade-services organization. Owns a defined local territory: prospecting, needs assessments, RFPs, and closing across customs, trade compliance, and freight solutions. ~25% local travel.',
    description: `A remote, hunter B2B sales role for a global customs brokerage, trade-consulting, and freight-services organization. You'll own a defined local territory — building relationships, presenting solutions, and winning net-new business — with uncapped commission and approximately 25% local travel.

**What you'll be doing**

- Develop a strategic territory plan and identify high- and medium-potential accounts
- Proactively introduce customs, trade-compliance, and freight solutions to new clients
- Conduct thorough needs assessments and uncover additional opportunities
- Draft RFPs with internal teams and ensure timely delivery
- Negotiate pricing and contract terms; finalize contracts cross-functionally
- Achieve or exceed assigned sales targets and keep CRM current

**What we're looking for**

- 5+ years of related B2B sales experience
- Demonstrated ability to open and close business and exceed targets
- Excellent communication, interpersonal, and key-account skills
- Strong CRM (e.g., Salesforce) and MS Office proficiency
- High-initiative, self-motivated, and results-oriented
- Associate's degree or post-secondary education required; bachelor's preferred

**Compensation & benefits**

- $100,000 base + uncapped monthly commission
- Remote, territory-based (~25% local travel)
- Full benefits`,
    responsibilities: [
      'Develop a strategic territory plan and identify target accounts',
      'Introduce customs, trade-compliance, and freight solutions to new clients',
      'Conduct needs assessments and uncover opportunities',
      'Draft RFPs and negotiate pricing and contract terms',
      'Achieve or exceed sales targets and maintain CRM discipline',
    ],
    requirements: [
      '5+ years of related B2B sales experience',
      'Demonstrated ability to open and close business and exceed targets',
      'Excellent communication, interpersonal, and key-account skills',
      'Strong CRM (e.g., Salesforce) and MS Office proficiency',
      'Associate’s degree or post-secondary education required; bachelor’s preferred',
    ],
    createdAt: new Date('2026-06-08').toISOString(),
  },
  {
    id: 'cad-designer-montreal',
    ref: 'CG-2026-031',
    title: 'Designer — Storage Systems (CAD)',
    location: 'South Shore Montreal, QC',
    type: 'Full-time · Remote (onsite training) · Permanent',
    salary: '$58,000 - $75,000 CAD',
    summary:
      'Produce 2D CAD warehouse and storage-system layouts from concept through installation for an industrial storage-solutions manufacturer. Owns drawings, bills of materials, costing, and stakeholder coordination. Bilingual French/English required (French-first).',
    description: `Reporting to the Design Manager, the Designer works on storage-system designs from concept through installation and certification. The role involves constant communication with customers, vendors, installers, and internal teams (engineering, sales, manufacturing).

**Location & schedule**

Primarily remote/work-from-home after an initial onsite training period (~1-2 months) at the local Montreal-area office. Occasional travel to South Shore site meetings as needed. Candidates should be local to the Montreal area.

**What you'll be doing**

- Interpret customer requirements and convert them into storage-system design proposals that optimize warehouse space
- Prepare complete, accurate CAD drawings (presentation, installation, permit/PSR, and fabrication) in AutoCAD to company and engineering standards
- Prepare detailed bills of materials and project costing; source approved suppliers and obtain valid BOMs
- Coordinate purchase orders, material orders, and supplier quotations
- Manage projects start to finish with strong follow-up across stakeholders
- Act as the design SME during installation, resolving technical issues onsite with the sales rep or project manager
- Support peer reviews and occasional site evaluations and measurements

**What we're looking for**

- Post-secondary technical education (DEP/DEC, degree, or diploma) in industrial drafting, mechanical engineering technology, civil, structural, or architecture
- 2-5 years of 2D CAD experience (AutoCAD or equivalent), ideally in an industrial or manufacturing environment
- Combined drafting and project-coordination experience is a strong asset
- Strong organization, time management, and follow-up; comfortable with frequent revisions
- Bilingual French and English required — strong command of French (the majority of work is in French)
- Knowledge of pallet racking, warehouse layout, material flow, and load capacities is a major asset (no P.Eng required — engineers stamp the drawings)

**Compensation & benefits**

- $58,000 - $75,000 CAD (commensurate with experience)
- Remote after the initial onsite training period
- Permanent, full-time`,
    responsibilities: [
      'Convert customer requirements into optimized storage-system design proposals',
      'Prepare presentation, installation, permit/PSR, and fabrication drawings in AutoCAD',
      'Build detailed bills of materials and project costing; source approved suppliers',
      'Coordinate purchase orders, material orders, and supplier quotations',
      'Manage projects start to finish with strong stakeholder follow-up',
      'Act as the design SME during installation and resolve onsite technical issues',
    ],
    requirements: [
      'Post-secondary technical education in drafting, mechanical/civil/structural tech, or architecture',
      '2-5 years of 2D CAD (AutoCAD or equivalent), ideally industrial/manufacturing',
      'Bilingual French and English — strong French command required',
      'Strong organization, time management, and follow-up across stakeholders',
      'Knowledge of pallet racking, warehouse layout, and material flow is a major asset',
    ],
    createdAt: new Date('2026-06-04').toISOString(),
  },
  {
    id: 'bd-exec-trade-vancouver',
    ref: 'CG-2026-036',
    title: 'Business Development Executive — Customs & Trade',
    location: 'Vancouver, BC (Remote)',
    type: 'Full-time · Remote · Permanent',
    salary: '$100,000 CAD + uncapped commission',
    summary:
      'Remote hunter sales role winning net-new B2B business for a global customs brokerage and trade-services organization. Owns a defined local territory: prospecting, needs assessments, RFPs, and closing across customs, trade compliance, and freight solutions. ~25% local travel.',
    description: `A remote, hunter B2B sales role for a global customs brokerage, trade-consulting, and freight-services organization. You'll own a defined local territory — building relationships, presenting solutions, and winning net-new business — with uncapped commission and approximately 25% local travel.

**What you'll be doing**

- Develop a strategic territory plan and identify high- and medium-potential accounts
- Proactively introduce customs, trade-compliance, and freight solutions to new clients
- Conduct thorough needs assessments and uncover additional opportunities
- Draft RFPs with internal teams and ensure timely delivery
- Negotiate pricing and contract terms; finalize contracts cross-functionally
- Achieve or exceed assigned sales targets and keep CRM current

**What we're looking for**

- 5+ years of related B2B sales experience
- Demonstrated ability to open and close business and exceed targets
- Excellent communication, interpersonal, and key-account skills
- Strong CRM (e.g., Salesforce) and MS Office proficiency
- High-initiative, self-motivated, and results-oriented
- Associate's degree or post-secondary education required; bachelor's preferred

**Compensation & benefits**

- $100,000 CAD base + uncapped monthly commission
- Remote, territory-based (~25% local travel)
- Full benefits`,
    responsibilities: [
      'Develop a strategic territory plan and identify target accounts',
      'Introduce customs, trade-compliance, and freight solutions to new clients',
      'Conduct needs assessments and uncover opportunities',
      'Draft RFPs and negotiate pricing and contract terms',
      'Achieve or exceed sales targets and maintain CRM discipline',
    ],
    requirements: [
      '5+ years of related B2B sales experience',
      'Demonstrated ability to open and close business and exceed targets',
      'Excellent communication, interpersonal, and key-account skills',
      'Strong CRM (e.g., Salesforce) and MS Office proficiency',
      'Associate’s degree or post-secondary education required; bachelor’s preferred',
    ],
    createdAt: new Date('2026-05-26').toISOString(),
  },
  {
    id: 'customs-rater-sarnia',
    ref: 'CG-2026-030',
    title: 'Customs Rater',
    location: 'Sarnia / Windsor / Mississauga, ON',
    type: 'Full-time · Onsite · Permanent',
    salary: '$50,000 - $60,000 CAD',
    summary:
      'Process and verify customs documentation for a customs brokerage and freight-forwarding operation. Reviews and enters import files, requests missing documents, and partners with customs and freight teams. International ocean/sea import experience required.',
    description: `Reporting to the Brokerage Manager, the Customs Rater verifies and enters documentation received from importers, freight forwarders, airlines, and carriers, creates and updates files, and requests missing documents to complete each file. Works closely with the customs and freight teams to deliver accurate, on-time service to clients.

**Location & schedule**

Open to candidates in Sarnia (preferred), Windsor, or Mississauga, ON. Full-time, onsite. Day shift, Monday to Friday for ocean lanes; alternate shifts may apply for road-only lanes. Candidates must be authorized to work in Canada.

**What you'll be doing**

- Verify and enter customs documentation from importers, forwarders, airlines, and carriers
- Create new files and update previously opened files in the brokerage system
- Request and follow up on documents needed to complete files
- Apply H.S. tariff classification and customs release/rating procedures
- Coordinate with the customs and freight departments to resolve issues
- Provide accurate, responsive service to clients

**What we're looking for**

- 1-2 years of experience in customs and transportation, in a customs rating/release capacity
- Working knowledge of local and national brokerage procedures and customs regulations
- International ocean/sea import experience required
- Knowledge of freight-forwarding processes and H.S. tariff classification
- Extremely detail-oriented and organized; strong problem-solving skills
- Able to work both independently and as part of a team
- Schedule flexibility; CCS (Certified Customs Specialist) is an asset

**Compensation & benefits**

- $50,000 - $60,000 CAD (CCS designation supports the top of the range)
- Comprehensive health and dental
- Equal opportunity employer`,
    responsibilities: [
      'Verify and enter customs documentation from importers, forwarders, airlines, and carriers',
      'Create and update import files in the brokerage system',
      'Request and follow up on documents needed to complete files',
      'Apply H.S. tariff classification and customs release/rating procedures',
      'Coordinate with customs and freight departments to resolve issues',
    ],
    requirements: [
      '1-2 years in customs and transportation, in a customs rating/release capacity',
      'International ocean/sea import experience required',
      'Working knowledge of brokerage procedures, customs regulations, and H.S. classification',
      'Extremely detail-oriented and organized; strong problem-solving skills',
      'Authorized to work in Canada; CCS designation is an asset',
    ],
    createdAt: new Date('2026-05-28').toISOString(),
  },
  {
    id: 'director-bd-trade-central-us',
    ref: 'CG-2026-034',
    title: 'Director, Business Development — Customs & Trade',
    location: 'Remote (Central US)',
    type: 'Full-time · Remote · Permanent',
    salary: '$155,000 - $170,000 USD + 30% bonus',
    summary:
      'Lead new-business development across the Central US for a global customs brokerage and trade-services organization. A hunter-inspirer owning territory strategy, pipeline, and B2B revenue across customs, trade compliance, and freight solutions.',
    description: `A remote leadership role driving new-business development across a Central US territory (roughly Illinois south to Texas) for a global customs brokerage, trade-consulting, and freight-services organization. Owns territory strategy, new-client acquisition, and revenue growth — a hunter who can also inspire and push results.

**What you'll be doing**

- Develop strategic territory plans and identify high- and medium-potential accounts
- Generate new business and introduce customs, trade-compliance, and freight solutions to new clients
- Build and maintain new client relationships; conduct needs assessments and identify opportunities
- Lead RFP responses and negotiate pricing and contract terms with cross-functional teams
- Develop strategic account plans and ensure clear stakeholder communication
- Meet and exceed quarterly and annual sales targets; present ongoing business reviews

**What we're looking for**

- 5+ years of related B2B sales / business-development experience
- Proven ability to open and close business and exceed targets
- Excellent B2B sales and key-account-management skills
- Strong CRM discipline (e.g., Salesforce) and MS Office proficiency
- High-initiative, self-motivated, results-oriented "hunter-inspirer"
- Associate's degree or post-secondary education required; bachelor's preferred
- Customs/trade/logistics industry experience preferred, not required

**Compensation & benefits**

- $155,000 - $170,000 USD base + 30% bonus
- Remote — must reside in the territory
- Full benefits`,
    responsibilities: [
      'Develop strategic territory plans and identify high-potential accounts',
      'Generate new business and introduce customs, trade, and freight solutions',
      'Build new client relationships and conduct needs assessments',
      'Lead RFP responses and negotiate pricing and contract terms',
      'Meet and exceed quarterly and annual sales targets',
    ],
    requirements: [
      '5+ years of related B2B sales / business-development experience',
      'Proven ability to open and close business and exceed targets',
      'Excellent B2B sales and key-account-management skills',
      'Strong CRM (e.g., Salesforce) and MS Office proficiency',
      'Associate’s degree or post-secondary education required; bachelor’s preferred',
    ],
    createdAt: new Date('2026-04-08').toISOString(),
  },
  {
    id: 'bd-exec-trade-toronto',
    ref: 'CG-2026-035',
    title: 'Business Development Executive — Customs & Trade',
    location: 'Toronto, ON (Remote, GTA-based)',
    type: 'Full-time · Remote · Permanent',
    salary: '$100,000 CAD + uncapped commission',
    summary:
      'Remote hunter sales role winning net-new B2B business for a global customs brokerage and trade-services organization. Owns a defined GTA territory: prospecting, needs assessments, RFPs, and closing across customs, trade compliance, and freight solutions. ~25% local travel.',
    description: `A remote, hunter B2B sales role for a global customs brokerage, trade-consulting, and freight-services organization. You'll own a defined local territory — building relationships, presenting solutions, and winning net-new business — with uncapped commission and approximately 25% local travel. Must reside in the Greater Toronto Area.

**What you'll be doing**

- Develop a strategic territory plan and identify high- and medium-potential accounts
- Proactively introduce customs, trade-compliance, and freight solutions to new clients
- Conduct thorough needs assessments and uncover additional opportunities
- Draft RFPs with internal teams and ensure timely delivery
- Negotiate pricing and contract terms; finalize contracts cross-functionally
- Achieve or exceed assigned sales targets and keep CRM current

**What we're looking for**

- 5+ years of related B2B sales experience
- Demonstrated ability to open and close business and exceed targets
- Excellent communication, interpersonal, and key-account skills
- Strong CRM (e.g., Salesforce) and MS Office proficiency
- High-initiative, self-motivated, and results-oriented
- Associate's degree or post-secondary education required; bachelor's preferred

**Compensation & benefits**

- $100,000 CAD base + uncapped monthly commission
- Remote, GTA-based (~25% local travel)
- Full benefits`,
    responsibilities: [
      'Develop a strategic territory plan and identify target accounts',
      'Introduce customs, trade-compliance, and freight solutions to new clients',
      'Conduct needs assessments and uncover opportunities',
      'Draft RFPs and negotiate pricing and contract terms',
      'Achieve or exceed sales targets and maintain CRM discipline',
    ],
    requirements: [
      '5+ years of related B2B sales experience',
      'Demonstrated ability to open and close business and exceed targets',
      'Excellent communication, interpersonal, and key-account skills',
      'Strong CRM (e.g., Salesforce) and MS Office proficiency',
      'Associate’s degree or post-secondary education required; bachelor’s preferred',
    ],
    createdAt: new Date('2026-04-08').toISOString(),
  },
  {
    id: 'bd-exec-trade-northern-la',
    ref: 'CG-2026-038',
    title: 'Business Development Executive — Customs & Trade',
    location: 'Northern Los Angeles, CA (Remote)',
    type: 'Full-time · Remote · Permanent',
    salary: '$100,000 base + uncapped commission',
    summary:
      'Remote hunter sales role winning net-new B2B business for a global customs brokerage and trade-services organization. Owns a defined local territory: prospecting, needs assessments, RFPs, and closing across customs, trade compliance, and freight solutions. ~25% local travel.',
    description: `A remote, hunter B2B sales role for a global customs brokerage, trade-consulting, and freight-services organization. You'll own a defined local territory — building relationships, presenting solutions, and winning net-new business — with uncapped commission and approximately 25% local travel.

**What you'll be doing**

- Develop a strategic territory plan and identify high- and medium-potential accounts
- Proactively introduce customs, trade-compliance, and freight solutions to new clients
- Conduct thorough needs assessments and uncover additional opportunities
- Draft RFPs with internal teams and ensure timely delivery
- Negotiate pricing and contract terms; finalize contracts cross-functionally
- Achieve or exceed assigned sales targets and keep CRM current

**What we're looking for**

- 5+ years of related B2B sales experience
- Demonstrated ability to open and close business and exceed targets
- Excellent communication, interpersonal, and key-account skills
- Strong CRM (e.g., Salesforce) and MS Office proficiency
- High-initiative, self-motivated, and results-oriented
- Associate's degree or post-secondary education required; bachelor's preferred

**Compensation & benefits**

- $100,000 base + uncapped monthly commission
- Remote, territory-based (~25% local travel)
- Full benefits`,
    responsibilities: [
      'Develop a strategic territory plan and identify target accounts',
      'Introduce customs, trade-compliance, and freight solutions to new clients',
      'Conduct needs assessments and uncover opportunities',
      'Draft RFPs and negotiate pricing and contract terms',
      'Achieve or exceed sales targets and maintain CRM discipline',
    ],
    requirements: [
      '5+ years of related B2B sales experience',
      'Demonstrated ability to open and close business and exceed targets',
      'Excellent communication, interpersonal, and key-account skills',
      'Strong CRM (e.g., Salesforce) and MS Office proficiency',
      'Associate’s degree or post-secondary education required; bachelor’s preferred',
    ],
    createdAt: new Date('2026-04-08').toISOString(),
  },
  {
    id: 'it-account-exec-gta',
    ref: 'CG-2026-009',
    title: 'Account Executive — IT Infrastructure (Reseller)',
    location: 'Mississauga, ON',
    type: 'Full-time · Hybrid',
    salary: '$100,000 - $120,000 base + variable',
    summary:
      'Outside IT infrastructure sales for a Canadian reseller expanding its Ontario presence. Three openings: two in the GTA and one covering Northern Ontario (Barrie / Sudbury / Sault Ste. Marie / Timmins).',
    description: `Outside sales role on a growing Ontario team. Three openings: two GTA-based, one covering Northern Ontario (local to Barrie / Sudbury / Sault Ste. Marie / Timmins preferred). Hybrid — Tuesday to Thursday in office, flexible based on territory and ramp-up.

**What you'll be doing**

- Sell IT infrastructure: cloud, data centre, security, networking, Microsoft, Dell server/storage
- Manage existing accounts and drive new business across private and public sector verticals (legal, manufacturing, healthcare, municipal)
- Lead RFP-driven and consultative solution sales; transaction sizes from ~$20K services through multi-million-dollar contracts
- Build deep partner relationships (Cisco, Dell, Microsoft, Arctic Wolf, and others)
- Bring and grow your own book; reps can retain unassigned existing accounts they bring

**What we're looking for**

- 5+ years of IT sales experience in the GTA (or Northern Ontario, for that territory)
- Reseller / VAR background — not OEM direct
- Strong track record of self-built deals, not just RFP responses
- Existing book of business and trusted customer relationships
- Consultative, entrepreneurial, comfortable with long sales cycles and RFP processes

**Compensation & benefits**

- $100,000 - $120,000 base (flexible for strong performers and bridging existing comp)
- Variable comp tied to gross margin: 10% to first 50% of $500K target, 15% to next 50%, 20% above target
- Signing bonus available for the right candidate
- RRSP matching after one year
- Health and dental after three months
- Car allowance negotiable`,
    responsibilities: [
      'Sell IT infrastructure: cloud, data centre, security, networking, Microsoft, Dell server/storage',
      'Drive new business across private and public sector verticals (legal, manufacturing, healthcare, municipal)',
      'Lead RFP-driven and consultative solution sales',
      'Build and maintain partner relationships (Cisco, Dell, Microsoft, Arctic Wolf, others)',
      'Grow your own book of business and retain unassigned accounts you bring',
    ],
    requirements: [
      '5+ years of IT sales experience in the GTA (or Northern Ontario for that territory)',
      'Reseller / VAR background — not OEM direct',
      'Track record of self-built deals, not only RFP responses',
      'Existing book of business and trusted customer relationships',
      'Consultative, entrepreneurial selling style; comfortable with long sales cycles',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bilingual-hr-admin-lachine',
    ref: 'CG-2026-008',
    title: 'Bilingual HR Administrator & Compliance Coordinator',
    location: 'Lachine, QC',
    type: 'Full-time · Onsite · Permanent',
    salary: '$60,000 - $65,000 CAD',
    summary:
      'HR administration and compliance support across Canada and the US for an established logistics organization. Owns HR data in D365, internal SharePoint content, onboarding/offboarding, and H&S compliance tracking. Bilingual French/English required.',
    description: `Provides day-to-day HR administration and compliance support across Canada and the United States. Reports to the HR Manager. Ensures HR activities are accurate, consistent, and executed on time across North American locations.

**What you'll be doing**

- HR administration and compliance support across Canada and the US; consistent application of HR procedures
- Maintain and update employee data in Dynamics 365 (D365); support reporting, audits, and compliance documentation
- Prepare and maintain HR documentation: hiring, terminations, employee letters, SOPs; filing and version control
- Coordinate onboarding and offboarding using established checklists; follow up on completion, update records, coordinate system access
- Own HR content on internal SharePoint sites; maintain accuracy and coordinate company-wide updates
- Support the review, updating, tracking, and communication of HR policies
- Support administrative and compliance activities for Health & Safety across all North American locations; track mandatory training and maintain records
- Provide admin support for HR projects and process updates as assigned

**What we're looking for**

- HR education
- Minimum 1 year of HR administration or coordinator-level experience
- Bilingual French and English — required
- Highly organized; able to meet tight deadlines
- Strong communication and active listening skills
- Comfortable using a variety of systems and platforms (D365 and SharePoint experience an asset)
- Resourceful and flexible; thrives in dynamic environments

**Compensation & benefits**

- $60,000 - $65,000 CAD
- Health, dental, and vision coverage (after 3 months)
- Fitness reimbursement program
- 2 weeks vacation
- Flexible start time (7, 8, or 9am)
- Equal opportunity employer`,
    responsibilities: [
      'Provide HR administration and compliance support across Canada and the US',
      'Maintain and update employee data in Dynamics 365',
      'Prepare and maintain HR documentation (hiring, terminations, employee letters, SOPs)',
      'Coordinate onboarding and offboarding using established checklists',
      'Own HR content on internal SharePoint sites and coordinate company-wide updates',
      'Support review, updating, tracking, and communication of HR policies',
      'Support H&S administrative and compliance activities across all North American locations',
      'Provide admin support for HR projects and process updates as assigned',
    ],
    requirements: [
      'HR education',
      'Minimum 1 year of HR administration or coordinator-level experience',
      'Bilingual French and English — required',
      'Strong organizational skills and ability to meet tight deadlines',
      'Comfortable with a variety of systems and platforms (D365 and SharePoint an asset)',
    ],
    createdAt: new Date('2026-05-12').toISOString(),
  },
  {
    id: 'hs-compliance-manager-us',
    ref: 'CG-2026-007',
    title: 'Health, Safety & Compliance Manager (U.S. Region)',
    location: 'Carlisle, PA or Columbus, OH',
    type: 'Full-time · Onsite · 30% travel',
    salary: '$100,000 - $125,000',
    summary:
      'Newly created, single-contributor role owning health, safety, and regulatory compliance across a multi-site U.S. warehousing and distribution network. Standardizes safety programs while allowing site-specific adaptations; Cal-OSHA experience required for the California site. Open to candidates in Carlisle, PA or Columbus, OH.',
    description: `A newly created Health, Safety & Compliance Manager role owning safety and regulatory compliance across a U.S. network of warehousing, packaging, and distribution sites. Reports to the VP / regional business leader. This is a manager role with no direct reports — the central SME and point of contact for all sites, working through on-site safety champions and partnering with each site's GM, who owns day-to-day safety.

**Locations & travel**

Fully onsite, based in Carlisle, PA or Columbus, OH. Approximately 30% travel for quarterly site visits across the network, with multi-week stints during new-site start-ups. The network spans multiple states including a California site — Cal-OSHA experience is essential.

**What you'll own**

- Design, implement, and continuously improve safety programs across all U.S. sites, allowing for site-specific adaptations
- Ensure compliance with OSHA / Cal-OSHA, DOT, EPA, and applicable federal, state, and local regulations
- Lead site audits, inspections, and compliance reviews; drive corrective action to closure
- Oversee incident investigations, root-cause analysis, and corrective-action implementation
- Develop SOPs, training programs, and safety communications; standardize onboarding safety training
- Conduct risk assessments, job hazard analyses, and ergonomic evaluations
- Serve as the primary safety advisor to operations, HR, engineering, and senior leadership
- Support new-site launches, equipment installs, and process changes with safety expertise
- Track and analyze safety metrics to drive continuous improvement
- Coach and guide site-level safety coordinators / champions

**What we're looking for**

- 5+ years of safety leadership in warehousing, packaging, distribution, or manufacturing
- Experience managing safety programs across multiple locations
- Strong knowledge of OSHA / Cal-OSHA regulations and industry best practices (Cal-OSHA experience required)
- Familiarity with EPA and hazardous-materials regulations
- Demonstrated ability to conduct investigations, risk assessments, and compliance audits
- Bachelor's in Occupational Safety, Environmental Health, Industrial Engineering, or related field (or equivalent experience)
- Excellent communication, facilitation, and relationship-building; able to influence without authority

**Preferred**

- CSP, ASP, CHMM, or OSHA 30/50 certifications
- Experience with automated warehousing / material-handling equipment or packaging lines
- Experience implementing safety management systems (SMS) or continuous-improvement frameworks

**Compensation & benefits**

- $100,000 - $125,000 (no bonus)
- Travel expenses fully covered
- 401(k) match (dollar-for-dollar on the first 3%, 50% on the next 2%)
- 3 weeks PTO
- Benefits effective the first of the month ~30 days after start`,
    responsibilities: [
      'Design, implement, and improve safety programs across all U.S. sites',
      'Ensure compliance with OSHA/Cal-OSHA, DOT, EPA, and federal/state/local regulations',
      'Lead site audits, inspections, and compliance reviews with corrective action to closure',
      'Oversee incident investigations, root-cause analysis, and corrective action',
      'Develop SOPs, training programs, and standardized onboarding safety training',
      'Conduct risk assessments, job hazard analyses, and ergonomic evaluations',
      'Serve as primary safety advisor to operations, HR, engineering, and leadership',
      'Support new-site launches and coach site-level safety champions',
    ],
    requirements: [
      '5+ years of safety leadership in warehousing, packaging, distribution, or manufacturing',
      'Experience managing safety programs across multiple locations',
      'Strong OSHA/Cal-OSHA knowledge — Cal-OSHA experience required',
      'Familiarity with EPA and hazardous-materials regulations',
      'Bachelor’s in Occupational Safety, Environmental Health, or related field (or equivalent)',
      'CSP, ASP, CHMM, or OSHA 30/50 certifications preferred',
    ],
    createdAt: new Date('2026-05-11').toISOString(),
  },
  {
    id: 'bilingual-hr-specialist-lachine',
    ref: 'CG-2026-006',
    title: 'Bilingual HR Recruitment & Operations Specialist',
    location: 'Lachine, QC',
    type: 'Full-time · Onsite',
    salary: '$80,000 - $90,000 CAD',
    summary:
      'Joins the North American HR team of a global freight forwarding and logistics organization. Owns junior and operational recruitment, day-to-day HR support across Canada and the US, and process-improvement initiatives. Bilingual French/English required.',
    description: `Joining the North American HR team of a global freight forwarding and logistics organization based in Lachine, QC. Supports both Canadian and US operations with strong exposure across recruitment, employee relations, HR operations, and process improvement.

**What you'll be doing**

- Manage full-cycle recruitment for junior and operational positions: postings, resume screening, interviews, reference/background checks, offer coordination
- Run onboarding, orientation, and offboarding
- Provide day-to-day HR support to managers and employees across Canada and the US
- Assist with performance management, progressive discipline, investigations, and employee relations
- Support HR reporting and compliance: WSIB, CNESST, workplace accommodations, leaves of absence, and incidents
- Support annual performance reviews, service awards, and HR communications
- Contribute to HR projects and continuous improvement work across office and warehouse operations
- Identify opportunities to improve HR processes through automation, technology, and AI-driven efficiencies

**What we're looking for**

- Bachelor's degree in Human Resources, Industrial Relations, or related field
- 1-3 years of recruitment and/or HR experience
- Bilingual in English and French (written and verbal) — required
- Strong organizational and multitasking skills with high attention to detail
- Professional, adaptable, eager to learn in a fast-paced environment
- General knowledge of Canadian and/or US employment legislation is an asset

**Compensation & benefits**

- $80,000 - $90,000 CAD
- Health and dental benefits
- Tuition reimbursement
- Flexible schedule
- On-site parking
- Paid time off
- Full-time, onsite in Lachine`,
    responsibilities: [
      'Manage full-cycle recruitment for junior and operational positions',
      'Run onboarding, orientation, and offboarding',
      'Provide day-to-day HR support to managers and employees in Canada and the US',
      'Assist with performance management, progressive discipline, investigations, and ER matters',
      'Support WSIB, CNESST, workplace accommodations, leaves, and incident reporting',
      'Support annual performance reviews, service awards, and HR communications',
      'Contribute to HR projects and continuous improvement initiatives',
      'Identify HR process improvements through automation, technology, and AI tools',
    ],
    requirements: [
      "Bachelor's degree in Human Resources, Industrial Relations, or related field",
      '1-3 years of recruitment and/or HR experience',
      'Bilingual in English and French (written and verbal) — required',
      'Strong organizational and multitasking skills, high attention to detail',
      'General knowledge of Canadian and/or US employment legislation is an asset',
    ],
    createdAt: new Date('2026-05-19').toISOString(),
  },
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
    id: 'sales-coordinator-hamilton',
    ref: 'CG-2026-003',
    title: 'Sales Coordinator',
    location: 'Hamilton, ON',
    type: 'Full-time · Onsite',
    salary: '$55,000 - $65,000 CAD',
    summary:
      'Coordinator role supporting the sales team of an established organization. Manages pipeline data, CRM, proposals, and client communication end-to-end.',
    description: `Working with an established and growing organization. The Sales Coordinator joins the sales team to support pipeline management, client communication, and deal coordination across a high-volume slate of active opportunities. Strong long-term growth and mentorship environment.

**What you'll be doing**

- Support the sales team across the full cycle, from lead intake to close
- Maintain CRM data, pipeline hygiene, and sales reporting
- Prepare quotes, proposals, and contract documentation
- Serve as a point of contact between clients, sales reps, and internal teams
- Track opportunities, milestones, and follow-ups in CRM and Excel
- Coordinate meetings, demos, and client communications
- Support order processing and hand-off to delivery teams
- Handle high volumes of email, phone, and Teams communication

**What we're looking for**

- Experience in sales support, inside sales, or coordination (B2B an asset)
- Strong organizational and multitasking skills; able to manage competing priorities
- High attention to detail and problem-solving ability
- Professional written and verbal communication
- Customer-focused, proactive mindset
- Comfortable with CRM tools in a fast-paced, team-oriented environment

**Compensation & benefits**

- $55,000 - $65,000 CAD
- Medical, dental, vision, disability, and life insurance
- Paid vacation plus additional personal time
- On-site parking
- Training, mentorship, and long-term growth opportunities
- Full-time, permanent, onsite in Hamilton`,
    responsibilities: [
      'Support the sales team across the full cycle, from lead intake to close',
      'Maintain CRM data, pipeline hygiene, and sales reporting',
      'Prepare quotes, proposals, and contract documentation',
      'Serve as a point of contact between clients, sales reps, and internal teams',
      'Track opportunities, milestones, and follow-ups in CRM and Excel',
      'Coordinate meetings, demos, and client communications',
      'Support order processing and hand-off to delivery teams',
    ],
    requirements: [
      'Experience in sales support, inside sales, or coordination (B2B an asset)',
      'Strong organizational and multitasking skills',
      'High attention to detail and problem-solving ability',
      'Professional written and verbal communication',
      'Customer-focused, proactive mindset',
      'Comfortable with CRM tools in a fast-paced, team-oriented environment',
    ],
    createdAt: new Date('2026-03-31').toISOString(),
  },
  {
    id: 'ap-specialist-sarnia',
    ref: 'CG-2026-002',
    title: 'Accounts Payable Specialist',
    location: 'Sarnia, ON',
    type: 'Full-time · Onsite',
    salary: '$50,000 - $60,000 CAD',
    summary:
      'Full-cycle accounts payable supporting the accounting team — invoice processing, payment runs, and vendor reconciliation. Open to candidates in Sarnia, Windsor, or Mississauga.',
    description: `Reporting to the Accounting Manager. The Accounts Payable Specialist handles full-cycle AP — verifying and coding invoices, entering them into the accounting system, processing payment runs, and reconciling vendor statements. The role coordinates with vendors and works closely with the internal finance and procurement teams.

**Locations**

Open to candidates in Sarnia (preferred), Windsor, or Mississauga, ON. Full-time onsite, Monday to Friday, day shift.

**What you'll do**

- Verify, code, and enter vendor invoices into the accounting system
- Process weekly payment runs (EFT, cheque, wire) and resolve discrepancies
- Reconcile vendor statements and maintain accurate AP records
- Manage expense reports and corporate card reconciliations
- Support month-end close, accruals, and AP reporting
- Coordinate with vendors and internal finance/procurement teams

**What we're looking for**

- Minimum 1 year of accounts payable or accounting experience
- Working knowledge of full-cycle AP and general accounting
- Experience with an ERP/accounting system (Sage, Dynamics, NetSuite)
- Strong data entry, accuracy, and attention to detail
- Proficiency with Excel
- Candidates must be based in Canada

**Compensation & benefits**

- $50,000 - $60,000 CAD
- Comprehensive health and dental
- Equal opportunity employer`,
    responsibilities: [
      'Verify, code, and enter vendor invoices into the accounting system',
      'Process weekly payment runs (EFT, cheque, wire) and resolve discrepancies',
      'Reconcile vendor statements and maintain accurate AP records',
      'Manage expense reports and corporate card reconciliations',
      'Support month-end close, accruals, and AP reporting',
      'Coordinate with vendors and internal finance/procurement teams',
    ],
    requirements: [
      'Minimum 1 year of accounts payable or accounting experience',
      'Working knowledge of full-cycle AP and general accounting',
      'Experience with an ERP/accounting system (Sage, Dynamics, NetSuite)',
      'Strong data entry, accuracy, and attention to detail',
      'Proficiency with Excel',
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
    salary: '$120,000 - $140,000 + up to 10% bonus',
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

- $120,000 - $140,000 base + up to 10% bonus
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
    createdAt: new Date('2026-04-17').toISOString(),
  },

  // ── Logistics / freight sales (general mandates, multiple markets) ───────
  {
    id: 'logistics-sales-miami',
    ref: 'CG-2026-040',
    title: 'Logistics Sales Executive',
    location: 'Miami, FL',
    type: 'Full-time · Hybrid · Permanent',
    salary: '$80,000 - $120,000 base + uncapped commission',
    summary:
      'Hunter sales role for a growing logistics and freight-services organization — selling 3PL and managed transportation solutions (truckload, LTL, intermodal, cross-border) to shippers across the territory. Net-new business development with uncapped commission.',
    description: `A hunter sales role for a growing logistics and freight-services organization. You'll own a local territory end-to-end — prospecting shippers, building relationships, and closing net-new business across truckload, LTL, intermodal, cross-border, and managed transportation solutions. Uncapped commission and strong growth potential.

**What you'll be doing**

- Prospect and develop net-new business with shippers across your territory
- Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation
- Own the full sales cycle — prospecting, discovery, pricing, proposal, and close
- Build and grow a book of business and long-term shipper relationships
- Partner with operations, pricing, and carrier teams to win and retain freight
- Maintain disciplined pipeline management and CRM hygiene

**What we're looking for**

- B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation
- Hunter mentality with a track record of opening and closing new accounts
- Strong prospecting, relationship-building, and negotiation skills
- Comfortable owning a quota and a territory in a fast-paced environment
- CRM discipline (e.g., Salesforce) and strong communication
- An existing book of shipper relationships is a plus

**Compensation & benefits**

- $80,000 - $120,000 base + uncapped commission
- Health and dental benefits
- Career growth in a fast-growing logistics organization`,
    responsibilities: [
      'Prospect and develop net-new business with shippers across your territory',
      'Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation',
      'Own the full sales cycle from prospecting through pricing, proposal, and close',
      'Build and grow a book of business and long-term shipper relationships',
      'Partner with operations, pricing, and carrier teams to win and retain freight',
      'Maintain disciplined pipeline management and CRM hygiene',
    ],
    requirements: [
      'B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation',
      'Hunter mentality with a track record of opening and closing new accounts',
      'Strong prospecting, relationship-building, and negotiation skills',
      'Comfortable owning a quota and a territory in a fast-paced environment',
      'CRM discipline (e.g., Salesforce) and strong communication',
      'An existing book of shipper relationships is a plus',
    ],
    createdAt: new Date('2026-03-22').toISOString(),
  },
  {
    id: 'logistics-sales-tampa',
    ref: 'CG-2026-041',
    title: 'Logistics Sales Executive',
    location: 'Tampa, FL',
    type: 'Full-time · Hybrid · Permanent',
    salary: '$80,000 - $120,000 base + uncapped commission',
    summary:
      'Hunter sales role for a growing logistics and freight-services organization — selling 3PL and managed transportation solutions (truckload, LTL, intermodal, cross-border) to shippers across the territory. Net-new business development with uncapped commission.',
    description: `A hunter sales role for a growing logistics and freight-services organization. You'll own a local territory end-to-end — prospecting shippers, building relationships, and closing net-new business across truckload, LTL, intermodal, cross-border, and managed transportation solutions. Uncapped commission and strong growth potential.

**What you'll be doing**

- Prospect and develop net-new business with shippers across your territory
- Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation
- Own the full sales cycle — prospecting, discovery, pricing, proposal, and close
- Build and grow a book of business and long-term shipper relationships
- Partner with operations, pricing, and carrier teams to win and retain freight
- Maintain disciplined pipeline management and CRM hygiene

**What we're looking for**

- B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation
- Hunter mentality with a track record of opening and closing new accounts
- Strong prospecting, relationship-building, and negotiation skills
- Comfortable owning a quota and a territory in a fast-paced environment
- CRM discipline (e.g., Salesforce) and strong communication
- An existing book of shipper relationships is a plus

**Compensation & benefits**

- $80,000 - $120,000 base + uncapped commission
- Health and dental benefits
- Career growth in a fast-growing logistics organization`,
    responsibilities: [
      'Prospect and develop net-new business with shippers across your territory',
      'Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation',
      'Own the full sales cycle from prospecting through pricing, proposal, and close',
      'Build and grow a book of business and long-term shipper relationships',
      'Partner with operations, pricing, and carrier teams to win and retain freight',
      'Maintain disciplined pipeline management and CRM hygiene',
    ],
    requirements: [
      'B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation',
      'Hunter mentality with a track record of opening and closing new accounts',
      'Strong prospecting, relationship-building, and negotiation skills',
      'Comfortable owning a quota and a territory in a fast-paced environment',
      'CRM discipline (e.g., Salesforce) and strong communication',
      'An existing book of shipper relationships is a plus',
    ],
    createdAt: new Date('2026-03-22').toISOString(),
  },
  {
    id: 'logistics-sales-chattanooga',
    ref: 'CG-2026-042',
    title: 'Logistics Sales Executive',
    location: 'Chattanooga, TN',
    type: 'Full-time · Hybrid · Permanent',
    salary: '$80,000 - $120,000 base + uncapped commission',
    summary:
      'Hunter sales role for a growing logistics and freight-services organization — selling 3PL and managed transportation solutions (truckload, LTL, intermodal, cross-border) to shippers across the territory. Net-new business development with uncapped commission.',
    description: `A hunter sales role for a growing logistics and freight-services organization. You'll own a local territory end-to-end — prospecting shippers, building relationships, and closing net-new business across truckload, LTL, intermodal, cross-border, and managed transportation solutions. Uncapped commission and strong growth potential.

**What you'll be doing**

- Prospect and develop net-new business with shippers across your territory
- Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation
- Own the full sales cycle — prospecting, discovery, pricing, proposal, and close
- Build and grow a book of business and long-term shipper relationships
- Partner with operations, pricing, and carrier teams to win and retain freight
- Maintain disciplined pipeline management and CRM hygiene

**What we're looking for**

- B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation
- Hunter mentality with a track record of opening and closing new accounts
- Strong prospecting, relationship-building, and negotiation skills
- Comfortable owning a quota and a territory in a fast-paced environment
- CRM discipline (e.g., Salesforce) and strong communication
- An existing book of shipper relationships is a plus

**Compensation & benefits**

- $80,000 - $120,000 base + uncapped commission
- Health and dental benefits
- Career growth in a fast-growing logistics organization`,
    responsibilities: [
      'Prospect and develop net-new business with shippers across your territory',
      'Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation',
      'Own the full sales cycle from prospecting through pricing, proposal, and close',
      'Build and grow a book of business and long-term shipper relationships',
      'Partner with operations, pricing, and carrier teams to win and retain freight',
      'Maintain disciplined pipeline management and CRM hygiene',
    ],
    requirements: [
      'B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation',
      'Hunter mentality with a track record of opening and closing new accounts',
      'Strong prospecting, relationship-building, and negotiation skills',
      'Comfortable owning a quota and a territory in a fast-paced environment',
      'CRM discipline (e.g., Salesforce) and strong communication',
      'An existing book of shipper relationships is a plus',
    ],
    createdAt: new Date('2026-03-22').toISOString(),
  },
  {
    id: 'logistics-sales-chicago',
    ref: 'CG-2026-043',
    title: 'Logistics Sales Executive',
    location: 'Chicago, IL',
    type: 'Full-time · Hybrid · Permanent',
    salary: '$80,000 - $120,000 base + uncapped commission',
    summary:
      'Hunter sales role for a growing logistics and freight-services organization — selling 3PL and managed transportation solutions (truckload, LTL, intermodal, cross-border) to shippers across the territory. Net-new business development with uncapped commission.',
    description: `A hunter sales role for a growing logistics and freight-services organization. You'll own a local territory end-to-end — prospecting shippers, building relationships, and closing net-new business across truckload, LTL, intermodal, cross-border, and managed transportation solutions. Uncapped commission and strong growth potential.

**What you'll be doing**

- Prospect and develop net-new business with shippers across your territory
- Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation
- Own the full sales cycle — prospecting, discovery, pricing, proposal, and close
- Build and grow a book of business and long-term shipper relationships
- Partner with operations, pricing, and carrier teams to win and retain freight
- Maintain disciplined pipeline management and CRM hygiene

**What we're looking for**

- B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation
- Hunter mentality with a track record of opening and closing new accounts
- Strong prospecting, relationship-building, and negotiation skills
- Comfortable owning a quota and a territory in a fast-paced environment
- CRM discipline (e.g., Salesforce) and strong communication
- An existing book of shipper relationships is a plus

**Compensation & benefits**

- $80,000 - $120,000 base + uncapped commission
- Health and dental benefits
- Career growth in a fast-growing logistics organization`,
    responsibilities: [
      'Prospect and develop net-new business with shippers across your territory',
      'Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation',
      'Own the full sales cycle from prospecting through pricing, proposal, and close',
      'Build and grow a book of business and long-term shipper relationships',
      'Partner with operations, pricing, and carrier teams to win and retain freight',
      'Maintain disciplined pipeline management and CRM hygiene',
    ],
    requirements: [
      'B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation',
      'Hunter mentality with a track record of opening and closing new accounts',
      'Strong prospecting, relationship-building, and negotiation skills',
      'Comfortable owning a quota and a territory in a fast-paced environment',
      'CRM discipline (e.g., Salesforce) and strong communication',
      'An existing book of shipper relationships is a plus',
    ],
    createdAt: new Date('2026-03-22').toISOString(),
  },
  {
    id: 'logistics-sales-new-york',
    ref: 'CG-2026-044',
    title: 'Logistics Sales Executive',
    location: 'New York, NY',
    type: 'Full-time · Hybrid · Permanent',
    salary: '$80,000 - $120,000 base + uncapped commission',
    summary:
      'Hunter sales role for a growing logistics and freight-services organization — selling 3PL and managed transportation solutions (truckload, LTL, intermodal, cross-border) to shippers across the territory. Net-new business development with uncapped commission.',
    description: `A hunter sales role for a growing logistics and freight-services organization. You'll own a local territory end-to-end — prospecting shippers, building relationships, and closing net-new business across truckload, LTL, intermodal, cross-border, and managed transportation solutions. Uncapped commission and strong growth potential.

**What you'll be doing**

- Prospect and develop net-new business with shippers across your territory
- Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation
- Own the full sales cycle — prospecting, discovery, pricing, proposal, and close
- Build and grow a book of business and long-term shipper relationships
- Partner with operations, pricing, and carrier teams to win and retain freight
- Maintain disciplined pipeline management and CRM hygiene

**What we're looking for**

- B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation
- Hunter mentality with a track record of opening and closing new accounts
- Strong prospecting, relationship-building, and negotiation skills
- Comfortable owning a quota and a territory in a fast-paced environment
- CRM discipline (e.g., Salesforce) and strong communication
- An existing book of shipper relationships is a plus

**Compensation & benefits**

- $80,000 - $120,000 base + uncapped commission
- Health and dental benefits
- Career growth in a fast-growing logistics organization`,
    responsibilities: [
      'Prospect and develop net-new business with shippers across your territory',
      'Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation',
      'Own the full sales cycle from prospecting through pricing, proposal, and close',
      'Build and grow a book of business and long-term shipper relationships',
      'Partner with operations, pricing, and carrier teams to win and retain freight',
      'Maintain disciplined pipeline management and CRM hygiene',
    ],
    requirements: [
      'B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation',
      'Hunter mentality with a track record of opening and closing new accounts',
      'Strong prospecting, relationship-building, and negotiation skills',
      'Comfortable owning a quota and a territory in a fast-paced environment',
      'CRM discipline (e.g., Salesforce) and strong communication',
      'An existing book of shipper relationships is a plus',
    ],
    createdAt: new Date('2026-03-22').toISOString(),
  },
  {
    id: 'logistics-sales-us-remote',
    ref: 'CG-2026-045',
    title: 'Logistics Sales Executive',
    location: 'Remote (US)',
    type: 'Full-time · Remote · Permanent',
    salary: '$80,000 - $120,000 base + uncapped commission',
    summary:
      'Remote hunter sales role for a growing logistics and freight-services organization — selling 3PL and managed transportation solutions (truckload, LTL, intermodal, cross-border) to shippers across a national US territory. Uncapped commission.',
    description: `A remote, hunter sales role for a growing logistics and freight-services organization. You'll own a national US territory end-to-end — prospecting shippers, building relationships, and closing net-new business across truckload, LTL, intermodal, cross-border, and managed transportation solutions. Uncapped commission and strong growth potential.

**What you'll be doing**

- Prospect and develop net-new business with shippers across your territory
- Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation
- Own the full sales cycle — prospecting, discovery, pricing, proposal, and close
- Build and grow a book of business and long-term shipper relationships
- Partner with operations, pricing, and carrier teams to win and retain freight
- Maintain disciplined pipeline management and CRM hygiene

**What we're looking for**

- B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation
- Hunter mentality with a track record of opening and closing new accounts
- Strong prospecting, relationship-building, and negotiation skills
- Comfortable owning a quota and a territory in a fast-paced environment
- CRM discipline (e.g., Salesforce) and strong communication
- An existing book of shipper relationships is a plus

**Compensation & benefits**

- $80,000 - $120,000 base + uncapped commission
- Health and dental benefits
- Career growth in a fast-growing logistics organization`,
    responsibilities: [
      'Prospect and develop net-new business with shippers across a national territory',
      'Sell 3PL and freight solutions: truckload, LTL, intermodal, cross-border, and managed transportation',
      'Own the full sales cycle from prospecting through pricing, proposal, and close',
      'Build and grow a book of business and long-term shipper relationships',
      'Partner with operations, pricing, and carrier teams to win and retain freight',
      'Maintain disciplined pipeline management and CRM hygiene',
    ],
    requirements: [
      'B2B sales experience, ideally in freight, logistics, 3PL, brokerage, or transportation',
      'Hunter mentality with a track record of opening and closing new accounts',
      'Strong prospecting, relationship-building, and negotiation skills',
      'Comfortable owning a quota and a national territory in a fast-paced environment',
      'CRM discipline (e.g., Salesforce) and strong communication',
      'An existing book of shipper relationships is a plus',
    ],
    createdAt: new Date('2026-04-20').toISOString(),
  },

  // ── Phantom / pipeline placeholder roles (demo) ──────────────────────────
  {
    id: 'controller-calgary',
    ref: 'CG-2026-010',
    title: 'Controller',
    location: 'Calgary, AB',
    type: 'Full-time · Hybrid',
    salary: '$110,000 - $130,000 CAD',
    summary:
      'Lead the accounting function for a growing Alberta organization — full-cycle accounting, month-end close, and financial reporting.',
    description: `An established and growing Calgary organization is adding a Controller to lead its accounting function. Reports to the VP of Finance and partners closely with operations leadership. Owns the full accounting cycle, financial reporting, and the systems and controls behind them.

**What you'll own**

- Full-cycle accounting and a timely, accurate month-end close
- Monthly financial statements and management reporting packages
- Budgeting, forecasting, and cash-flow management
- Internal controls, accounting policies, and process improvement
- The annual external audit and relationships with auditors and tax advisors
- Mentoring and developing a small accounting team

**What we're looking for**

- CPA designation with 5+ years of progressive accounting experience
- Strong technical knowledge of ASPE/IFRS and internal controls
- Proven experience owning month-end close in a mid-sized organization
- Advanced Excel; experience with a mid-market ERP
- High attention to detail and a continuous-improvement mindset
- Clear communicator able to partner across departments

**Compensation & benefits**

- $110,000 - $130,000 CAD
- Performance bonus
- Health, dental, and vision coverage
- RRSP matching
- Hybrid schedule (3 days in office)`,
    responsibilities: [
      'Own full-cycle accounting and a timely, accurate month-end close',
      'Prepare monthly financial statements and management reporting packages',
      'Lead budgeting, forecasting, and cash-flow management',
      'Maintain internal controls, accounting policies, and process improvements',
      'Manage the annual external audit and auditor/tax-advisor relationships',
      'Mentor and develop a small accounting team',
    ],
    requirements: [
      'CPA designation with 5+ years of progressive accounting experience',
      'Strong knowledge of ASPE/IFRS and internal controls',
      'Proven experience owning month-end close in a mid-sized organization',
      'Advanced Excel and mid-market ERP experience',
      'High attention to detail and a continuous-improvement mindset',
    ],
    createdAt: new Date('2026-06-09').toISOString(),
  },
  {
    id: 'director-sales-vancouver',
    ref: 'CG-2026-011',
    title: 'Director of Sales',
    location: 'Vancouver, BC',
    type: 'Full-time · Hybrid',
    salary: '$130,000 - $155,000 CAD',
    summary:
      'Own sales strategy, pipeline, and team leadership for a growing organization across the West Coast and Western Canada.',
    description: `A growing organization is hiring a Director of Sales to own revenue strategy and lead its West Coast sales team. Reports to the VP of Sales / GM and is responsible for pipeline, forecasting, key accounts, and building a high-performing sales organization.

**What you'll own**

- Regional sales strategy, targets, and revenue growth
- Pipeline development, forecasting, and CRM discipline
- Leading, coaching, and developing a team of account executives
- Key account relationships and strategic/enterprise deals
- Go-to-market, pricing, and territory planning with leadership
- Sales process, enablement, and performance metrics

**What we're looking for**

- 8+ years in B2B sales with progressive leadership responsibility
- Proven track record exceeding revenue targets and building pipeline
- Experience hiring, coaching, and leading sales teams
- Strong consultative and enterprise/strategic selling skills
- Excellent forecasting and CRM (e.g., Salesforce) discipline
- Comfortable owning a number in a fast-paced environment

**Compensation & benefits**

- $130,000 - $155,000 CAD base + commission/variable
- Performance bonus
- Extended health, dental, and vision
- RRSP matching
- Hybrid schedule`,
    responsibilities: [
      'Own regional sales strategy, targets, and revenue growth',
      'Drive pipeline development, forecasting, and CRM discipline',
      'Lead, coach, and develop a team of account executives',
      'Own key account relationships and strategic/enterprise deals',
      'Partner with leadership on go-to-market, pricing, and territory planning',
      'Own sales process, enablement, and performance metrics',
    ],
    requirements: [
      '8+ years in B2B sales with progressive leadership responsibility',
      'Proven track record exceeding revenue targets and building pipeline',
      'Experience hiring, coaching, and leading sales teams',
      'Strong consultative and enterprise/strategic selling skills',
      'Excellent forecasting and CRM (e.g., Salesforce) discipline',
    ],
    createdAt: new Date('2026-06-08').toISOString(),
  },
  {
    id: 'vp-finance-seattle',
    ref: 'CG-2026-012',
    title: 'VP of Finance',
    location: 'Seattle, WA',
    type: 'Full-time · Onsite',
    salary: '$180,000 - $220,000 + bonus',
    summary:
      'Senior finance leadership seat owning FP&A, accounting, and strategic finance for a scaling Pacific Northwest company.',
    description: `A scaling Pacific Northwest company is hiring a VP of Finance to lead FP&A, accounting, and strategic finance. Reports to the CFO and partners with the executive team on planning, performance, and capital allocation.

**What you'll own**

- FP&A, financial reporting, and strategic finance across the business
- Annual planning, forecasting, and long-range financial modeling
- Partnering with the executive team on capital allocation and growth
- Scalable finance processes, systems, and controls
- Board and investor reporting in partnership with the CFO
- Leading and developing the finance and accounting team

**What we're looking for**

- 10+ years of progressive finance leadership experience
- CPA and/or MBA preferred
- Strong FP&A, modeling, and strategic-finance background
- Experience scaling finance functions in growth environments
- Excellent business partnering and communication skills
- Comfortable operating with both detail and executive altitude

**Compensation & benefits**

- $180,000 - $220,000 + bonus
- Equity participation
- Full medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own FP&A, financial reporting, and strategic finance',
      'Lead annual planning, forecasting, and long-range modeling',
      'Partner with the executive team on capital allocation and growth',
      'Build scalable finance processes, systems, and controls',
      'Support board and investor reporting alongside the CFO',
      'Lead and develop the finance and accounting team',
    ],
    requirements: [
      '10+ years of progressive finance leadership experience',
      'CPA and/or MBA preferred',
      'Strong FP&A, modeling, and strategic-finance background',
      'Experience scaling finance functions in growth environments',
      'Excellent business partnering and communication skills',
    ],
    createdAt: new Date('2026-06-07').toISOString(),
  },
  {
    id: 'hr-business-partner-winnipeg',
    ref: 'CG-2026-013',
    title: 'HR Business Partner',
    location: 'Winnipeg, MB',
    type: 'Full-time · Onsite',
    salary: '$80,000 - $95,000 CAD',
    summary:
      'Partner with business leaders on employee relations, talent, and HR strategy across a Manitoba operation.',
    description: `A Manitoba operation is adding an HR Business Partner to support its leaders and employees. Reports to the HR Manager and acts as the trusted, day-to-day HR partner across employee relations, talent, performance, and engagement.

**What you'll be doing**

- Advise people leaders on employee relations, performance, and engagement
- Support full-cycle talent: recruitment, onboarding, and workforce planning
- Coach managers through performance management and progressive discipline
- Run HR programs (reviews, engagement, recognition) and communications
- Maintain HR records and ensure compliance with employment standards
- Partner on HR projects and continuous-improvement initiatives

**What we're looking for**

- 5+ years as an HRBP or HR generalist with leadership-facing experience
- Working knowledge of Canadian employment legislation
- Strong employee-relations and coaching skills
- Highly organized; able to manage multiple priorities
- Discreet and professional with sensitive information
- CPHR designation (or working toward it) an asset

**Compensation & benefits**

- $80,000 - $95,000 CAD
- Health and dental benefits
- RRSP matching
- Paid time off
- On-site, Monday to Friday`,
    responsibilities: [
      'Advise people leaders on employee relations, performance, and engagement',
      'Support full-cycle talent, onboarding, and workforce planning',
      'Coach managers through performance management and progressive discipline',
      'Run HR programs and communications (reviews, engagement, recognition)',
      'Maintain HR records and ensure compliance with employment standards',
      'Contribute to HR projects and continuous-improvement initiatives',
    ],
    requirements: [
      '5+ years as an HRBP or generalist with leadership-facing experience',
      'Working knowledge of Canadian employment legislation',
      'Strong employee-relations and coaching skills',
      'Highly organized and discreet with sensitive information',
      'CPHR designation (or working toward it) an asset',
    ],
    createdAt: new Date('2026-06-06').toISOString(),
  },
  {
    id: 'cfo-nyc',
    ref: 'CG-2026-014',
    title: 'Chief Financial Officer',
    location: 'New York, NY',
    type: 'Full-time · Hybrid',
    salary: '$250,000 - $300,000 + equity',
    summary:
      'Executive finance leader to own strategy, capital, and reporting for a high-growth New York organization.',
    description: `A high-growth New York organization is hiring a Chief Financial Officer as its senior-most finance executive. Reports to the CEO and partners with the board on strategy, capital structure, and growth. Leads the entire finance organization.

**What you'll own**

- Financial strategy, capital allocation, and capital structure
- Finance, accounting, FP&A, treasury, and tax across the organization
- Fundraising, investor relations, and board reporting
- Long-range planning, forecasting, and operating performance
- M&A evaluation, diligence, and integration
- Building, scaling, and developing the finance leadership team

**What we're looking for**

- 15+ years of finance leadership, including CFO or VP Finance roles
- CPA and/or MBA
- Experience with fundraising, investor relations, and board reporting
- Track record scaling finance in high-growth companies
- Strong M&A and capital-markets exposure
- Executive presence and a strategic, hands-on operating style

**Compensation & benefits**

- $250,000 - $300,000 + equity
- Executive bonus plan
- Full medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own financial strategy, capital allocation, and capital structure',
      'Lead finance, accounting, FP&A, treasury, and tax across the organization',
      'Drive fundraising, investor relations, and board reporting',
      'Own long-range planning, forecasting, and operating performance',
      'Lead M&A evaluation, diligence, and integration',
      'Build, scale, and develop the finance leadership team',
    ],
    requirements: [
      '15+ years of finance leadership, including CFO or VP Finance roles',
      'CPA and/or MBA',
      'Experience with fundraising, investor relations, and board reporting',
      'Track record scaling finance in high-growth companies',
      'Strong M&A and capital-markets exposure',
    ],
    createdAt: new Date('2026-06-05').toISOString(),
  },
  {
    id: 'fpa-manager-alpharetta',
    ref: 'CG-2026-015',
    title: 'FP&A Manager',
    location: 'Alpharetta, GA',
    type: 'Full-time · Hybrid',
    salary: '$120,000 - $140,000',
    summary:
      'Own financial planning, budgeting, and analysis for a growing organization in metro Atlanta.',
    description: `A growing organization in metro Atlanta is hiring an FP&A Manager to own its planning and analysis function. Reports to the Director of Finance and partners with operational leaders to drive budgeting, forecasting, and performance.

**What you'll be doing**

- Lead annual budgeting, reforecasting, and the monthly forecast cycle
- Own variance analysis and management reporting against plan
- Build and maintain financial models, dashboards, and KPIs
- Partner with department leaders on their budgets and performance
- Support capital planning, ROI analysis, and ad-hoc decision support
- Improve planning processes, tools, and reporting automation

**What we're looking for**

- 6+ years in FP&A or corporate finance
- Advanced Excel and financial-modeling skills
- Experience with BI tools (Power BI, Tableau) and ERP data
- Strong business partnering and communication skills
- Detail-oriented with the ability to tell the story behind the numbers
- CPA/CFA/MBA preferred

**Compensation & benefits**

- $120,000 - $140,000
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Lead annual budgeting, reforecasting, and the monthly forecast cycle',
      'Own variance analysis and management reporting against plan',
      'Build and maintain financial models, dashboards, and KPIs',
      'Partner with department leaders on budgets and performance',
      'Support capital planning, ROI analysis, and decision support',
      'Improve planning processes, tools, and reporting automation',
    ],
    requirements: [
      '6+ years in FP&A or corporate finance',
      'Advanced Excel and financial-modeling skills',
      'Experience with BI tools (Power BI, Tableau) and ERP data',
      'Strong business partnering and communication skills',
      'CPA/CFA/MBA preferred',
    ],
    createdAt: new Date('2026-06-04').toISOString(),
  },
  {
    id: 'director-hr-tampa',
    ref: 'CG-2026-016',
    title: 'Director of Human Resources',
    location: 'Tampa, FL',
    type: 'Full-time · Onsite',
    salary: '$130,000 - $150,000',
    summary:
      'Lead the HR function — talent, employee relations, total rewards, and culture — for a Florida-based organization.',
    description: `A Florida-based organization is hiring a Director of Human Resources to lead its people function. Reports to the COO/President and owns HR strategy and operations across talent, employee relations, total rewards, and culture.

**What you'll own**

- HR strategy and operations across the organization
- Full-cycle talent acquisition, onboarding, and workforce planning
- Employee relations, investigations, and performance management
- Total rewards: compensation, benefits, and recognition programs
- HR compliance, policy, and HRIS ownership
- Building, developing, and leading the HR team

**What we're looking for**

- 10+ years of progressive HR experience, including leadership
- Strong knowledge of US federal and state employment law
- Proven experience building HR programs and teams
- Strong employee-relations and business-partnering skills
- Comfortable operating both strategically and hands-on
- SHRM-CP/SHRM-SCP or PHR/SPHR preferred

**Compensation & benefits**

- $130,000 - $150,000
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- On-site`,
    responsibilities: [
      'Own HR strategy and operations across the organization',
      'Lead full-cycle talent acquisition, onboarding, and workforce planning',
      'Manage employee relations, investigations, and performance management',
      'Own total rewards: compensation, benefits, and recognition programs',
      'Ensure HR compliance and own policy and HRIS',
      'Build, develop, and lead the HR team',
    ],
    requirements: [
      '10+ years of progressive HR experience, including leadership',
      'Strong knowledge of US federal and state employment law',
      'Proven experience building HR programs and teams',
      'Strong employee-relations and business-partnering skills',
      'SHRM-CP/SHRM-SCP or PHR/SPHR preferred',
    ],
    createdAt: new Date('2026-06-03').toISOString(),
  },
  {
    id: 'regional-sales-manager-chattanooga',
    ref: 'CG-2026-017',
    title: 'Regional Sales Manager',
    location: 'Chattanooga, TN',
    type: 'Full-time · Onsite',
    salary: '$95,000 - $115,000',
    summary:
      'Drive regional revenue, manage key accounts, and develop new business across the Southeast for a growing organization.',
    description: `A growing organization is hiring a Regional Sales Manager to drive revenue across the Southeast from its Chattanooga base. Reports to the Director of Sales and owns the regional pipeline, key accounts, and new-business development.

**What you'll be doing**

- Own the regional sales target and drive new-business development
- Manage and grow a portfolio of key accounts
- Build and maintain a healthy pipeline with disciplined CRM use
- Run the full sales cycle from prospecting through close
- Partner with marketing and operations on territory and delivery
- Provide accurate forecasting and reporting to leadership

**What we're looking for**

- 5+ years of B2B sales experience with a track record of hitting quota
- Experience managing key accounts and developing new business
- Strong consultative selling and negotiation skills
- Disciplined pipeline management and CRM (e.g., Salesforce) use
- Self-motivated, hands-on, and comfortable owning a number
- Willingness to travel within the region

**Compensation & benefits**

- $95,000 - $115,000 base + commission
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- Onsite + regional travel`,
    responsibilities: [
      'Own the regional sales target and drive new-business development',
      'Manage and grow a portfolio of key accounts',
      'Build and maintain a healthy pipeline with disciplined CRM use',
      'Run the full sales cycle from prospecting through close',
      'Partner with marketing and operations on territory and delivery',
      'Provide accurate forecasting and reporting to leadership',
    ],
    requirements: [
      '5+ years of B2B sales experience with a track record of hitting quota',
      'Experience managing key accounts and developing new business',
      'Strong consultative selling and negotiation skills',
      'Disciplined pipeline management and CRM (e.g., Salesforce) use',
      'Willingness to travel within the region',
    ],
    createdAt: new Date('2026-06-02').toISOString(),
  },
  {
    id: 'finance-manager-buffalo',
    ref: 'CG-2026-018',
    title: 'Finance Manager',
    location: 'Buffalo, NY',
    type: 'Full-time · Hybrid',
    salary: '$100,000 - $120,000',
    summary:
      'Own accounting operations, reporting, and analysis for an established organization in Western New York.',
    description: `An established Western New York organization is hiring a Finance Manager to lead day-to-day finance and accounting operations, reporting, and analysis. Reports to the Controller / VP Finance.

**What you'll be doing**

- Manage month-end close, journal entries, and reconciliations
- Prepare monthly financial statements and management reporting
- Support budgeting, forecasting, and financial analysis
- Oversee AP/AR, billing, and cash management
- Maintain internal controls and support the annual audit
- Supervise and develop a small accounting team

**What we're looking for**

- 6+ years of progressive accounting/finance experience
- Strong US GAAP and financial-reporting knowledge
- Experience managing month-end close and a small team
- Advanced Excel; ERP experience (e.g., NetSuite, Sage, Dynamics)
- Detail-oriented, organized, and deadline-driven
- CPA preferred

**Compensation & benefits**

- $100,000 - $120,000
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Manage month-end close, journal entries, and reconciliations',
      'Prepare monthly financial statements and management reporting',
      'Support budgeting, forecasting, and financial analysis',
      'Oversee AP/AR, billing, and cash management',
      'Maintain internal controls and support the annual audit',
      'Supervise and develop a small accounting team',
    ],
    requirements: [
      '6+ years of progressive accounting/finance experience',
      'Strong US GAAP and financial-reporting knowledge',
      'Experience managing month-end close and a small team',
      'Advanced Excel and ERP experience',
      'CPA preferred',
    ],
    createdAt: new Date('2026-06-01').toISOString(),
  },
  {
    id: 'vp-hr-nyc',
    ref: 'CG-2026-019',
    title: 'VP, Human Resources',
    location: 'New York, NY',
    type: 'Full-time · Hybrid',
    salary: '$190,000 - $230,000 + bonus',
    summary:
      'Executive HR leader owning people strategy, talent, and total rewards for a high-growth New York organization.',
    description: `A high-growth New York organization is hiring a VP, Human Resources to lead the people function. Reports to the CEO and partners with the executive team on talent, employee experience, total rewards, and culture.

**What you'll own**

- People strategy across talent, employee experience, and total rewards
- Talent acquisition, leadership development, and succession planning
- Employee relations, performance, and organizational design
- Compensation, benefits, and equity program strategy
- HR compliance, HRIS, and people analytics
- Building, scaling, and leading the HR/people team

**What we're looking for**

- 12+ years of HR leadership, including VP/Director-level roles
- Strong knowledge of US employment law and total rewards
- Experience scaling people functions in high-growth environments
- Proven org-design, talent, and culture-building track record
- Executive presence and strong business partnering
- SHRM-SCP/SPHR preferred

**Compensation & benefits**

- $190,000 - $230,000 + bonus
- Equity participation
- Full medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own people strategy across talent, employee experience, and total rewards',
      'Lead talent acquisition, leadership development, and succession planning',
      'Oversee employee relations, performance, and organizational design',
      'Own compensation, benefits, and equity program strategy',
      'Lead HR compliance, HRIS, and people analytics',
      'Build, scale, and lead the HR/people team',
    ],
    requirements: [
      '12+ years of HR leadership, including VP/Director-level roles',
      'Strong knowledge of US employment law and total rewards',
      'Experience scaling people functions in high-growth environments',
      'Proven org-design, talent, and culture-building track record',
      'SHRM-SCP/SPHR preferred',
    ],
    createdAt: new Date('2026-05-31').toISOString(),
  },

  // ── Phantom / pipeline placeholder roles, batch 2 (demo) ─────────────────
  {
    id: 'assistant-controller-chicago',
    ref: 'CG-2026-020',
    title: 'Assistant Controller',
    location: 'Chicago, IL',
    type: 'Full-time · Hybrid',
    salary: '$95,000 - $115,000',
    summary:
      'Support the accounting function for a growing Chicago organization — month-end close, reporting, and controls. Reports to the Controller.',
    description: `An established and growing Chicago organization is adding an Assistant Controller to support its accounting function. Reports to the Controller and partners with FP&A and operations. Owns key parts of the close, reporting, and the controls behind them.

**What you'll own**

- Support a timely, accurate month-end and year-end close
- Prepare financial statements, reconciliations, and management reporting
- Maintain internal controls, accounting policies, and documentation
- Assist with budgeting, forecasting, and audit preparation
- Supervise and mentor staff accountants
- Drive process and systems improvements across accounting

**What we're looking for**

- CPA (or working toward it) with 4+ years of progressive accounting experience
- Strong US GAAP, close, and reconciliation knowledge
- Experience in a multi-entity or mid-market environment
- Advanced Excel; ERP experience (NetSuite, Sage, or Dynamics)
- High attention to detail and a continuous-improvement mindset
- Clear communicator who partners well across teams

**Compensation & benefits**

- $95,000 - $115,000
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Support a timely, accurate month-end and year-end close',
      'Prepare financial statements, reconciliations, and management reporting',
      'Maintain internal controls, accounting policies, and documentation',
      'Assist with budgeting, forecasting, and audit preparation',
      'Supervise and mentor staff accountants',
      'Drive process and systems improvements across accounting',
    ],
    requirements: [
      'CPA (or working toward it) with 4+ years of progressive accounting experience',
      'Strong US GAAP, close, and reconciliation knowledge',
      'Experience in a multi-entity or mid-market environment',
      'Advanced Excel and ERP experience (NetSuite, Sage, Dynamics)',
      'High attention to detail and a continuous-improvement mindset',
    ],
    createdAt: new Date('2026-06-12').toISOString(),
  },
  {
    id: 'enterprise-ae-chicago',
    ref: 'CG-2026-021',
    title: 'Enterprise Account Executive',
    location: 'Chicago, IL',
    type: 'Full-time · Hybrid',
    salary: '$90,000 - $110,000 base + commission (OTE ~$180k)',
    summary:
      'Own a Midwest enterprise territory — net-new acquisition and expansion of strategic accounts for a growing organization.',
    description: `A growing organization is hiring an Enterprise Account Executive to own its Midwest enterprise territory from Chicago. Reports to the Director of Sales and is responsible for net-new acquisition, expansion, and strategic relationships with large accounts.

**What you'll be doing**

- Own a quota for net-new enterprise acquisition and expansion
- Build and manage a healthy pipeline with disciplined CRM use
- Run complex, multi-stakeholder sales cycles from prospecting to close
- Develop strategic account plans and executive relationships
- Partner with marketing, solutions, and leadership on deals
- Forecast accurately and report on pipeline and performance

**What we're looking for**

- 5+ years of B2B sales, including enterprise/strategic accounts
- Proven track record of exceeding quota on complex deals
- Strong consultative, value-based selling skills
- Disciplined pipeline management and CRM (e.g., Salesforce) use
- Executive presence and strong negotiation skills
- Willingness to travel within the region

**Compensation & benefits**

- $90,000 - $110,000 base + commission (OTE ~$180k)
- Accelerators above quota
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own a quota for net-new enterprise acquisition and expansion',
      'Build and manage a healthy pipeline with disciplined CRM use',
      'Run complex, multi-stakeholder sales cycles from prospecting to close',
      'Develop strategic account plans and executive relationships',
      'Partner with marketing, solutions, and leadership on deals',
      'Forecast accurately and report on pipeline and performance',
    ],
    requirements: [
      '5+ years of B2B sales, including enterprise/strategic accounts',
      'Proven track record of exceeding quota on complex deals',
      'Strong consultative, value-based selling skills',
      'Disciplined pipeline management and CRM (e.g., Salesforce) use',
      'Executive presence and strong negotiation skills',
    ],
    createdAt: new Date('2026-06-12').toISOString(),
  },
  {
    id: 'talent-acquisition-manager-boston',
    ref: 'CG-2026-022',
    title: 'Talent Acquisition Manager',
    location: 'Boston, MA',
    type: 'Full-time · Hybrid',
    salary: '$110,000 - $130,000',
    summary:
      'Lead full-cycle recruiting and employer brand for a growing Boston organization. Builds and manages a small TA team.',
    description: `A growing Boston organization is hiring a Talent Acquisition Manager to lead full-cycle recruiting across the business. Reports to the Director of HR and owns hiring strategy, candidate experience, employer brand, and a small recruiting team.

**What you'll own**

- Full-cycle recruiting strategy across corporate and operational roles
- Sourcing, pipelines, and candidate experience end-to-end
- Employer brand, careers presence, and recruitment marketing
- Hiring-manager partnership, intake, and interview process design
- Recruiting metrics, ATS hygiene, and reporting
- Building, coaching, and managing a small TA team

**What we're looking for**

- 6+ years of full-cycle recruiting, including team leadership
- Proven sourcing and pipeline-building across functions
- Experience owning candidate experience and employer brand
- Strong ATS (e.g., Greenhouse, Lever) and recruiting analytics
- Excellent stakeholder management and communication
- SHRM/AIRS or similar an asset

**Compensation & benefits**

- $110,000 - $130,000
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own full-cycle recruiting strategy across corporate and operational roles',
      'Lead sourcing, pipelines, and candidate experience end-to-end',
      'Own employer brand, careers presence, and recruitment marketing',
      'Partner with hiring managers on intake and interview design',
      'Maintain recruiting metrics, ATS hygiene, and reporting',
      'Build, coach, and manage a small TA team',
    ],
    requirements: [
      '6+ years of full-cycle recruiting, including team leadership',
      'Proven sourcing and pipeline-building across functions',
      'Experience owning candidate experience and employer brand',
      'Strong ATS (Greenhouse, Lever) and recruiting analytics',
      'Excellent stakeholder management and communication',
    ],
    createdAt: new Date('2026-06-11').toISOString(),
  },
  {
    id: 'coo-boston',
    ref: 'CG-2026-023',
    title: 'Chief Operating Officer',
    location: 'Boston, MA',
    type: 'Full-time · Onsite',
    salary: '$220,000 - $280,000 + bonus + equity',
    summary:
      'Senior executive to own day-to-day operations, scale, and execution for a high-growth Boston organization. Reports to the CEO.',
    description: `A high-growth Boston organization is hiring a Chief Operating Officer to own day-to-day operations and execution. Reports to the CEO and partners with the leadership team on scaling the business, operational performance, and organizational design.

**What you'll own**

- Day-to-day operations and execution across the business
- Operational strategy, planning, and performance management
- Scaling teams, processes, and systems for growth
- Cross-functional alignment across sales, finance, and delivery
- Org design, hiring, and leadership development
- KPIs, operating cadence, and board-level reporting

**What we're looking for**

- 12+ years of progressive operations leadership, including COO/VP Ops
- Proven track record scaling a high-growth organization
- Strong financial and operational acumen
- Experience building teams, processes, and operating systems
- Executive presence and strong cross-functional leadership
- MBA an asset

**Compensation & benefits**

- $220,000 - $280,000 + bonus
- Equity participation
- Full medical, dental, and vision
- 401(k) with matching
- Onsite`,
    responsibilities: [
      'Own day-to-day operations and execution across the business',
      'Set operational strategy, planning, and performance management',
      'Scale teams, processes, and systems for growth',
      'Drive cross-functional alignment across sales, finance, and delivery',
      'Lead org design, hiring, and leadership development',
      'Own KPIs, operating cadence, and board-level reporting',
    ],
    requirements: [
      '12+ years of progressive operations leadership, including COO/VP Ops',
      'Proven track record scaling a high-growth organization',
      'Strong financial and operational acumen',
      'Experience building teams, processes, and operating systems',
      'Executive presence and strong cross-functional leadership',
    ],
    createdAt: new Date('2026-06-11').toISOString(),
  },
  {
    id: 'director-finance-dallas',
    ref: 'CG-2026-024',
    title: 'Director of Finance',
    location: 'Dallas, TX',
    type: 'Full-time · Hybrid',
    salary: '$150,000 - $175,000 + bonus',
    summary:
      'Lead FP&A, reporting, and finance operations for a growing Dallas organization. Reports to the CFO.',
    description: `A growing Dallas organization is hiring a Director of Finance to lead FP&A, reporting, and finance operations. Reports to the CFO and partners with business leaders on planning, performance, and decision support.

**What you'll own**

- FP&A, financial reporting, and finance operations
- Annual budgeting, forecasting, and long-range planning
- Management and board reporting packages
- Business partnering on performance and capital decisions
- Finance process, systems, and controls improvement
- Leading and developing the finance team

**What we're looking for**

- 8+ years of progressive finance experience, including leadership
- Strong FP&A, modeling, and reporting background
- CPA and/or MBA preferred
- Experience partnering with business and executive leaders
- Advanced systems and analytical skills
- Excellent communication and leadership

**Compensation & benefits**

- $150,000 - $175,000 + bonus
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Lead FP&A, financial reporting, and finance operations',
      'Own annual budgeting, forecasting, and long-range planning',
      'Prepare management and board reporting packages',
      'Partner with business leaders on performance and capital decisions',
      'Drive finance process, systems, and controls improvement',
      'Lead and develop the finance team',
    ],
    requirements: [
      '8+ years of progressive finance experience, including leadership',
      'Strong FP&A, modeling, and reporting background',
      'CPA and/or MBA preferred',
      'Experience partnering with business and executive leaders',
      'Advanced systems and analytical skills',
    ],
    createdAt: new Date('2026-06-11').toISOString(),
  },
  {
    id: 'regional-sales-director-dallas',
    ref: 'CG-2026-025',
    title: 'Regional Sales Director',
    location: 'Dallas, TX',
    type: 'Full-time · Hybrid',
    salary: '$130,000 - $150,000 base + commission',
    summary:
      'Lead the South-Central sales region — team, pipeline, and revenue growth — for a growing organization. Reports to the VP of Sales.',
    description: `A growing organization is hiring a Regional Sales Director to lead its South-Central region from Dallas. Reports to the VP of Sales and owns the regional number, the team, and key account relationships.

**What you'll own**

- Regional revenue targets and growth strategy
- Leading, coaching, and developing a team of account executives
- Pipeline, forecasting, and CRM discipline across the region
- Key account and strategic deal involvement
- Territory planning and go-to-market execution
- Sales enablement and performance management

**What we're looking for**

- 8+ years in B2B sales, including team leadership
- Proven track record exceeding regional revenue targets
- Experience hiring, coaching, and managing sellers
- Strong forecasting and CRM (e.g., Salesforce) discipline
- Consultative, value-based selling background
- Willingness to travel within the region

**Compensation & benefits**

- $130,000 - $150,000 base + commission
- Accelerators above target
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own regional revenue targets and growth strategy',
      'Lead, coach, and develop a team of account executives',
      'Drive pipeline, forecasting, and CRM discipline across the region',
      'Engage on key accounts and strategic deals',
      'Own territory planning and go-to-market execution',
      'Lead sales enablement and performance management',
    ],
    requirements: [
      '8+ years in B2B sales, including team leadership',
      'Proven track record exceeding regional revenue targets',
      'Experience hiring, coaching, and managing sellers',
      'Strong forecasting and CRM (e.g., Salesforce) discipline',
      'Consultative, value-based selling background',
    ],
    createdAt: new Date('2026-06-11').toISOString(),
  },
  {
    id: 'hr-director-denver',
    ref: 'CG-2026-026',
    title: 'HR Director',
    location: 'Denver, CO',
    type: 'Full-time · Onsite',
    salary: '$130,000 - $155,000',
    summary:
      'Lead the HR function — talent, employee relations, and total rewards — for a growing Denver organization. Reports to the President.',
    description: `A growing Denver organization is hiring an HR Director to lead its people function. Reports to the President and owns HR strategy and operations across talent, employee relations, total rewards, and culture.

**What you'll own**

- HR strategy and operations across the organization
- Talent acquisition, onboarding, and workforce planning
- Employee relations, performance, and organizational design
- Total rewards: compensation, benefits, and recognition
- HR compliance, policy, and HRIS ownership
- Building, developing, and leading the HR team

**What we're looking for**

- 10+ years of progressive HR experience, including leadership
- Strong knowledge of US federal and state employment law
- Proven experience building HR programs and teams
- Strong employee-relations and business-partnering skills
- Comfortable operating both strategically and hands-on
- SHRM-CP/SHRM-SCP or PHR/SPHR preferred

**Compensation & benefits**

- $130,000 - $155,000
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- Onsite`,
    responsibilities: [
      'Own HR strategy and operations across the organization',
      'Lead talent acquisition, onboarding, and workforce planning',
      'Manage employee relations, performance, and organizational design',
      'Own total rewards: compensation, benefits, and recognition',
      'Ensure HR compliance and own policy and HRIS',
      'Build, develop, and lead the HR team',
    ],
    requirements: [
      '10+ years of progressive HR experience, including leadership',
      'Strong knowledge of US federal and state employment law',
      'Proven experience building HR programs and teams',
      'Strong employee-relations and business-partnering skills',
      'SHRM-CP/SHRM-SCP or PHR/SPHR preferred',
    ],
    createdAt: new Date('2026-06-10').toISOString(),
  },
  {
    id: 'bdm-denver',
    ref: 'CG-2026-027',
    title: 'Business Development Manager',
    location: 'Denver, CO',
    type: 'Full-time · Hybrid',
    salary: '$80,000 - $100,000 base + commission',
    summary:
      'Drive new business and partnerships across the Mountain West for a growing organization. Hunter role focused on pipeline and growth.',
    description: `A growing organization is hiring a Business Development Manager to drive new business across the Mountain West from Denver. Reports to the Director of Sales. A hunter role focused on prospecting, partnerships, and pipeline generation.

**What you'll be doing**

- Prospect and develop new business across the region
- Build and qualify pipeline through outbound and partnerships
- Run discovery and early-stage sales cycles to qualified opportunity
- Develop channel and referral partnerships
- Maintain disciplined CRM hygiene and reporting
- Partner with sales and marketing on go-to-market

**What we're looking for**

- 3+ years of B2B business development or sales experience
- Proven prospecting and pipeline-generation track record
- Strong communication and relationship-building skills
- Disciplined CRM (e.g., Salesforce) and outbound habits
- Self-motivated, hunter mentality
- Willingness to travel within the region

**Compensation & benefits**

- $80,000 - $100,000 base + commission
- Accelerators above target
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Prospect and develop new business across the region',
      'Build and qualify pipeline through outbound and partnerships',
      'Run discovery and early-stage sales cycles to qualified opportunity',
      'Develop channel and referral partnerships',
      'Maintain disciplined CRM hygiene and reporting',
      'Partner with sales and marketing on go-to-market',
    ],
    requirements: [
      '3+ years of B2B business development or sales experience',
      'Proven prospecting and pipeline-generation track record',
      'Strong communication and relationship-building skills',
      'Disciplined CRM (e.g., Salesforce) and outbound habits',
      'Self-motivated, hunter mentality',
    ],
    createdAt: new Date('2026-06-10').toISOString(),
  },
  {
    id: 'controller-charlotte',
    ref: 'CG-2026-028',
    title: 'Controller',
    location: 'Charlotte, NC',
    type: 'Full-time · Hybrid',
    salary: '$120,000 - $140,000',
    summary:
      'Lead the accounting function for an established Charlotte organization — close, reporting, controls, and team. Reports to the VP of Finance.',
    description: `An established Charlotte organization is hiring a Controller to lead its accounting function. Reports to the VP of Finance and owns the full accounting cycle, reporting, and the controls and team behind them.

**What you'll own**

- Full-cycle accounting and a timely, accurate close
- Monthly financial statements and management reporting
- Budgeting support, cash management, and forecasting inputs
- Internal controls, accounting policies, and audit
- Tax and compliance coordination with external advisors
- Leading and developing the accounting team

**What we're looking for**

- CPA with 7+ years of progressive accounting experience
- Strong US GAAP, close, and internal-controls knowledge
- Experience leading an accounting team
- Advanced systems (ERP) and Excel skills
- High attention to detail and a process-improvement mindset
- Strong communication across the business

**Compensation & benefits**

- $120,000 - $140,000
- Annual bonus
- Medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own full-cycle accounting and a timely, accurate close',
      'Prepare monthly financial statements and management reporting',
      'Support budgeting, cash management, and forecasting inputs',
      'Maintain internal controls, accounting policies, and audit',
      'Coordinate tax and compliance with external advisors',
      'Lead and develop the accounting team',
    ],
    requirements: [
      'CPA with 7+ years of progressive accounting experience',
      'Strong US GAAP, close, and internal-controls knowledge',
      'Experience leading an accounting team',
      'Advanced ERP and Excel skills',
      'High attention to detail and a process-improvement mindset',
    ],
    createdAt: new Date('2026-06-10').toISOString(),
  },
  {
    id: 'cro-charlotte',
    ref: 'CG-2026-029',
    title: 'Chief Revenue Officer',
    location: 'Charlotte, NC',
    type: 'Full-time · Hybrid',
    salary: '$220,000 - $260,000 + equity',
    summary:
      'Executive owner of revenue — sales, marketing, and growth strategy — for a scaling Charlotte organization. Reports to the CEO.',
    description: `A scaling Charlotte organization is hiring a Chief Revenue Officer to own the entire revenue engine. Reports to the CEO and is accountable for sales, marketing, and revenue strategy across the business.

**What you'll own**

- Company-wide revenue strategy, targets, and growth
- Sales, marketing, and revenue operations leadership
- Go-to-market strategy, pricing, and segmentation
- Pipeline, forecasting, and predictable revenue
- Building, scaling, and developing the revenue org
- Board-level reporting on revenue and growth

**What we're looking for**

- 15+ years of revenue leadership, including CRO/VP Sales roles
- Proven track record scaling revenue in a growth company
- Strong command of sales, marketing, and rev-ops
- Excellent forecasting and operating discipline
- Executive presence and board-level communication
- MBA an asset

**Compensation & benefits**

- $220,000 - $260,000 + equity
- Executive bonus plan
- Full medical, dental, and vision
- 401(k) with matching
- Hybrid schedule`,
    responsibilities: [
      'Own company-wide revenue strategy, targets, and growth',
      'Lead sales, marketing, and revenue operations',
      'Set go-to-market strategy, pricing, and segmentation',
      'Drive pipeline, forecasting, and predictable revenue',
      'Build, scale, and develop the revenue org',
      'Provide board-level reporting on revenue and growth',
    ],
    requirements: [
      '15+ years of revenue leadership, including CRO/VP Sales roles',
      'Proven track record scaling revenue in a growth company',
      'Strong command of sales, marketing, and rev-ops',
      'Excellent forecasting and operating discipline',
      'Executive presence and board-level communication',
    ],
    createdAt: new Date('2026-06-10').toISOString(),
  },
];

// Mock data for LinkedIn Posts
const MOCK_POSTS: LinkedInPost[] = [
  {
    id: 'li-freight-forwarding-bde',
    author: 'The Certus Group',
    role: 'Supply Chain Search & Specialized Recruitment',
    content: `Hiring: Freight Forwarding Business Development Executives

Seeking experienced sales professionals within:
✈️ Air Freight
🚢 Ocean Freight
📦 Import/Export
🌍 International Logistics

Successful people in this space understand that clients aren't just buying rates.
They're buying responsiveness, reliability, trust, and execution when timelines matter most.

Hiring across Canada.
Confidential conversations welcomed.`,
    date: 'Just now',
    avatar: 'https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png',
    image: '/linkedin-freight-forwarding-bde.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: 'li-hr-coordinator-brantford',
    author: 'The Certus Group',
    role: 'Supply Chain Search & Specialized Recruitment',
    content: `HR Coordinator Opportunity - Brantford, ON (onsite role)

The Certus Group is currently working with a well-established and growing manufacturing organization (200+ employees) to identify an HR Coordinator to join their team.

This is an excellent opportunity for someone looking to build a long-term career in Human Resources and gain hands-on exposure across multiple areas of HR, including recruitment, onboarding, employee relations, HR administration, health & safety, payroll support, and employee engagement.

$60,000 + Benefits + Pension Plan

The organization offers a stable work environment, strong leadership, and the opportunity to develop your HR career while working closely with experienced HR professionals.

If you're interested in learning more, please feel free to reach out directly for a confidential conversation.

#certusgroup #hiringHR #humanresourcesjobs #brantford`,
    date: 'Just now',
    avatar: 'https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png',
    image: '/linkedin-hr-coordinator-brantford.jpg',
    createdAt: new Date().toISOString()
  }
];

// Job and post content is hardcoded above. To add, edit, or remove a listing,
// update the MOCK_JOBS / MOCK_POSTS arrays directly. These getters stay async
// so the calling components don't need to change.
export const getJobs = async (): Promise<JobPosting[]> => MOCK_JOBS;

export const getJobsByDomain = async (): Promise<JobPosting[]> => MOCK_JOBS;

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => MOCK_POSTS;
