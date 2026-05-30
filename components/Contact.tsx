import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../types';
import { Building2, Phone, Mail, ArrowRight, Loader2, ArrowUpRight, Linkedin } from 'lucide-react';

type InquiryType = 'hiring' | 'candidate' | 'other';

const INQUIRY_OPTIONS: Array<{ key: InquiryType; label: string; sub: string }> = [
  { key: 'hiring', label: 'I am hiring', sub: 'Start a search' },
  { key: 'candidate', label: 'I am exploring roles', sub: 'Reach the team' },
  { key: 'other', label: 'Something else', sub: 'Press, partnerships, etc.' },
];

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType>('hiring');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setStatus('loading');
    setErrorMessage('');

    const inquiryLabel = INQUIRY_OPTIONS.find((o) => o.key === inquiryType)?.label || inquiryType;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          inquiryType: inquiryLabel,
          message: message || '(no message)',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
        setInquiryType('hiring');
      } else {
        let detail = `Server returned ${response.status}`;
        try {
          const data = await response.json();
          if (data?.error) detail = data.error;
        } catch {
          // ignore
        }
        setErrorMessage(detail);
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Network error');
      setStatus('error');
    }
  };

  return (
    <section
      id={Section.CONTACT}
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-brand-dark border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-silver/[0.03] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`max-w-3xl mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-brand-silver"></div>
            <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
              Get in touch
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
            Tell us what you&rsquo;re after.
          </h2>
          <p className="mt-6 text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Hiring or job-hunting, send a note. We reply within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar — direct info */}
          <aside
            className={`lg:col-span-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
          >
            <div className="bg-white/[0.02] border border-white/5 rounded-sm p-8 md:p-10 h-full flex flex-col gap-10">
              <div className="space-y-6">
                <ContactRow icon={Building2} label="Headquarters">
                  91 Skyway Avenue, Suite 206
                  <br />
                  Toronto, ON · M9W 6R5
                </ContactRow>

                <ContactRow icon={Phone} label="Direct line">
                  <a href="tel:+14372951799" className="hover:text-white transition-colors">
                    (437) 295 1799
                  </a>
                </ContactRow>

                <ContactRow icon={Mail} label="Inquiries">
                  <a
                    href="mailto:info@certusgroup.com"
                    className="hover:text-white transition-colors"
                  >
                    info@certusgroup.com
                  </a>
                </ContactRow>
              </div>

              <a
                href="https://www.linkedin.com/showcase/certus-supply-chain-search/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-auto pt-6 border-t border-white/5 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">
                    Network
                  </span>
                  <span className="text-sm font-medium text-white group-hover:text-brand-silver transition-colors flex items-center gap-2">
                    Follow on LinkedIn
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </span>
                </div>
                <div className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/60 group-hover:border-white/40 group-hover:text-white transition-all">
                  <Linkedin size={16} strokeWidth={1.5} />
                </div>
              </a>
            </div>
          </aside>

          {/* Form */}
          <div
            className={`lg:col-span-8 transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.02] border border-white/5 rounded-sm p-8 md:p-10 space-y-7"
            >
              <Field label="I am…" required>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {INQUIRY_OPTIONS.map((opt) => {
                    const selected = inquiryType === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setInquiryType(opt.key)}
                        className={`group text-left p-4 rounded-sm border transition-all duration-200 ${
                          selected
                            ? 'border-brand-silver bg-brand-silver/10'
                            : 'border-white/10 hover:border-white/30 bg-transparent'
                        }`}
                      >
                        <div className={`text-sm font-medium transition-colors ${selected ? 'text-white' : 'text-white/80'}`}>
                          {opt.label}
                        </div>
                        <div className={`text-[10px] uppercase tracking-[0.2em] mt-1 transition-colors ${selected ? 'text-brand-silver' : 'text-white/50'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Name" required>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClasses}
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClasses}
                    placeholder="jane.doe@example.com"
                  />
                </Field>
              </div>

              <Field label="Company" hint="Optional">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClasses}
                  placeholder="Acme Industries"
                />
              </Field>

              <Field
                label="Message"
                hint={inquiryType === 'hiring' ? 'Role, timing, sector — whatever’s useful' : 'Optional'}
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  placeholder={
                    inquiryType === 'hiring'
                      ? 'We’re looking for a VP of Finance, ideally placed by Q3...'
                      : inquiryType === 'candidate'
                        ? 'I’m a Director of Operations exploring CFO-track roles in the GTA...'
                        : 'How can we help?'
                  }
                />
              </Field>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-3">
                  <p className="text-red-300 text-xs font-medium">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}
              {status === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-sm px-4 py-3">
                  <p className="text-emerald-300 text-xs font-medium">
                    Thanks — your message is in. We&rsquo;ll respond within one business day.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-white text-brand-dark hover:bg-brand-silver disabled:opacity-50 disabled:cursor-not-allowed py-4 font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-white/50 font-light tracking-[0.2em] uppercase">
                Confidentiality guaranteed
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// text-base (16px) on inputs prevents iOS Safari from auto-zooming when a
// field is focused — a real mobile UX bug on anything text-sm or smaller.
const inputClasses =
  'w-full bg-brand-dark border border-white/10 rounded-sm px-4 py-3 text-white text-base md:text-sm placeholder-gray-700 focus:outline-none focus:border-brand-silver/60 transition-colors';

const Field: React.FC<{
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, required, hint, children }) => (
  <div className="space-y-2">
    <div className="flex items-baseline justify-between gap-3">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em]">
        {label}
        {required && <span className="text-brand-silver ml-1">*</span>}
      </label>
      {hint && <span className="text-[10px] text-white/50 font-light">{hint}</span>}
    </div>
    {children}
  </div>
);

const ContactRow: React.FC<{
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}> = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-brand-silver flex-shrink-0">
      <Icon size={16} strokeWidth={1.5} />
    </div>
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1.5">
        {label}
      </div>
      <div className="text-sm text-gray-300 font-light leading-relaxed">{children}</div>
    </div>
  </div>
);

export default Contact;
