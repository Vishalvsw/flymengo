import React, { useState } from 'react';
import { Briefcase, CheckCircle2, GraduationCap, Phone, Mail, Award, ArrowRight, Sparkles, Building2, UserCheck } from 'lucide-react';
import { CAREER_POSITIONS, JobPosition, BRAND_INFO } from '../data/travelData';
import { JobApplyModal } from './JobApplyModal';

export const CareersView: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const handleApplyClick = (job: JobPosition) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  return (
    <div className="py-14 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Flymego Tours Recruitment</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            Careers at Flymego Tours
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Join our growing travel and holiday consultancy team. We are actively hiring dedicated professionals who take pride in curating remarkable travel experiences.
          </p>

          <div className="mt-4 inline-flex items-center gap-4 text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>HR Direct: {BRAND_INFO.phone}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>{BRAND_INFO.email}</span>
            </span>
          </div>
        </div>

        {/* 2 Recruitment Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CAREER_POSITIONS.map((job) => {
            const isConsultant = job.id === 'holiday-consultant';
            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Visual badge top right */}
                <div className={`absolute top-0 right-0 px-4 py-1.5 text-[11px] font-bold rounded-bl-2xl ${
                  isConsultant ? 'bg-[#0B1B3D] text-[#FF9E40]' : 'bg-slate-100 text-slate-700'
                }`}>
                  {job.department}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B00] mb-5">
                    {isConsultant ? <Award className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#0B1B3D] mb-1">
                    {job.title}
                  </h3>

                  {/* Salary Highlight Box */}
                  <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Remuneration & Scale
                    </span>
                    <span className="font-display text-xl font-extrabold text-[#0B1B3D] block mt-0.5">
                      {job.salary}
                    </span>
                    {job.salaryNote && (
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {job.salaryNote}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {job.description}
                  </p>

                  {/* Eligibility & Experience */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-xs font-bold text-[#0B1B3D] flex items-center gap-1.5 mb-2">
                        <UserCheck className="w-4 h-4 text-[#FF6B00]" />
                        <span>Experience & Qualifications</span>
                      </span>
                      <p className="text-xs text-slate-700 font-semibold bg-blue-50/70 p-2.5 rounded-lg border border-blue-100/60">
                        {job.experienceRequired}
                      </p>
                    </div>

                    {/* Key Requirements List */}
                    <div>
                      <span className="text-xs font-bold text-slate-700 block mb-2">
                        Key Skills & Requirements:
                      </span>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {job.keyRequirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preferred Backgrounds */}
                    {job.preferredBackground.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Preferred Professional Background:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {job.preferredBackground.map((bg, i) => (
                            <span key={i} className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                              {bg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-6 border-t border-slate-100">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply for {job.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Direct submission to Flymego HR Desk
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Walk-in & Direct Email Strip */}
        <div className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 text-center">
          <h4 className="font-display text-sm font-bold text-[#0B1B3D] mb-1">
            Prefer direct resume submission?
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            You can email your updated CV directly to our recruitment desk or contact us on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <a
              href={`mailto:${BRAND_INFO.email}?subject=Job%20Application%20-%20Flymego%20Tours`}
              className="text-[#0B1B3D] hover:underline"
            >
              Email: {BRAND_INFO.email}
            </a>
            <span className="text-slate-300">|</span>
            <a
              href={`https://wa.me/918722207700?text=Hello%20Flymego%20HR%2C%20I%20am%20interested%20in%20applying%20for%20a%20job%20position.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              WhatsApp HR: +91 87222 07700
            </a>
          </div>
        </div>
      </div>

      <JobApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        selectedJob={selectedJob}
      />
    </div>
  );
};
