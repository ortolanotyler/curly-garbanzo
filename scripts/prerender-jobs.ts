/**
 * Post-build SSG step (runs after `vite build`):
 *
 * Generates a dedicated static page per job at dist/jobs/<id>/index.html, each
 * carrying ONLY that job's JobPosting JSON-LD plus a BreadcrumbList and per-job
 * <title>/description/canonical/OG. This is the ideal Google-for-Jobs shape: one
 * posting per dedicated, indexable URL. The homepage index.html stays clean.
 *
 * Vercel serves dist/jobs/<id>/index.html for /jobs/<id> via the filesystem
 * handler (vercel.json) ahead of the SPA fallback (verified in prod); the SPA
 * still hydrates the open job from initialJobId. Schema is built with the same
 * buildJobPostingSchema as the runtime SEO component, so the crawler HTML and the
 * hydrated DOM never drift.
 */
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getJobs } from '../services/jobService';
import { buildJobPostingSchema } from '../components/jobSchema';
import type { JobPosting } from '../types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const DIST_HTML = path.join(DIST, 'index.html');
// Override with VITE_SITE_URL once a custom domain (certusgroup.com) is wired.
const SITE_URL = (process.env.VITE_SITE_URL || 'https://corporate-search.vercel.app').replace(/\/$/, '');

const ONE_START = '<!--job-ld:start-->';
const ONE_END = '<!--job-ld:end-->';

const escAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ldScript = (obj: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta ${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" content=")[^"]*(")`);
  return re.test(html) ? html.replace(re, `$1${escAttr(value)}$2`) : html;
}

function buildJobPage(template: string, job: JobPosting): string {
  const title = `${job.title} · Certus Corporate Search`;
  const desc = `${job.title} · ${job.location}${job.salary ? ` · ${job.salary}` : ''}. ${job.summary || ''}`.slice(0, 300);
  const url = `${SITE_URL}/jobs/${job.id}`;

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(title)}</title>`);
  html = setMeta(html, 'name', 'description', desc);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', desc);
  html = setMeta(html, 'property', 'twitter:url', url);
  html = setMeta(html, 'property', 'twitter:title', title);
  html = setMeta(html, 'property', 'twitter:description', desc);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Open Roles', item: `${SITE_URL}/jobs` },
      { '@type': 'ListItem', position: 3, name: job.title, item: url },
    ],
  };
  const block = `${ONE_START}\n  ${ldScript(buildJobPostingSchema(job, SITE_URL))}\n  ${ldScript(breadcrumb)}\n  ${ONE_END}`;
  return html.replace('</head>', `  ${block}\n</head>`);
}

async function main() {
  const jobs = await getJobs();
  // Built index.html is the clean Vite output (vite empties dist each build); use it
  // as the per-job template and leave it untouched so the homepage carries no job schema.
  const template = await fs.readFile(DIST_HTML, 'utf8');

  for (const job of jobs) {
    const dir = path.join(DIST, 'jobs', String(job.id));
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'index.html'), buildJobPage(template, job), 'utf8');
  }

  console.log(`[prerender-jobs] Wrote ${jobs.length} per-job pages → dist/jobs/<id>/index.html (base ${SITE_URL}).`);
}

main().catch((err) => {
  console.error('[prerender-jobs] FAILED:', err);
  process.exit(1);
});
