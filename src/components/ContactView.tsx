import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const ContactView: React.FC = () => {
  const { brandInfo, addHolidayEnquiry } = useTravel();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Holiday Enquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'FMT-MSG-' + Math.floor(1000 + Math.random() * 9000);
    addHolidayEnquiry({
      referenceId: ref,
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.subject,
      departureCity: 'Via Contact Form',
      travelDate: 'To be discussed',
      adults: '1',
      children: '0',
      budgetRange: 'Flexible',
      travelPreference: 'Direct Inquiry',
      additionalNotes: formData.message,
    });
    setSubmitted(true);
  };

  return (
    <div className="py-14 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>We are here to assist</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            Contact Flymego Tours
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Have questions about a holiday package, visa requirements, or flight bookings? Get in touch with our friendly travel advisory team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Card (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1B3D] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-blue-500/10 pointer-events-none" />

              <h2 className="font-display text-2xl font-bold mb-6">
                Consultancy Office
              </h2>

              <div className="space-y-6 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FF7A00]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${brandInfo.phoneRaw}`}
                      className="text-base font-bold text-white hover:text-[#FF7A00] transition-colors"
                    >
                      {brandInfo.phone}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Call for instant holiday & ticketing advisory</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FF7A00]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${brandInfo.email}`}
                      className="text-base font-bold text-white hover:text-[#FF7A00] transition-colors"
                    >
                      {brandInfo.email}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Send custom itinerary requests & group RFPs</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      WhatsApp Quick Desk
                    </span>
                    <a
                      href={brandInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>Chat on WhatsApp ({brandInfo.phone})</span>
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Fastest response for travel itineraries</p>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FF7A00]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Office Address (Placeholder)
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {brandInfo.officeAddress}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FF7A00]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Business Hours
                    </span>
                    <p className="text-xs text-slate-200 font-medium">
                      {brandInfo.businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Styled Map Placeholder */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#0B1B3D] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FF6B00]" />
                  <span>Location Map (Consultancy Center)</span>
                </span>
                <span className="text-[11px] text-slate-400">Bengaluru Center</span>
              </div>
              <div className="w-full h-44 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0B1B3D_1px,transparent_1px)] [background-size:12px_12px]" />
                <div className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-md mb-2 relative z-10">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-[#0B1B3D] relative z-10">Flymego Tours Consultancy</p>
                <p className="text-[11px] text-slate-500 relative z-10">Commercial Plaza, MG Road Junction, Bengaluru</p>
              </div>
            </div>
          </div>

          {/* Contact Enquiry Form (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md">
              <h2 className="font-display text-2xl font-bold text-[#0B1B3D] mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your details and message. A holiday consultant will respond promptly.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0B1B3D]">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || 'valued traveller'}</strong>. Our travel consultant will review your query and contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'General Holiday Enquiry', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-[#0B1B3D] bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 87222 07700"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Subject / Enquiry Type
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                      >
                        <option value="General Holiday Enquiry">General Holiday Enquiry</option>
                        <option value="International Tour Package">International Tour Package</option>
                        <option value="Domestic Kashmir / India Tour">Domestic Kashmir / India Tour</option>
                        <option value="Flight Tickets Booking">Flight Tickets Booking</option>
                        <option value="Corporate / Group Booking">Corporate / Group Booking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Message or Travel Questions *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the destinations you are interested in, tentative travel dates, number of people, or any specific questions..."
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
