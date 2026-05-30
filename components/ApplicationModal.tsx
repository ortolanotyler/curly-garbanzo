
import React, { useState, useRef, useEffect } from 'react';
import { JobPosting } from '../types';
import { X, Upload, Check, Loader2, Linkedin } from 'lucide-react';
import { upload } from '@vercel/blob/client';

interface ApplicationModalProps {
  job: JobPosting;
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ job, isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'submitting' | 'success' | 'error'>('form');
  const [fileName, setFileName] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
        setStep('form');
        setFileName(null);
        setResumeFile(null);
        setErrorMessage('');
        setFormData({ firstName: '', lastName: '', email: '', linkedin: '' });
    }
  }, [isOpen]);

  const MAX_FILE_BYTES = 25 * 1024 * 1024;
  const MAX_FILE_LABEL = '25MB';
  const REQUEST_TIMEOUT_MS = 30_000;

  if (!isOpen) return null;

  const inputClasses =
    'w-full bg-brand-dark border border-white/10 rounded-sm px-4 py-3 text-white text-base md:text-sm placeholder-gray-700 focus:outline-none focus:border-brand-silver/60 transition-colors';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setStep('submitting');

    let resumeUrl: string | undefined;
    let resumeName: string | undefined;
    if (resumeFile) {
      try {
        const blob = await upload(resumeFile.name, resumeFile, {
          access: 'public',
          handleUploadUrl: '/api/blob-upload',
          contentType: resumeFile.type || 'application/pdf',
        });
        resumeUrl = blob.url;
        resumeName = resumeFile.name;
      } catch (err) {
        setErrorMessage(
          err instanceof Error
            ? `Resume upload failed: ${err.message}`
            : 'Resume upload failed. Please try again.'
        );
        setStep('error');
        return;
      }
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          ...formData,
          jobTitle: job.title,
          jobRef: job.ref,
          resumeUrl,
          resumeName,
        }),
      });

      if (response.ok) {
        setStep('success');
        return;
      }

      let detail = `Server returned ${response.status}`;
      if (response.status === 413) {
        detail = `Resume file is too large. Please attach a file under ${MAX_FILE_LABEL}.`;
      } else {
        try {
          const data = await response.json();
          if (data?.error) detail = data.error;
        } catch {
          // response was not JSON — keep status-code message
        }
      }
      setErrorMessage(detail);
      setStep('error');
    } catch (error) {
      const isAbort = error instanceof DOMException && error.name === 'AbortError';
      setErrorMessage(
        isAbort
          ? 'Request timed out. The server may be unreachable — please try again.'
          : error instanceof Error
            ? error.message
            : 'Network error. Please try again.'
      );
      setStep('error');
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_BYTES) {
      setErrorMessage(`Resume must be ${MAX_FILE_LABEL} or smaller.`);
      setResumeFile(null);
      setFileName(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setErrorMessage('');
    setResumeFile(file);
    setFileName(file.name);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-brand-dark border border-white/10 rounded-sm shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease-out]">
        <style>{`
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div className="flex justify-between items-start px-6 md:px-8 py-5 border-b border-white/10 bg-white/[0.02]">
           <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-silver">Apply</span>
                <span className="text-white/20">·</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{job.ref}</span>
              </div>
              <h3 className="text-base md:text-lg font-medium text-white tracking-tight leading-snug pr-6">{job.title}</h3>
           </div>
           <button
             onClick={onClose}
             className="text-white/40 hover:text-white transition-colors p-1.5 -mr-2 rounded-sm hover:bg-white/5"
             aria-label="Close"
           >
             <X size={18} strokeWidth={1.5} />
           </button>
        </div>

        <div className="p-6 md:p-8">
           {(step === 'form' || step === 'error') && (
             <form onSubmit={handleSubmit} className="space-y-6">
                {(step === 'error' || errorMessage) && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-3">
                    <p className="text-red-300 text-xs font-medium">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                   <FieldLabel text="First name">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="Jane"
                      />
                   </FieldLabel>
                   <FieldLabel text="Last name">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="Doe"
                      />
                   </FieldLabel>
                </div>

                <FieldLabel text="Email">
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     required
                     className={inputClasses}
                     placeholder="jane.doe@example.com"
                   />
                </FieldLabel>

                <FieldLabel text="LinkedIn">
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <Linkedin size={16} className="text-gray-600" />
                     </div>
                     <input
                       type="url"
                       name="linkedin"
                       value={formData.linkedin}
                       onChange={handleInputChange}
                       placeholder="linkedin.com/in/..."
                       className={`${inputClasses} pl-12`}
                     />
                   </div>
                </FieldLabel>

                <FieldLabel text="Resume">
                   <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-300 ${fileName ? 'border-brand-silver/40 bg-brand-silver/[0.04]' : 'border-white/15 hover:border-white/40 hover:bg-white/[0.02]'}`}
                   >
                      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                      {fileName ? (
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-brand-silver/10 flex items-center justify-center text-brand-silver">
                                <Check size={18} strokeWidth={1.75} />
                            </div>
                            <span className="text-sm font-medium text-white">{fileName}</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Ready to upload</span>
                         </div>
                      ) : (
                         <div className="space-y-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/50">
                                <Upload size={18} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-sm text-white/80 font-medium">Click to upload resume</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">PDF or Word · Max {MAX_FILE_LABEL}</p>
                            </div>
                         </div>
                      )}
                   </div>
                </FieldLabel>

                <button
                  type="submit"
                  className="w-full bg-white text-brand-dark hover:bg-brand-silver py-4 font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
                >
                  Submit application
                </button>

                <p className="text-center text-[10px] text-white/50 font-light tracking-[0.2em] uppercase">
                  Confidentiality guaranteed
                </p>
             </form>
           )}

           {step === 'submitting' && (
             <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
                <Loader2 size={32} className="animate-spin text-brand-silver" strokeWidth={1.5} />
                <p className="text-white/60 text-[11px] uppercase tracking-[0.3em] font-bold">Uploading & sending…</p>
             </div>
           )}

           {step === 'success' && (
             <div className="py-12 flex flex-col items-center justify-center text-center gap-8">
                <div className="w-20 h-20 rounded-full bg-brand-silver/10 flex items-center justify-center text-brand-silver">
                   <Check size={40} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                   <h4 className="text-2xl md:text-3xl font-medium text-white">Application received.</h4>
                   <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed font-light">
                     We&rsquo;ve got your details for <span className="text-white">{job.title}</span> and will be in touch if it&rsquo;s a fit.
                   </p>
                </div>
                <button
                    onClick={onClose}
                    className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 hover:border-white text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-sm hover:bg-white/5 transition-all"
                >
                   Close
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const FieldLabel: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em]">{text}</label>
    {children}
  </div>
);

export default ApplicationModal;
