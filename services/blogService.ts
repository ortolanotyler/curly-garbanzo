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
    title: 'Ontario Caps Advertised Pay Ranges at $50,000. Your CFO Posting Is Exempt.',
    excerpt:
      'Since 1 January 2026 an advertised range in Ontario cannot span more than $50,000, and postings above $200,000 are exempt from disclosure entirely. Pay disclosure in Ontario went from 49% of postings to 71% while the rest of the country held flat. What that does to pricing a finance role.',
    author: 'Certus Corporate Search',
    date: '2026-09-01',
    tags: ['Pay Transparency', 'Finance Hiring', 'Ontario', 'Compensation'],
    coverImage:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1600',
    content: `Ontario capped the width of an advertised pay range at $50,000 on 1 January 2026. For a lot of Controller searches that is narrower than the band the company actually works with, because the distance between someone who can close the books on time and someone who can rebuild the close process has always been worth more than fifty thousand dollars.

The rule has a second half that gets less attention. Postings where expected compensation is over $200,000 are exempt from the disclosure requirement altogether. A CFO search clears that threshold. A Controller search usually does not.

The search where you have the most room to move is the one you now have to commit to in public, and the search where you would most like to keep the number to yourself is the one the province leaves alone. Most of the finance leaders we have spoken to since January think that is backwards. It is also the law, so the useful question is what to do about it.

*Current as of September 2026. This is a summary for hiring managers, not legal advice.*

## What the rule says

The requirements sit in Part III.1 of the Employment Standards Act, sections 8.2 through 8.6, with the detail in Ontario Regulation 476/24. A publicly advertised job posting has to state the expected compensation or a range, and that range cannot be more than $50,000 wide.

Two details trip employers up. The obligation attaches to publicly advertised postings, so a role filled through a search firm or a private network sits in a different analysis. And the $200,000 exemption is a threshold on expected compensation for the role, not a general carve-out for anything senior.

## Ontario postings changed faster than the law required

Indeed's Hiring Lab tracks how many Canadian job postings disclose pay. In Ontario the share went from 49% to 71%. Across the rest of the country it stayed roughly where it was, around 40%.

That is a large move in one province in about a year, and it changes what a candidate sees. Somebody scanning Ontario postings now finds a number on seven out of ten of them. A posting without one stands out, and not in a useful way.

## What disclosure costs

Both of the usual claims about this are overstated. Publishing ranges is not free, and it is not going to blow up your compensation structure either.

The most careful work we have found is an NBER paper by Arnold, Quach and Taska, working paper 34480. It associates pay transparency with wage increases somewhere between 1.3% and 3.6%, and finds no measurable effect on pay dispersion.

Stay with that second finding for a moment. Compression is the fear we hear most often: publish the band, everyone drifts to the top of it, your internal differentials collapse. The data does not show that happening. It shows a modest lift in the overall level and not much movement in the spread.

Budget accordingly. Assume a low single-digit increase on newly posted roles and leave your existing structure alone.

## Four decisions the cap forces

**Decide whether the range is real before you post it.** Fifty thousand dollars is wide enough to be meaningful and too narrow to hide in. Post $110,000 to $160,000 with no intention of going past $125,000 and you will spend the search interviewing people you cannot close. They will remember it too, and senior finance in this market is a small room.

**Split the role, or narrow the band honestly.** When a true band runs wider than $50,000 it is usually because two different jobs are still sharing one requisition. A senior Controller and a hands-on Controller are separate searches at separate numbers, and the cap is a reasonable prompt to admit that.

**Do not structure around the $200,000 exemption.** Padding a posting to clear the threshold so you can avoid disclosing reads badly later, to candidates and to the Ministry.

**Look at what your competitors are publishing.** Seven in ten Ontario postings now carry a number. That is free, current market data on your own roles, and it beats the salary aggregators, which will happily disagree with each other by twenty thousand dollars on the same title.

## If you are also changing the office policy this quarter

Plenty of companies are rewriting postings and tightening attendance in the same few months. There is a finance-specific number you should have in front of you before doing both at once.

ACCA's Global Talent Trends 2026 surveyed 11,389 people in 160 countries between October 2025 and February 2026. Among Gen Y finance professionals, 44% said they would consider leaving if they were required to spend more time in the office. In the same survey, 66% agreed that employers should require a set number of office days.

Those two numbers sit together more comfortably than they look. People accept a defined expectation. What they react to is a change to one they had already built their week around. Tighten attendance in the same quarter you are trying to hire a finance team and you are bidding against yourself.

One caveat on that survey. The North American subset is small and self-selected, so read it as direction rather than as a benchmark for your own population.

---

*Certus Corporate Search places finance, HR and shared-services leadership across Canada and the United States. If you are pricing a role against a $50,000 window and are not sure where the market actually sits, we are happy to tell you what we are seeing.*`,
  },
];

/** Posts, newest first. */
export const getBlogPosts = (): BlogPost[] =>
  [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getBlogPost = (slug: string): BlogPost | undefined =>
  POSTS.find((p) => p.slug === slug);

/** Raw list, used by the server to build the sitemap. */
export const BLOG_POSTS = POSTS;
