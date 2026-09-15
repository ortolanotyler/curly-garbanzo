/**
 * Post-build SSG step (runs after `vite build`):
 *
 * Generates a dedicated static page per job at dist/jobs/<id>/index.html, each
 * carrying that job's JobPosting JSON-LD, a BreadcrumbList, per-job
 * <title>/description/canonical/OG, AND (2026-09-09) real visible text inside
 * <div id="root"> - title, location, salary, summary, description, responsibilities,
 * requirements. Previously #root was left empty on the bet that Google's JS-render
 * pass plus the JobPosting schema would be enough; with most pages not showing up
 * in the index, that bet isn't paying off - a crawler that doesn't execute JS (most
 * of them) or whose render pass never gets budget (JS-render is a slow, resource-
 * limited second pass at Google's end) sees nothing. The static text is inert -
 * when client JS loads, React's createRoot(...).render() simply replaces it with
 * the real interactive app, same as before. Same treatment for /jobs, /blog,
 * /submit-resume, each blog post, and the homepage.
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
import { getBlogPosts } from '../services/blogService';
import { buildJobPostingSchema } from '../components/jobSchema';
import type { JobPosting, BlogPost } from '../types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const DIST_HTML = path.join(DIST, 'index.html');
// Base is the production subdomain; override with VITE_SITE_URL if it changes.
const SITE_URL = (process.env.VITE_SITE_URL || 'https://corp.certusgroup.com').replace(/\/$/, '');

const ORG_NAME = 'Certus Corporate Search';
const ONE_START = '<!--job-ld:start-->';
const ONE_END = '<!--job-ld:end-->';

const escAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ldScript = (obj: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta ${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" content=")[^"]*(")`);
  // A replacer FUNCTION (not a string) so a `$` in `value` (any salary like
  // "$110,000") is inserted literally. A string replacement re-scans for `$1`,
  // `$&` etc. and was corrupting every description/og/twitter tag whose value
  // contained "$1" - confirmed live, produced garbled nested <meta> tags.
  return re.test(html) ? html.replace(re, (_m, p1: string, p2: string) => `${p1}${escAttr(value)}${p2}`) : html;
}

// Plain paragraphs are enough for crawlability - this isn't rendered to a user,
// just needs to be real, readable text a crawler can index. Bold/italic markers
// are stripped rather than converted; the visible SPA still renders full markdown.
function markdownToPlainParagraphs(md: string): string {
  return md
    .split(/\n\s*\n/)
    .map((block) => block.replace(/^#{1,6}\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim())
    .filter(Boolean)
    .map((block) => `<p>${escText(block)}</p>`)
    .join('\n      ');
}

function listItems(items: string[]): string {
  return items.map((item) => `<li>${escText(item)}</li>`).join('\n        ');
}

function buildJobBodyHtml(job: JobPosting): string {
  const metaLine = [job.location, job.type, job.salary].filter(Boolean).map(escText).join(' &middot; ');
  return `<div id="root"><main>
      <h1>${escText(job.title)}</h1>
      <p>${metaLine}</p>
      ${job.summary ? `<p>${escText(job.summary)}</p>` : ''}
      ${job.description ? markdownToPlainParagraphs(job.description) : ''}
      ${job.responsibilities?.length ? `<h2>What you'll be doing</h2>\n      <ul>\n        ${listItems(job.responsibilities)}\n      </ul>` : ''}
      ${job.requirements?.length ? `<h2>What we're looking for</h2>\n      <ul>\n        ${listItems(job.requirements)}\n      </ul>` : ''}
    </main></div>`;
}

// Minimal dark-theme styling for the prerendered content below, so the brief
// window before the client bundle takes over reads as "the page is loading"
// rather than a flash of unstyled black-on-white text (reported live,
// 2026-09-10, on the logistics site - the technical site had already been
// fixed this way on 2026-09-09 but the fix was never ported to corp or
// logistics until now). Matches this site's actual palette (index.css:
// brand-dark #0E141E, brand-silver #9FA8B5, body color #f8fafc) closely
// enough to look intentional.
//
// CRITICAL: every rule below is scoped to .ssr-fallback, NEVER bare #root.
// The <style> tag lives in <head> and is never removed, but #root's own ID
// persists for the app's entire life - a rule on bare #root would keep
// squishing/overriding the REAL hydrated app forever, not just the fallback
// flash (this exact regression shipped once on the technical site before the
// fix there was scoped correctly). Scoping to .ssr-fallback means the rules
// become inert the instant createRoot(...).render() replaces #root's
// children - .ssr-fallback no longer exists in the DOM at that point.
const PRERENDER_STYLE = `<style>
html,body{background:#0E141E;margin:0}
.ssr-fallback{font-family:'Outfit',system-ui,-apple-system,sans-serif;color:#f8fafc;max-width:820px;margin:0 auto;padding:32px 24px}
.ssr-fallback h1{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:600;margin:0 0 12px}
.ssr-fallback h2,.ssr-fallback h3{font-size:1.05rem;font-weight:600;margin:24px 0 10px;color:#f8fafc}
.ssr-fallback p{color:#9FA8B5;line-height:1.6;margin:4px 0 0}
.ssr-fallback nav{margin-bottom:16px;font-size:.85rem}
.ssr-fallback nav a,.ssr-fallback article a,.ssr-fallback main>p>a{color:#9FA8B5;text-decoration:none}
.ssr-fallback ul{list-style:none;margin:20px 0 0;padding:0}
.ssr-fallback li{padding:16px 0;border-top:1px solid rgba(255,255,255,0.1);color:#9FA8B5}
.ssr-fallback li a{display:block;color:inherit;text-decoration:none}
</style>`;

// Every builder above returns its own `<div id="root"><main>...</main></div>`
// string rather than going through a shared wrapper, so rather than touching
// six call sites this strips that outer <div id="root">...</div> shell back
// off and re-wraps the inner content in .ssr-fallback - one change point,
// same effect.
function wrapFallback(bodyHtml: string): string {
  const OPEN = '<div id="root">';
  const CLOSE = '</div>';
  if (!bodyHtml.startsWith(OPEN) || !bodyHtml.endsWith(CLOSE)) return bodyHtml;
  const inner = bodyHtml.slice(OPEN.length, -CLOSE.length);
  return `${OPEN}<div class="ssr-fallback">${inner}</div>${CLOSE}`;
}

function injectBody(html: string, bodyHtml: string): string {
  html = html.replace('</head>', `${PRERENDER_STYLE}\n</head>`);
  return html.replace('<div id="root"></div>', wrapFallback(bodyHtml));
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
  html = html.replace('</head>', `  ${block}\n</head>`);
  return injectBody(html, buildJobBodyHtml(job));
}

/**
 * Every route that is NOT /jobs/<id>. Without these, Vercel falls through to the
 * SPA index.html, so /jobs, /blog and /submit-resume each served the HOMEPAGE's
 * <title> AND its canonical (href="/") -- which tells Google they are duplicates
 * of the homepage and drops them from the index. They are in the sitemap, so we
 * were inviting a crawl and then telling it not to index what it found.
 */
function buildStaticPage(
  template: string,
  route: {
    path: string;
    title: string;
    desc: string;
    bodyHtml?: string;
    // Article routes pass these three. Without them every blog post
    // inherited the template's defaults: og:type "website" and the
    // company logo as the share image, so a post shared to LinkedIn
    // showed a small burgundy circle instead of its own cover, and
    // Google saw no article markup at all.
    image?: string;
    ogType?: string;
    jsonLd?: unknown[];
  },
): string {
  const url = `${SITE_URL}${route.path}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(route.title)}</title>`);
  html = setMeta(html, 'name', 'description', route.desc);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.desc);
  html = setMeta(html, 'property', 'twitter:url', url);
  html = setMeta(html, 'property', 'twitter:title', route.title);
  html = setMeta(html, 'property', 'twitter:description', route.desc);
  if (route.ogType) html = setMeta(html, 'property', 'og:type', route.ogType);
  if (route.image) {
    html = setMeta(html, 'property', 'og:image', route.image);
    html = setMeta(html, 'property', 'twitter:image', route.image);
  }
  if (route.jsonLd && route.jsonLd.length) {
    const block = `${ONE_START}\n  ${route.jsonLd.map(ldScript).join('\n  ')}\n  ${ONE_END}`;
    html = html.replace('</head>', `  ${block}\n</head>`);
  }
  if (route.bodyHtml) html = injectBody(html, route.bodyHtml);
  return html;
}

/** BlogPosting plus a breadcrumb, matching what the technical site's
 *  SSR renderer already emits for its Insights posts. */
function buildBlogJsonLd(post: BlogPost): unknown[] {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt || '',
      image: post.coverImage ? [post.coverImage] : undefined,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: post.author || ORG_NAME, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: ORG_NAME,
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/CertusLOGO_burgundy_circle.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      keywords: (post.tags || []).join(', ') || undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];
}

function buildJobsListingBodyHtml(jobs: JobPosting[]): string {
  const rows = jobs
    .map((j) => `<li><a href="/jobs/${escAttr(String(j.id))}">${escText(j.title)}</a> &middot; ${escText(j.location)}${j.salary ? ` &middot; ${escText(j.salary)}` : ''}</li>`)
    .join('\n        ');
  return `<div id="root"><main>
      <h1>Open Roles</h1>
      <p>Current finance, HR, sales and executive openings across North America, placed by Certus Corporate Search.</p>
      <ul>
        ${rows}
      </ul>
    </main></div>`;
}

function buildBlogPostBodyHtml(post: BlogPost): string {
  return `<div id="root"><main>
      <h1>${escText(post.title)}</h1>
      <p>${escText(post.author)} &middot; ${escText(post.date)}</p>
      ${post.content ? markdownToPlainParagraphs(post.content) : post.excerpt ? `<p>${escText(post.excerpt)}</p>` : ''}
    </main></div>`;
}

function buildBlogIndexBodyHtml(posts: BlogPost[]): string {
  const rows = posts
    .map((p) => `<li><a href="/blog/${escAttr(p.slug)}">${escText(p.title)}</a> &middot; ${escText(p.date)}</li>`)
    .join('\n        ');
  return `<div id="root"><main>
      <h1>Insights</h1>
      <p>Hiring insight for finance, HR and shared-services leaders from the Certus Corporate Search team.</p>
      <ul>
        ${rows}
      </ul>
    </main></div>`;
}

// Real homepage hero copy (components/Hero.tsx) so the crawlable text matches
// what a visitor actually reads, not placeholder marketing copy.
const HOMEPAGE_BODY_HTML = `<div id="root"><main>
      <h1>Shared services executive search</h1>
      <p>Certus Corporate Search is part of The Certus Group of Companies Inc. Founded in 2008, The Certus Group has been operating in the recruitment and search space for over 15 years. Our Corporate division specializes in connecting finance, HR, sales, and executive professionals with leading employers across North America. We understand the urgency, confidentiality, and business-critical demands of leadership hiring, and we deliver talent that keeps teams performing and organizations growing.</p>
      <p><a href="/jobs">View open roles</a> &middot; <a href="/submit-resume">Submit your resume</a> &middot; <a href="/blog">Insights</a></p>
    </main></div>`;

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

  // The rest of the sitemap. Each needs its own title and a SELF-referencing
  // canonical; inheriting the homepage's was the whole bug.
  const posts = getBlogPosts();
  const routes = [
    { path: '/jobs', title: 'Open Roles | Certus Corporate Search',
      desc: 'Current finance, HR, sales and executive openings across North America, placed by Certus Corporate Search.',
      bodyHtml: buildJobsListingBodyHtml(jobs) },
    { path: '/blog', title: 'Insights | Certus Corporate Search',
      desc: 'Hiring insight for finance, HR and shared-services leaders from the Certus Corporate Search team.',
      bodyHtml: buildBlogIndexBodyHtml(posts) },
    { path: '/submit-resume', title: 'Submit Your Resume | Certus Corporate Search',
      desc: 'Send us your resume and we will match you against current and upcoming corporate search mandates.',
      bodyHtml: `<div id="root"><main>
      <h1>Submit Your Resume</h1>
      <p>Send us your resume and we will match you against current and upcoming corporate search mandates.</p>
    </main></div>` },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Certus Corporate Search`,
      desc: (post.excerpt || '').slice(0, 300),
      bodyHtml: buildBlogPostBodyHtml(post),
      image: post.coverImage,
      ogType: 'article',
      jsonLd: buildBlogJsonLd(post),
    })),
  ];
  for (const route of routes) {
    const dir = path.join(DIST, ...route.path.split('/').filter(Boolean));
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'index.html'), buildStaticPage(template, route), 'utf8');
  }

  // Homepage itself - same emptiness bug, confirmed live (curl showed an empty
  // #root). Patch dist/index.html in place with the real hero copy; head tags
  // are already correct from the raw vite build, so only the body needs it.
  await fs.writeFile(DIST_HTML, injectBody(template, HOMEPAGE_BODY_HTML), 'utf8');

  console.log(`[prerender-jobs] Wrote ${jobs.length} per-job pages → dist/jobs/<id>/index.html (base ${SITE_URL}).`);
  console.log(`[prerender-jobs] Wrote ${routes.length} static route pages → ${routes.map((r) => r.path).join(', ')}`);
  console.log('[prerender-jobs] Patched homepage dist/index.html with real body content.');
}

main().catch((err) => {
  console.error('[prerender-jobs] FAILED:', err);
  process.exit(1);
});
