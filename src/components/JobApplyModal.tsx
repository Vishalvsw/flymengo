import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, Briefcase, FileText, Sparkles } from 'lucide-react';
import { JobPosition, BRAND_INFO } from '../data/travelData';

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: JobPosition | null;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({
  isOpen,
  onClose,
  selectedJob,
}) => {
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [position, setPosition] = useState(selectedJob?.title || 'Ticketing Agent');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Sync if selectedJob changes
  React.useEffect(() => {
    if (selectedJob) {
      setPosition(selectedJob.title);
    }
  }, [selectedJob]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setCandidateName('');
    setCandidatePhone('');
    setCandidateEmail('');
    setExperience('');
    setQualification('');
    setFileName(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0B1B3D]">
              Application Submitted!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{candidateName}</strong>. Your job application for the role of <strong>{position}</strong> has been received by Flymego Tours HR.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left text-slate-600 space-y-1 my-4">
              <div><strong>Contact:</strong> {candidatePhone} | {candidateEmail}</div>
              <div><strong>Experience:</strong> {experience || 'Fresher / Under review'}</div>
              {fileName && <div><strong>Attached Resume:</strong> {fileName}</div>}
            </div>
            <p className="text-[11px] text-slate-400">
              Shortlisted candidates will be contacted via telephone or WhatsApp at +91 87222 07700.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-[#1E3A8A]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-orange-50 text-[#FF6B00] text-[11px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Join Flymego Tours Team</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0B1B3D]">
                Job Application Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Based on our official recruitment drive. Please provide your contact and background details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Position selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Position Applied For *
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                >
                  <option value="Ticketing Agent">Ticketing Agent (Up to ₹12,000/month)</option>
                  <option value="Holiday Consultant">Holiday Consultant (₹15,000+ / 4 Yrs Exp)</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Email & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relevant Experience *
                  </label>
                  <input
                    type="text"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 4 years / Fresher"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Educational / Professional Background */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Educational / Professional Background
                </label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. Travel & Tourism, B.Ed, Teaching, Banking, or Accounting"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                />
              </div>

              {/* Resume Upload UI */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Resume / CV (PDF or DOC)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-[#FF6B00] transition-colors relative cursor-pointer bg-slate-50">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-1.5">
                    <UploadCloud className="w-6 h-6 text-[#FF6B00]" />
                    <span className="text-xs font-medium text-slate-700">
                      {fileName ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {fileName}
                        </span>
                      ) : (
                        'Click to browse or drop resume file here'
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400">Supported formats: PDF, DOCX (Max 5MB)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 transition-all"
                >
                  Submit Application
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                You can also email your CV directly to <span className="font-semibold text-slate-600">{BRAND_INFO.email}</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
