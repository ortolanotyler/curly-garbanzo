import { JobPosting } from '../types';

// Single source of truth for schema.org JobPosting markup, shared by the runtime
// SEO component and the post-build static injector (scripts/inject-jobs-ld.ts) so
// the crawler-visible HTML and the hydrated DOM never drift apart.

const ORG_NAME = 'Certus Corporate Search';
const LOGO_URL =
  'https://res.cloudinary.com/dvbubqhpp/image/upload/v1770919808/CertusLOGO_szfewa.png';

const US_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
  'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA',
  'RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]);

// Best-guess country from a "City, ST" string. Handles parenthetical / remote
// annotations like "Buffalo, NY (Remote)" and "Remote (US)". Defaults to CA (HQ market).
export const guessCountry = (location?: string): string => {
  if (!location) return 'CA';
  if (/\b(?:us|usa)\s*\)|\bunited states\b/i.test(location)) return 'US';
  const region = (location.split(',')[1] || '').replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
  return US_STATES.has(region) ? 'US' : 'CA';
};

// Pull numbers out of a salary string. "$180,000 - $220,000" → [180000, 220000].
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

// Map our free-form "Full-time · Hybrid · Permanent" type to a valid Google enum.
const mapEmploymentType = (type?: string): string => {
  const t = (type || '').toLowerCase();
  if (t.includes('part')) return 'PART_TIME';
  if (t.includes('contract')) return 'CONTRACTOR';
  if (t.includes('intern')) return 'INTERN';
  if (t.includes('temp')) return 'TEMPORARY';
  return 'FULL_TIME';
};

export function buildJobPostingSchema(job: JobPosting, baseUrl: string): Record<string, unknown> {
  const datePosted = job.createdAt || new Date().toISOString();
  // Deterministic 60-day window anchored to the posting date (not "now").
  const validThrough = new Date(new Date(datePosted).getTime() + 60 * 24 * 60 * 60 * 1000).toISOString();
  const country = guessCountry(job.location);
  const salaryNums = parseSalary(job.salary);
  const isRemote = /\bremote\b/i.test(job.location || '');
  const locality = job.location?.split(',')[0]?.trim() || '';
  // A real, mappable city — not a "Remote (US)"-style string with no city.
  const hasPhysicalLocation = !!job.location?.includes(',') && !/^remote/i.test(locality);
  const addressRegion = (job.location?.split(',')[1] || '').replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
  const applicantCountry = { '@type': 'Country', name: country === 'CA' ? 'Canada' : 'United States' };

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

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: descriptionHtml,
    identifier: { '@type': 'PropertyValue', name: ORG_NAME, value: String(job.ref || job.id) },
    datePosted,
    validThrough,
    employmentType: mapEmploymentType(job.type),
    hiringOrganization: { '@type': 'Organization', name: ORG_NAME, sameAs: baseUrl, logo: LOGO_URL },
    ...(hasPhysicalLocation
      ? {
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: locality,
              addressRegion: addressRegion || (country === 'CA' ? 'ON' : ''),
              addressCountry: country,
            },
          },
        }
      : {}),
    ...(isRemote
      ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: applicantCountry }
      : {}),
    directApply: true,
    url: `${baseUrl}/jobs/${job.id}`,
    ...(baseSalary ? { baseSalary } : {}),
  };
}
