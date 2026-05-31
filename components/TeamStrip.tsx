import React from 'react';

// Swap in real photos + bios when ready. Falls back to initial-glyph avatars
// if `photo` is omitted.
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
    bio: 'Executive search across finance, operations, and IT.',
  },
  {
    name: 'Director of Search',
    role: 'Search delivery',
    bio: 'CFO, COO, and VP-level placements for PE-backed and public corporates.',
  },
  {
    name: 'Research Lead',
    role: 'Network & sourcing',
    bio: 'Owns the candidate network and shortlist research.',
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
    <section className="relative py-20 md:py-28 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05]">
            Team.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <article key={idx} className="flex flex-col gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/[0.03]">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-base font-medium text-white/60 tracking-wider">
                    {initials(member.name) || 'C'}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-white leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-white/50 mt-1">{member.role}</p>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamStrip;
