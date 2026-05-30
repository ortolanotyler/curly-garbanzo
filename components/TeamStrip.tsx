import React from 'react';
import { Linkedin } from 'lucide-react';

// Swap in real photos + bios when ready. The component falls back to
// initial-glyph avatars if `photo` is omitted.
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    name: 'Founder & Managing Partner',
    role: 'Engagement lead',
    bio: 'Twenty years in executive search across finance, operations, and IT. Founded Certus to take a more direct approach to senior placement work.',
  },
  {
    name: 'Director of Search',
    role: 'Search delivery',
    bio: 'CFO, COO, and VP-level placements for PE-backed and public corporates. Runs the day-to-day on active mandates.',
  },
  {
    name: 'Research Lead',
    role: 'Network & sourcing',
    bio: 'Owns the candidate network. Every shortlist starts with people we already know — not a cold pull from a job board.',
  },
];

const initials = (name: string) =>
  name
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const TeamStrip: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-silver/[0.025] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-brand-silver"></div>
            <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
              The people behind the search
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
            Who runs your search.
          </h2>
          <p className="mt-6 text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Every search is run by a senior partner you&rsquo;ll work with directly. No
            handoffs to junior staff once the contract is signed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <article
              key={idx}
              className="group relative bg-white/[0.02] border border-white/5 rounded-sm p-8 flex flex-col gap-6 hover:border-brand-silver/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-brand-silver/40 transition-colors duration-500 flex items-center justify-center bg-white/[0.03]">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-lg font-serif italic text-brand-silver tracking-wider">
                      {initials(member.name) || 'C'}
                    </span>
                  )}
                </div>

                <span className="font-mono text-[10px] text-white/30 tracking-widest">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-medium text-white leading-tight tracking-tight">
                  {member.name}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-silver">
                  {member.role}
                </p>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {member.bio}
              </p>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-4 border-t border-white/5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin size={12} strokeWidth={1.75} />
                  Connect
                </a>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-silver scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-[10px] font-light tracking-[0.2em] uppercase text-white/40">
          Headshots and full bios coming soon.
        </p>
      </div>
    </section>
  );
};

export default TeamStrip;
