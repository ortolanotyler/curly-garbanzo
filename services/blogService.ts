import { BlogPost } from '../types';

// ─────────────────────────────────────────────────────────────────────────
// Blog / Insights content.
//
// To publish a new post: copy one of the objects below, give it a unique
// `slug` (used in the URL: /blog/your-slug), fill in the fields, and write
// the body in `content` as Markdown (## headings, **bold**, - lists,
// > quotes, [links](https://…), etc.). Newest `date` shows first.
//
// This file is intentionally plain data (no React imports) so the server can
// read it to build the sitemap. Keep it that way.
// ─────────────────────────────────────────────────────────────────────────

const POSTS: BlogPost[] = [
  {
    slug: 'ontario-50000-pay-range-rule-finance-hiring',
    title: 'Ontario\'s $50,000 Rule: Why Your CFO Search Is Exempt and Your Controller Search Is Not',
    excerpt:
      'Since 1 January 2026 an advertised range in Ontario cannot span more than $50,000, while postings above $200,000 are exempt entirely. Disclosure in Ontario jumped from 49% to 71% while the rest of Canada stayed flat. What that means for pricing a finance role.',
    author: 'Certus Corporate Search',
    date: '2026-09-01',
    tags: ['Pay Transparency', 'Finance Hiring', 'Ontario', 'Compensation'],
    coverImage:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1600',
    content: `Here is a problem that didn't exist in Ontario eighteen months ago. You're hiring a Controller. Your internal band for the role spans more than $50,000, because it always has, because the gap between a Controller who can close the books and a Controller who can rebuild the close process is worth more than fifty thousand dollars.

As of 1 January 2026, you can't advertise that band. Ontario caps the spread on a publicly advertised range at $50,000.

Now hold that against the other half of the rule. Postings where expected compensation exceeds $200,000 are exempt entirely. So the CFO search escapes the requirement, and the Controller search doesn't.

That inversion is worth sitting with. The role where you have the most pricing flexibility is the one the law now makes you commit on, and the role where you would most like to keep your options open is free.

*Current as of September 2026. This is a summary for hiring managers, not legal advice.*

## What the rule actually says

The requirements live in Part III.1 of the Employment Standards Act, sections 8.2 through 8.6, with the detail in Ontario Regulation 476/24. In plain terms, a publicly advertised job posting must include the expected compensation or a range, and that range may not exceed $50,000 in width.

Two things employers get wrong. The obligation attaches to *publicly advertised* postings, so the analysis changes for roles filled through a search firm or a private network. And the $200,000 exemption is a threshold on expected compensation, not a general escape hatch for senior roles.

## It's already changing what Ontario looks like

The interesting evidence isn't the law, it's what happened after.

Indeed's Hiring Lab measured the share of Canadian job postings that disclose pay. In Ontario, that share went from **49% to 71%**. In the rest of the country it stayed roughly flat, around 40%.

That's a real behavioural shift in one province in about a year, and it means something specific for you: a candidate scanning Ontario postings now sees pay on roughly seven of ten. Yours being the exception is a signal, not a neutral omission.

## What disclosure does to your wage bill

This is where most commentary goes wrong, in both directions. It's neither free nor catastrophic.

The most careful work on this is an NBER paper by Arnold, Quach and Taska (working paper 34480), which finds pay transparency associated with wage increases in the range of **1.3% to 3.6%**, and, importantly, **no measurable effect on pay dispersion.**

Read that second finding carefully, because it contradicts the thing employers most fear. The common worry is that publishing ranges compresses your internal structure, that everyone migrates to the top of the band and your differentials collapse. The evidence doesn't show that. What it shows is a modest upward drift in the level.

So the honest budgeting posture is: assume a low single-digit percentage increase on newly posted roles, and stop worrying about your existing structure detonating.

## The practical decisions this forces

**Decide whether the range is real before you post it.** A $50,000 window is enough to be meaningful and not enough to hide in. If you post $110,000 to $160,000 and never intend to pay above $125,000, you will spend your time interviewing people you can't close, and they will remember.

**Split the role, or narrow the band honestly.** If your true band is wider than $50,000, that's usually because you haven't decided which of two jobs you're hiring. Sometimes the right response to the constraint is to accept that a senior Controller and a hands-on Controller are separate searches with separate ranges.

**Don't use the $200,000 exemption as a workaround.** Structuring a posting to clear the threshold in order to avoid disclosure is the kind of thing that reads badly later, to candidates and to regulators.

**Check what your competitors are showing.** Seven in ten Ontario postings now disclose. That's free market data on your own roles, and it's a better comparator than any salary aggregator, which routinely disagree with each other by wide margins on the same title.

## One more thing worth knowing before you set the office policy

While you're rewriting postings, the other lever you're probably pulling is office attendance, and there's a finance-specific number worth having.

ACCA's Global Talent Trends 2026, which surveyed 11,389 people across 160 countries between October 2025 and February 2026, found that **44% of Gen Y finance professionals would consider leaving if required to spend more time in the office.** The same survey found **66% agree employers should require a set number of office days.**

Those aren't in conflict, and the combination is the useful part. People broadly accept a defined in-office expectation. What they leave over is a *change* to it. If you're tightening attendance in the same quarter you're trying to hire a finance team, you're competing against yourself.

A note on rigour: the North American subset of that survey is small and self-selected, so treat it as directional rather than as a benchmark for your own population.

---

*Certus Corporate Search places finance, HR and shared-services leadership across Canada and the United States. If you're pricing a role against a $50,000 window and aren't sure where the market actually sits, we are happy to tell you what we are seeing.*`,
  },
];

/** Posts, newest first. */
export const getBlogPosts = (): BlogPost[] =>
  [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getBlogPost = (slug: string): BlogPost | undefined =>
  POSTS.find((p) => p.slug === slug);

/** Raw list — used by the server to build the sitemap. */
export const BLOG_POSTS = POSTS;
