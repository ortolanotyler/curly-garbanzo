import React from 'react';
import { Helmet } from 'react-helmet-async';
import { JobPosting, BlogPost } from '../types';
import { buildJobPostingSchema } from './jobSchema';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  job?: JobPosting;
  post?: BlogPost;
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

// Salary / country / JobPosting-schema helpers live in ./jobSchema — shared with
// the post-build static injector so crawler HTML and the hydrated DOM never drift.

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return DEFAULT_SITE_URL;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Shared services executive search. Finance, HR, sales, and executive placements at corporate clients across North America. Part of The Certus Group.',
  keywords = 'shared services executive search, finance recruitment, HR recruitment, sales recruitment, executive search, CFO search, CHRO search, COO search, corporate search, North America',
  canonical,
  ogImage = LOGO_URL,
  ogType = 'website',
  job,
  post,
  isGateway = false,
  schemaOnly = false,
  noindex = false,
}) => {
  const baseUrl = getBaseUrl();
  const resolvedCanonical = canonical || (typeof window !== 'undefined' ? `${baseUrl}${window.location.pathname}` : baseUrl);

  const finalTitle = job
    ? `${job.title} · ${SITE_NAME}`
    : post
      ? `${post.title} · ${SITE_NAME}`
      : isGateway
        ? `${SITE_NAME} | Shared services executive search`
        : title
          ? title.includes(SITE_NAME)
            ? title
            : `${title} · ${SITE_NAME}`
          : `${SITE_NAME} | Shared services executive search`;

  const finalDescription = job
    ? `${job.title} · ${job.location}${job.salary ? ` · ${job.salary}` : ''}. ${job.summary || ''}`.slice(0, 300)
    : post
      ? post.excerpt
      : description;

  const effectiveOgType = post ? 'article' : ogType;
  const effectiveOgImage = post?.coverImage || ogImage;
  const effectiveKeywords = post?.tags?.length ? post.tags.join(', ') : keywords;

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
      'Certus Corporate Search runs shared services executive search engagements — finance, HR, sales, and executive placements at corporate clients across North America.',
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
    knowsAbout: ['Shared services executive search', 'Finance recruitment', 'HR recruitment', 'Sales recruitment', 'Executive search'],
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

  // JobPosting schema — Google for Jobs spec (builder shared with ./jobSchema).
  const jobSchema: Record<string, unknown> | null = job
    ? buildJobPostingSchema(job, baseUrl)
    : null;

  // BlogPosting schema — https://developers.google.com/search/docs/appearance/structured-data/article
  let postSchema: Record<string, unknown> | null = null;
  if (post) {
    postSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Person', name: post.author },
      publisher: {
        '@type': 'Organization',
        name: ORG_NAME,
        logo: { '@type': 'ImageObject', url: LOGO_URL },
      },
      image: post.coverImage || LOGO_URL,
      url: `${baseUrl}/blog/${post.slug}`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${post.slug}`,
      },
      ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
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
      ...(post
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Insights',
              item: `${baseUrl}/blog`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: `${baseUrl}/blog/${post.slug}`,
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
          <meta name="keywords" content={effectiveKeywords} />
          <meta name="robots" content={robotsValue} />
          <link rel="canonical" href={resolvedCanonical} />

          <meta property="og:type" content={effectiveOgType} />
          <meta property="og:url" content={resolvedCanonical} />
          <meta property="og:title" content={finalTitle} />
          <meta property="og:description" content={finalDescription} />
          <meta property="og:image" content={effectiveOgImage} />
          <meta property="og:site_name" content={SITE_NAME} />

          {post && <meta property="article:published_time" content={post.date} />}
          {post && <meta property="article:author" content={post.author} />}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={resolvedCanonical} />
          <meta name="twitter:title" content={finalTitle} />
          <meta name="twitter:description" content={finalDescription} />
          <meta name="twitter:image" content={effectiveOgImage} />
        </>
      )}

      {!schemaOnly && !job && !post && (
        <>
          <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        </>
      )}

      {!schemaOnly && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}

      {jobSchema && (
        <script type="application/ld+json">{JSON.stringify(jobSchema)}</script>
      )}

      {postSchema && (
        <script type="application/ld+json">{JSON.stringify(postSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
