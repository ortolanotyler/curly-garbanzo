import React from 'react';
import { Helmet } from 'react-helmet-async';
import { JobPosting } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'jobPosting';
  job?: JobPosting;
  isGateway?: boolean;
  schemaOnly?: boolean;
  noindex?: boolean;
}

const DEFAULT_SITE_URL = 'https://certusgroup.com';
const SITE_NAME = 'Certus Corporate Search';
const ORG_NAME = 'Certus Corporate Search';
const ORG_LEGAL_NAME = 'The Certus Group of Companies Inc.';
const LOGO_URL =
  'https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png';

// Pull a number out of a salary string. "$180,000 - $220,000" → [180000, 220000].
// "$120k" → [120000]. Returns up to two numbers (min, max).
const parseSalary = (raw?: string): number[] => {
  if (!raw) return [];
  const matches = raw.match(/(\d+[\d,.]*)\s*(k|m)?/gi) || [];
  return matches
    .map((m) => {
      const num = parseFloat(m.replace(/[^\d.]/g, ''));
      if (isNaN(num)) return NaN;
      if (/k$/i.test(m)) return num * 1000;
      if (/m$/i.test(m)) return num * 1_000_000;
      return num;
    })
    .filter((n) => !isNaN(n) && n > 0)
    .slice(0, 2);
};

// Best-guess country from a "City, ST" string. Defaults to CA (HQ market).
const guessCountry = (location?: string): string => {
  if (!location) return 'CA';
  const region = location.split(',')[1]?.trim().toUpperCase() || '';
  const usStates = new Set([
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
    'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA',
    'RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
  ]);
  if (usStates.has(region)) return 'US';
  return 'CA';
};

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return DEFAULT_SITE_URL;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Executive search for senior finance, operations, and IT roles at corporate clients across North America. Part of The Certus Group.',
  keywords = 'executive search, finance recruitment, operations recruitment, IT leadership recruitment, CFO search, COO search, CIO search, corporate search, North America',
  canonical,
  ogImage = LOGO_URL,
  ogType = 'website',
  job,
  isGateway = false,
  schemaOnly = false,
  noindex = false,
}) => {
  const baseUrl = getBaseUrl();
  const resolvedCanonical = canonical || (typeof window !== 'undefined' ? `${baseUrl}${window.location.pathname}` : baseUrl);

  const finalTitle = job
    ? `${job.title} · ${SITE_NAME}`
    : isGateway
      ? `${SITE_NAME} | Executive search — finance, operations, IT`
      : title
        ? title.includes(SITE_NAME)
          ? title
          : `${title} · ${SITE_NAME}`
        : `${SITE_NAME} | Executive search — finance, operations, IT`;

  const finalDescription = job
    ? `${job.title} · ${job.location}${job.salary ? ` · ${job.salary}` : ''}. ${job.summary || ''}`.slice(0, 300)
    : description;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    alternateName: 'Certus Group',
    url: baseUrl,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      'Certus Corporate Search runs executive search engagements for senior finance, operations, and IT roles at corporate clients across North America.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '91 Skyway Avenue, Suite 206',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M9W 6R5',
      addressCountry: 'CA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-437-295-1799',
      contactType: 'business inquiries',
      email: 'info@certusgroup.com',
      areaServed: ['CA', 'US'],
      availableLanguage: ['English', 'French'],
    },
    sameAs: ['https://www.linkedin.com/showcase/certus-supply-chain-search/'],
    areaServed: ['Canada', 'United States'],
    knowsAbout: ['Finance recruitment', 'Operations recruitment', 'IT leadership recruitment', 'Executive search'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: LOGO_URL,
    },
  };

  // JobPosting schema — Google for Jobs spec
  // https://developers.google.com/search/docs/appearance/structured-data/job-posting
  let jobSchema: Record<string, unknown> | null = null;
  if (job) {
    const datePosted = job.createdAt || new Date().toISOString();
    const validThrough = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
    const country = guessCountry(job.location);
    const salaryNums = parseSalary(job.salary);

    const baseSalary = salaryNums.length
      ? {
          '@type': 'MonetaryAmount',
          currency: country === 'CA' ? 'CAD' : 'USD',
          value: {
            '@type': 'QuantitativeValue',
            unitText: 'YEAR',
            ...(salaryNums.length === 2
              ? { minValue: salaryNums[0], maxValue: salaryNums[1] }
              : { value: salaryNums[0] }),
          },
        }
      : undefined;

    const descriptionHtml = job.description
      ? job.description
      : `
          <p>${job.summary || ''}</p>
          ${job.responsibilities?.length ? `<h3>Responsibilities</h3><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join('')}</ul>` : ''}
          ${job.requirements?.length ? `<h3>Requirements</h3><ul>${job.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>` : ''}
        `.trim();

    jobSchema = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: descriptionHtml,
      identifier: {
        '@type': 'PropertyValue',
        name: ORG_NAME,
        value: String(job.ref || job.id),
      },
      datePosted,
      validThrough,
      employmentType: job.type
        ? job.type.toUpperCase().replace(/[\s-]/g, '_')
        : 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: ORG_NAME,
        sameAs: baseUrl,
        logo: LOGO_URL,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location?.split(',')[0]?.trim() || 'Toronto',
          addressRegion: job.location?.split(',')[1]?.trim() || 'ON',
          addressCountry: country,
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: country === 'CA' ? 'Canada' : 'United States',
      },
      directApply: true,
      url: `${baseUrl}/jobs/${job.id}`,
      ...(baseSalary ? { baseSalary } : {}),
    };
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      ...(job
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Open Roles',
              item: `${baseUrl}/jobs`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: job.title,
              item: `${baseUrl}/jobs/${job.id}`,
            },
          ]
        : []),
    ],
  };

  const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      {!schemaOnly && (
        <>
          <title>{finalTitle}</title>
          <meta name="description" content={finalDescription} />
          <meta name="keywords" content={keywords} />
          <meta name="robots" content={robotsValue} />
          <link rel="canonical" href={resolvedCanonical} />

          <meta property="og:type" content={ogType} />
          <meta property="og:url" content={resolvedCanonical} />
          <meta property="og:title" content={finalTitle} />
          <meta property="og:description" content={finalDescription} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content={SITE_NAME} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={resolvedCanonical} />
          <meta name="twitter:title" content={finalTitle} />
          <meta name="twitter:description" content={finalDescription} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}

      {!schemaOnly && !job && (
        <>
          <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        </>
      )}

      {jobSchema && (
        <script type="application/ld+json">{JSON.stringify(jobSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
