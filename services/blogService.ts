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
    slug: 'ontario-ai-screening-disclosure-job-postings',
    title: 'Ontario Job Postings Must Disclose AI Screening. Your Applicant Tracking System Probably Counts.',
    excerpt:
      'A $100,000 fine is the ceiling for an Employment Standards Act offence in Ontario, and since 1 January 2026 one way to reach it is failing to say in a job posting that artificial intelligence screens applicants. The definition the province wrote covers any system that infers from inputs to produce a recommendation, which takes in resume ranking inside most applicant tracking systems. California and Colorado add separate duties on separate dates.',
    author: 'Certus Corporate Search',
    date: '2026-09-15',
    tags: ['AI in Hiring', 'Job Postings', 'Ontario', 'Compliance'],
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600',
    content: `Since 1 January 2026, an Ontario employer who uses artificial intelligence to screen, assess or select applicants has to say so in the job posting. Most of the finance and HR leaders we work with read that sentence, picture a video interview tool scoring facial expressions, and decide it belongs to somebody else. The definition Ontario actually wrote is wider. A resume ranking feature that has been switched on quietly inside an applicant tracking system for years sits inside it.

Two American jurisdictions where our clients hire have moved on the same question on different timetables. California's rules have been live since October 2025, and Colorado's start on 1 January 2027, which makes this the quarter to settle it if you post into any of the three.

*Current as of September 2026. This is a summary for hiring managers, not legal advice.*

## What the Ontario rule says

[Section 8.4 of the Employment Standards Act, 2000](https://www.ontario.ca/laws/statute/00e41) reads: every employer who advertises a publicly advertised job posting and who uses artificial intelligence to screen, assess or select applicants for the position shall include in the posting a statement disclosing the use of the artificial intelligence.

That is the whole obligation. The detail lives in [Ontario Regulation 476/24](https://www.ontario.ca/laws/regulation/240476). Employers with fewer than 25 employees on the day the posting goes up are exempt. A publicly advertised job posting means an external posting that an employer, or a person acting on behalf of an employer, advertises to the general public in any manner. The regulation carves out general recruitment campaigns that do not name a specific position, postings restricted to existing employees, and postings for work performed outside Ontario.

The clause about a person acting on your behalf is the one that catches people. The obligation follows the posting rather than the poster, so an agency's compliance habits become yours the moment it advertises your role.

## What counts as artificial intelligence

The regulation defines it as a machine-based system that, for explicit or implicit objectives, infers from the input it receives in order to generate outputs such as predictions, content, recommendations or decisions that can influence physical or virtual environments.

Nothing in there requires a neural network, a large language model, or a vendor who describes the product as AI. A system that takes four hundred applications as input and hands you a ranked twenty is generating a recommendation, and it inferred something to get there. Match scores, fit percentages, scored knockout questions and parsers that reorder a pile by relevance all belong in the review.

The regulation does not define screen, assess or select, and the province has published nothing interpreting those three verbs. Given the penalty structure, the cheaper position is to disclose.

## What it costs to get this wrong

[Section 132](https://www.ontario.ca/laws/statute/00e41) sets the fines. An individual convicted of an offence under the Act faces up to $100,000, imprisonment up to 12 months, or both. A corporation faces up to $100,000, rising to $250,000 with one previous conviction and $500,000 with more than one.

A second provision makes the question answerable long after the search closes. Section 15(7.1) requires an employer to keep a copy of every publicly advertised job posting and any associated application form for three years after public access to the posting is removed. An officer who pulls a 2026 posting in 2028 reads whatever you archived.

## What California requires

The [California Civil Rights Council's regulations on automated-decision systems](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2025/03/Attachment-B-Final-Unmodified-Text-of-Proposed-Employment-Regulations-Regarding-Automated-Decision-Systems.pdf) took effect on [1 October 2025](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2025/06/2025.06.30-Automated-Decisions-Regs-Release.pdf). The duties there run to discrimination liability and to record-keeping, and they apply whether or not the posting says anything about the tool.

An automated-decision system is defined as a computational process that makes a decision or facilitates human decision making regarding an employment benefit. The listed examples include screening resumes for particular terms or patterns, directing job advertisements to targeted groups, and analysing facial expression, word choice or voice in online interviews. The regulation covers a tool that facilitates human decision making, so keeping a recruiter in the loop does not move it outside the rule.

Two provisions change how you keep records. Employment records now have to be preserved for four years, up from two, and the list of what counts explicitly includes automated-decision system data. An agent acting on an employer's behalf on recruitment, screening or hiring, including where it does that through an automated-decision system, is itself an employer under the Act. The regulations also state that evidence, or the absence of evidence, of anti-bias testing is relevant to a discrimination claim and to the defence of one.

## What Colorado requires from 1 January 2027

Colorado signed [SB 26-189](https://leg.colorado.gov/bills/sb26-189) on 14 May 2026, which repealed the 2024 artificial intelligence act and replaced it with a narrower set of duties starting 1 January 2027. Employment sits squarely inside the definition of a consequential decision, alongside housing, lending, insurance, health care and education.

A deployer has to give clear and conspicuous notice at the point of interaction, supply a plain language description of the technology's role within 30 days of an adverse decision, and honour a request for meaningful human review and reconsideration. Compliance records are kept for at least three years. The Attorney General enforces it, a violation counts as a deceptive trade practice, and a 60-day notice and opportunity to cure is available before 1 January 2030.

## How common these tools have become

[Statistics Canada's Canadian Survey on Business Conditions](https://www150.statcan.gc.ca/n1/pub/11-621-m/11-621-m2026010-eng.htm), collected between 1 April and 6 May 2026 from 9,251 responding businesses, found that 19.2% of businesses used artificial intelligence to produce goods or deliver services in the preceding twelve months. The same question returned 12.2% in the second quarter of 2025 and 6.1% in the second quarter of 2024.

The question covers artificial intelligence across the whole business, so read it as the speed at which these tools are arriving in Canadian workplaces. Roughly tripling in two years is the figure we would put in front of a board that still treats screening software as a small purchase made two floors down.

## What to do before you open the search

**Put one question to your vendor in writing.** Ask whether the product ranks, scores, matches or filters applicants, and by what method. The answer needs to be written down, because you will be relying on it in a posting and possibly in front of an employment standards officer.

**Write the disclosure sentence once and reuse it.** A plain line stating that artificial intelligence is used to screen applications for the posting satisfies section 8.4.

**Keep the posting and keep the data.** Three years in Ontario for the posting and any application form, four years in California for employment records including automated-decision system data. If you hire in both, run the longer clock everywhere and stop tracking two calendars.

**Check where the work is performed before assuming Ontario applies.** The carve-out for work performed outside the province is real, and the American rules attach on their own terms.

---

*Certus Corporate Search places finance, HR, sales and shared-services leadership across Canada and the United States. If you are about to open a search and are not sure whether your screening stack triggers a disclosure, we are happy to walk through what other employers are posting.*

**Sources.** [Employment Standards Act, 2000, Part III.1 and sections 15 and 132](https://www.ontario.ca/laws/statute/00e41). [Ontario Regulation 476/24, Rules and Exemptions re Job Postings](https://www.ontario.ca/laws/regulation/240476). [California Civil Rights Council, final text of the employment regulations regarding automated-decision systems](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2025/03/Attachment-B-Final-Unmodified-Text-of-Proposed-Employment-Regulations-Regarding-Automated-Decision-Systems.pdf). [California Civil Rights Department news release, 30 June 2025](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2025/06/2025.06.30-Automated-Decisions-Regs-Release.pdf). [Colorado SB26-189, Automated Decision-Making Technology](https://leg.colorado.gov/bills/sb26-189). [Statistics Canada, Analysis on artificial intelligence use by businesses in Canada, second quarter of 2026](https://www150.statcan.gc.ca/n1/pub/11-621-m/11-621-m2026010-eng.htm).`,
  },
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
