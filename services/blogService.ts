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
    slug: 'true-cost-of-a-bad-executive-hire',
    title: 'The True Cost of a Bad Executive Hire — And How to Avoid It',
    excerpt:
      "A mis-hire at the leadership level rarely shows up as a single line on a P&L. Here's what it actually costs, and the search discipline that prevents it.",
    author: 'Tyler Ortolano',
    date: '2026-06-10',
    tags: ['Executive Search', 'Hiring', 'Leadership'],
    coverImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    content: `The most expensive hire your company will ever make isn't the one with the biggest salary — it's the leader who looks right on paper, clears every interview, and quietly costs you eighteen months of momentum before anyone admits it isn't working.

Executive mis-hires rarely announce themselves. They compound.

## What a bad executive hire actually costs

The salary is the smallest line item. The real cost shows up across four areas:

- **Direct cost** — base, bonus, signing, equity, and severance. Replacing a six-figure leader routinely runs 1.5–2× annual compensation once you add the search, onboarding, and exit.
- **Opportunity cost** — the deals not closed, the function not built, the roadmap that slipped while the seat was effectively empty.
- **Team cost** — strong performers don't wait around for a struggling leader. Your best people leave first, and they're the hardest to replace.
- **Momentum cost** — the hardest to quantify and the most damaging. A year of drift at the leadership level is a year your competitors didn't take off.

In our experience the number is almost always higher than leadership expects — because the momentum cost never makes it onto a spreadsheet.

## Why good companies still get it wrong

Most mis-hires aren't a failure of evaluation. They're a failure of definition.

The role was never scoped clearly. The interview tested for likeability and pedigree instead of the two or three outcomes that actually matter in the first year. The process moved too fast under pressure to fill the seat — or too slow, and the best candidate took another offer.

> The candidate who interviews best is not always the candidate who performs best. The job of a search is to tell the difference.

## How to avoid it

A disciplined search isn't about seeing more résumés. It comes down to a few non-negotiables:

1. **Define the first-year outcomes, not the job description.** What does success look like in 12 months? If leadership can't agree, no candidate can deliver it.
2. **Calibrate on a real shortlist early.** Two or three strong, benchmarked candidates tell you more about the market — and your own bar — than fifty inbound applications.
3. **Reference for patterns, not praise.** Anyone can supply three happy references. Ask how they operate under pressure, how they build teams, and what they'd do differently.
4. **Protect the timeline.** Senior candidates have options. A process that drags signals indecision and loses the people you most want.

## The bottom line

You don't avoid a bad executive hire by being more cautious. You avoid it by being more precise — about the outcomes you need, the market that can deliver them, and the process that keeps your best option engaged until they say yes.

That precision is the entire job of a search partner. Done right, it's the cheapest insurance you'll ever buy.`,
  },
  {
    slug: 'questions-before-your-next-finance-hire',
    title: '5 Questions to Ask Before Your Next Senior Finance Hire',
    excerpt:
      "Before you open a Controller or VP Finance search, get clear on these five things. They decide whether you hire in 30 days or 130.",
    author: 'Tyler Ortolano',
    date: '2026-06-05',
    tags: ['Finance', 'Hiring', 'Recruitment'],
    coverImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600',
    content: `Most finance searches that stall don't stall because the talent isn't out there. They stall because the search started before the company was ready to hire.

Before you open a Controller, Director of Finance, or VP Finance search, get clear on these five questions. They're the difference between a 30-day hire and a 130-day one.

## 1. Is this a builder or an operator?

A finance leader who thrives building a function from scratch — first close, first system, first team — is often miserable maintaining a mature one, and vice versa. Decide which problem you're hiring to solve before you write the spec. The strongest résumés are useless if they're the wrong shape for the work.

## 2. What are the three numbers this person owns in year one?

Not "manage finance." Specifics: a clean close in five days, a board-ready forecast, a cash model leadership trusts. If you can name the three outcomes, you can interview for them. If you can't, you'll interview for vibes.

## 3. Where does this role actually sit?

Reporting line, team size, and decision rights shape the candidate pool more than salary does. A Controller reporting to a CFO is a different hire — and a different person — than a Controller who **is** the senior-most finance leader. Be honest about the seat.

## 4. What can you pay, really?

Comp benchmarks move fast, and finance talent reads the market well. A range that was competitive eighteen months ago may be 15–20% light today. Pressure-test your band against live offers before you go to market, not after you lose a finalist.

## 5. How fast can you actually move?

This is the one companies underestimate. Strong finance candidates are typically employed, already in process elsewhere, or both. A two-week gap between interview rounds is often enough to lose them. Map your process — and your decision-makers' calendars — before the first interview, not during.

## The takeaway

The best finance hires happen when the company has done its own homework first. Answer these five questions honestly and you've already done the hardest part of the search. The rest is finding the right person — which is where a specialized partner earns their keep.`,
  },
];

/** Posts, newest first. */
export const getBlogPosts = (): BlogPost[] =>
  [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getBlogPost = (slug: string): BlogPost | undefined =>
  POSTS.find((p) => p.slug === slug);

/** Raw list — used by the server to build the sitemap. */
export const BLOG_POSTS = POSTS;
