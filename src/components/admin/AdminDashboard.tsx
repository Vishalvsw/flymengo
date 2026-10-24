import React, { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  Plane,
  Package,
  MapPin,
  Flame,
  Briefcase,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  LogOut,
  ArrowLeft,
  X,
  Phone,
  Mail,
  User,
  Calendar,
  DollarSign,
  FileText,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  useTravel,
  EnrichedHolidayEnquiry,
  EnrichedFlightEnquiry,
  EnrichedJobApplication,
  AdminPromoOffer,
} from '../../context/TravelContext';
import { HolidayPackage, Destination } from '../../data/travelData';

type AdminTab =
  | 'overview'
  | 'holidays'
  | 'flights'
  | 'packages'
  | 'destinations'
  | 'promos'
  | 'careers'
  | 'settings';

interface AdminDashboardProps {
  onExitToStorefront: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExitToStorefront }) => {
  const {
    brandInfo,
    updateBrandInfo,
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    promoOffers,
    addPromoOffer,
    updatePromoOffer,
    deletePromoOffer,
    togglePromoOffer,
    holidayEnquiries,
    updateHolidayEnquiryStatus,
    deleteHolidayEnquiry,
    flightEnquiries,
    updateFlightEnquiryStatus,
    deleteFlightEnquiry,
    jobApplications,
    updateJobApplicationStatus,
    deleteJobApplication,
    adminLogout,
    resetAllToDefaults,
  } = useTravel();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search & Filter States
  const [holidaySearch, setHolidaySearch] = useState('');
  const [holidayStatusFilter, setHolidayStatusFilter] = useState('All');

  const [flightSearch, setFlightSearch] = useState('');
  const [flightStatusFilter, setFlightStatusFilter] = useState('All');

  const [packageSearch, setPackageSearch] = useState('');
  const [packageTypeFilter, setPackageTypeFilter] = useState('All');

  // Modal states
  const [selectedHolidayEnq, setSelectedHolidayEnq] = useState<EnrichedHolidayEnquiry | null>(null);
  const [selectedFlightEnq, setSelectedFlightEnq] = useState<EnrichedFlightEnquiry | null>(null);
  const [selectedJobApp, setSelectedJobApp] = useState<EnrichedJobApplication | null>(null);

  // Package Form modal
  const [editingPackage, setEditingPackage] = useState<HolidayPackage | null>(null);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  // Destination Form modal
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);

  // Promo Form modal
  const [editingPromo, setEditingPromo] = useState<AdminPromoOffer | null>(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState({ ...brandInfo });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // KPIs
  const newHolidayCount = holidayEnquiries.filter((e) => e.status === 'New').length;
  const newFlightCount = flightEnquiries.filter((f) => f.status === 'New').length;
  const pendingJobsCount = jobApplications.filter((j) => j.status === 'Applied' || j.status === 'Reviewing').length;

  // Filtered queries
  const filteredHolidays = holidayEnquiries.filter((e) => {
    const matchesSearch =
      e.fullName.toLowerCase().includes(holidaySearch.toLowerCase()) ||
      e.destination.toLowerCase().includes(holidaySearch.toLowerCase()) ||
      e.phone.includes(holidaySearch) ||
      e.referenceId.toLowerCase().includes(holidaySearch.toLowerCase());
    const matchesStatus = holidayStatusFilter === 'All' || e.status === holidayStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredFlights = flightEnquiries.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(flightSearch.toLowerCase()) ||
      f.from.toLowerCase().includes(flightSearch.toLowerCase()) ||
      f.to.toLowerCase().includes(flightSearch.toLowerCase()) ||
      f.phone.includes(flightSearch) ||
      f.referenceId.toLowerCase().includes(flightSearch.toLowerCase());
    const matchesStatus = flightStatusFilter === 'All' || f.status === flightStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPackages = packages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(packageSearch.toLowerCase()) ||
      p.destination.toLowerCase().includes(packageSearch.toLowerCase());
    const matchesType = packageTypeFilter === 'All' || p.type === packageTypeFilter;
    return matchesSearch && matchesType;
  });

  // Export CSV
  const handleExportHolidaysCSV = () => {
    const headers = ['Reference ID', 'Name', 'Phone', 'Email', 'Destination', 'Travel Date', 'Status', 'Created At'];
    const rows = holidayEnquiries.map((e) => [
      e.referenceId,
      `"${e.fullName}"`,
      `"${e.phone}"`,
      e.email,
      e.destination,
      `"${e.travelDate}"`,
      e.status,
      `"${e.createdAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Flymego_Holiday_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandInfo(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Admin Top Bar */}
      <header className="bg-[#07152E] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0B1B3D] border border-white/15 flex items-center justify-center text-white">
              <Plane className="w-5 h-5 text-[#FF7A00] transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-tight">FLYMEGO</span>
                <span className="font-display font-bold text-lg text-[#FF7A00]">ADMIN</span>
                <span className="text-[10px] bg-white/10 text-orange-200 px-2 py-0.5 rounded font-mono">
                  MANAGEMENT PORTAL
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitToStorefront}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={() => {
                adminLogout();
                onExitToStorefront();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('holidays')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'holidays'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#FF7A00]" />
                <span>Holiday Enquiries</span>
              </div>
              {newHolidayCount > 0 && (
                <span className="bg-[#FF6B00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {newHolidayCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('flights')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'flights'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Plane className="w-4 h-4 text-blue-500" />
                <span>Flight Ticketing Desk</span>
              </div>
              {newFlightCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {newFlightCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('packages')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'packages'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-emerald-500" />
                <span>Manage Packages</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{packages.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('destinations')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'destinations'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Featured Destinations</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{destinations.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('promos')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'promos'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-[#FF7A00]" />
                <span>Promotions & Marquee</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{promoOffers.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'careers'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <span>Hiring & Applications</span>
              </div>
              {pendingJobsCount > 0 && (
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingJobsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Agency Settings</span>
              </div>
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-[#0B1B3D] block">Admin Database</span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              All edits to packages, prices, destinations, and settings update the customer website in real time.
            </p>
            <button
              onClick={() => {
                if (confirm('Reset all demo data back to default initial values?')) {
                  resetAllToDefaults();
                }
              }}
              className="text-[11px] text-slate-400 hover:text-rose-600 font-semibold flex items-center gap-1 mt-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                  Agency Overview & Performance
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Summary of incoming inquiries, flight ticketing requests, inventory, and hiring.
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('holidays')}
                  className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 cursor-pointer hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-orange-900">Holiday Leads</span>
                    <Compass className="w-4 h-4 text-[#FF6B00]" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-[#0B1B3D] tabular-nums">
                    {holidayEnquiries.length}
                  </div>
                  <span className="text-[11px] text-orange-700 font-medium">
                    {newHolidayCount} pending review
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('flights')}
                  className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 cursor-pointer hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-900">Flight Enquiries</span>
                    <Plane className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-[#0B1B3D] tabular-nums">
                    {flightEnquiries.length}
                  </div>
                  <span className="text-[11px] text-blue-700 font-medium">
                    {newFlightCount} new ticketing requests
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('packages')}
                  className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 cursor-pointer hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-900">Active Packages</span>
                    <Package className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-[#0B1B3D] tabular-nums">
                    {packages.length}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {destinations.length} destinations live
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('careers')}
                  className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 cursor-pointer hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-900">Job Applicants</span>
                    <Briefcase className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-[#0B1B3D] tabular-nums">
                    {jobApplications.length}
                  </div>
                  <span className="text-[11px] text-purple-700 font-medium">
                    {pendingJobsCount} under review
                  </span>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-[#0B1B3D]">
                    Recent Inbound Holiday Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('holidays')}
                    className="text-xs text-[#FF6B00] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View All ({holidayEnquiries.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                      <tr>
                        <th className="py-3 px-4">Ref ID</th>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Dates</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {holidayEnquiries.slice(0, 4).map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">{enq.referenceId}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800 block">{enq.fullName}</span>
                            <span className="text-slate-400 text-[11px]">{enq.phone}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-800">{enq.destination}</td>
                          <td className="py-3 px-4 text-slate-600">{enq.travelDate}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                enq.status === 'New'
                                  ? 'bg-amber-100 text-amber-800'
                                  : enq.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedHolidayEnq(enq)}
                              className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-xs text-[#0B1B3D]">Quick Admin Shortcuts</h4>
                  <p className="text-[11px] text-slate-500">Quickly add or adjust products visible to travellers.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setEditingPackage(null);
                      setIsPackageModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-[#1E3A8A] flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>Add New Package</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingDestination(null);
                      setIsDestinationModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                    <span>Add Destination</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingPromo(null);
                      setIsPromoModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E65C00] flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Promo Offer</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOLIDAY ENQUIRIES */}
          {activeTab === 'holidays' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                    Holiday Package Enquiries & Leads
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage client holiday requests, assign consultant notes, and track booking status.
                  </p>
                </div>
                <button
                  onClick={handleExportHolidaysCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Leads (CSV)</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={holidaySearch}
                    onChange={(e) => setHolidaySearch(e.target.value)}
                    placeholder="Search by client name, destination, phone, or Ref ID..."
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={holidayStatusFilter}
                    onChange={(e) => setHolidayStatusFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New Only</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Itinerary Sent">Itinerary Sent</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-4">Client Details</th>
                      <th className="py-3 px-4">Destination & City</th>
                      <th className="py-3 px-4">Travel Date</th>
                      <th className="py-3 px-4">Travellers</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHolidays.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No matching holiday inquiries found.
                        </td>
                      </tr>
                    ) : (
                      filteredHolidays.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">
                            {enq.referenceId}
                            <span className="block font-sans text-[10px] text-slate-400 font-normal">
                              {enq.createdAt}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{enq.fullName}</span>
                            <a
                              href={`tel:${enq.phone}`}
                              className="text-slate-500 hover:text-[#FF6B00] text-[11px] block"
                            >
                              {enq.phone}
                            </a>
                            <span className="text-[11px] text-slate-400">{enq.email}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-[#0B1B3D] block">{enq.destination}</span>
                            <span className="text-[11px] text-slate-400">From {enq.departureCity || 'Not specified'}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-700">{enq.travelDate}</td>
                          <td className="py-3 px-4 text-slate-600">
                            {enq.adults} Adt{enq.children !== '0' ? `, ${enq.children} Chd` : ''}
                            <span className="block text-[10px] text-slate-400">{enq.travelPreference}</span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                updateHolidayEnquiryStatus(enq.id, e.target.value as EnrichedHolidayEnquiry['status'])
                              }
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-hidden ${
                                enq.status === 'New'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : enq.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : enq.status === 'Itinerary Sent'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Itinerary Sent">Itinerary Sent</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedHolidayEnq(enq)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                              title="View full notes"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete enquiry ${enq.referenceId}?`)) {
                                  deleteHolidayEnquiry(enq.id);
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FLIGHT ENQUIRIES */}
          {activeTab === 'flights' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                    Flight Ticketing Desk Requests
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Track airfare quote inquiries from travellers and update quoted flight options.
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={flightSearch}
                    onChange={(e) => setFlightSearch(e.target.value)}
                    placeholder="Search route, passenger name, phone..."
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <select
                  value={flightStatusFilter}
                  onChange={(e) => setFlightStatusFilter(e.target.value)}
                  className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Fare Quoted">Fare Quoted</option>
                  <option value="Option Selected">Option Selected</option>
                  <option value="Booked">Booked</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Flight Ref</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Route & Trip Type</th>
                      <th className="py-3 px-4">Travel Dates</th>
                      <th className="py-3 px-4">Class & Pax</th>
                      <th className="py-3 px-4">Ticketing Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredFlights.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No matching flight ticketing inquiries found.
                        </td>
                      </tr>
                    ) : (
                      filteredFlights.map((flt) => (
                        <tr key={flt.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">
                            {flt.referenceId}
                            <span className="block font-sans text-[10px] text-slate-400 font-normal">
                              {flt.createdAt}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{flt.name}</span>
                            <span className="text-[11px] text-slate-500">{flt.phone}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#0B1B3D] block">
                              {flt.from} ➔ {flt.to}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase font-semibold">
                              {flt.tripType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            <div>Dep: {flt.departureDate}</div>
                            {flt.returnDate !== 'N/A' && <div className="text-slate-400">Ret: {flt.returnDate}</div>}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            <div>{flt.passengers}</div>
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold">
                              {flt.cabinClass}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={flt.status}
                              onChange={(e) =>
                                updateFlightEnquiryStatus(flt.id, e.target.value as EnrichedFlightEnquiry['status'])
                              }
                              className="text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-200 bg-slate-50"
                            >
                              <option value="New">New</option>
                              <option value="Fare Quoted">Fare Quoted</option>
                              <option value="Option Selected">Option Selected</option>
                              <option value="Booked">Booked</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedFlightEnq(flt)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                              title="View notes"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete flight request ${flt.referenceId}?`)) {
                                  deleteFlightEnquiry(flt.id);
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE HOLIDAY PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                    Manage Holiday Packages
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add new holiday itineraries, edit descriptions, adjust tariff quotes, and update inclusions.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingPackage(null);
                    setIsPackageModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] shadow-md shadow-orange-500/20 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={packageSearch}
                    onChange={(e) => setPackageSearch(e.target.value)}
                    placeholder="Search package title or destination..."
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <select
                  value={packageTypeFilter}
                  onChange={(e) => setPackageTypeFilter(e.target.value)}
                  className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="All">All Types</option>
                  <option value="International">International</option>
                  <option value="Domestic">Domestic</option>
                </select>
              </div>

              {/* Packages Cards Grid in Admin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                            <span className="text-[#0B1B3D] font-bold">{pkg.type}</span>
                            <span>·</span>
                            <span>{pkg.destination}</span>
                            <span>·</span>
                            <span>{pkg.duration}</span>
                          </div>
                          <h4 className="font-display text-base font-bold text-[#0B1B3D] leading-snug mt-0.5">
                            {pkg.title}
                          </h4>
                          <span className="text-xs font-semibold text-[#FF6B00] block mt-1">
                            {pkg.pricePlaceholder}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {pkg.overview}
                      </p>

                      <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60 mb-4">
                        <span className="font-bold text-slate-700 block mb-1">
                          Itinerary Days: {pkg.itinerary.length} Days
                        </span>
                        <div className="line-clamp-1 text-slate-500">
                          Highlights: {pkg.highlights.join(' • ')}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">ID: {pkg.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingPackage(pkg);
                            setIsPackageModalOpen(true);
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-[#0B1B3D] bg-white border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete package "${pkg.title}"?`)) {
                              deletePackage(pkg.id);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FEATURED DESTINATIONS */}
          {activeTab === 'destinations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                    Featured Travel Destinations
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure spotlight destinations shown on the homepage and exploration catalog.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingDestination(null);
                    setIsDestinationModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] shadow-md shadow-orange-500/20 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Destination</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs flex flex-col justify-between"
                  >
                    <div className="relative h-32 bg-slate-900">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 text-white">
                        <span className="text-[10px] font-semibold text-[#FF7A00] uppercase">
                          {dest.type} · {dest.country}
                        </span>
                        <h4 className="font-display text-lg font-bold leading-tight">{dest.name}</h4>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                          {dest.description}
                        </p>
                        <div className="text-[11px] text-slate-500 space-y-1 mb-3">
                          <div><strong>Stay:</strong> {dest.durationSuggestion}</div>
                          <div><strong>Season:</strong> {dest.bestTimeToVisit}</div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setEditingDestination(dest);
                            setIsDestinationModalOpen(true);
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-[#0B1B3D] bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Remove destination "${dest.name}"?`)) {
                              deleteDestination(dest.id);
                            }
                          }}
                          className="text-xs text-rose-500 hover:text-rose-700 p-1.5"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROMOTIONS & MARQUEE */}
          {activeTab === 'promos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                    Promotions & Rotating Marquee
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage the top urgency banner that rotates deals to convert website visitors into inquiries.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingPromo(null);
                    setIsPromoModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E65C00] shadow-md shadow-orange-500/20 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Promotional Offer</span>
                </button>
              </div>

              <div className="space-y-3">
                {promoOffers.map((promo) => (
                  <div
                    key={promo.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      promo.active
                        ? 'bg-orange-50/40 border-orange-200'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <button
                        onClick={() => togglePromoOffer(promo.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider shrink-0 transition-colors ${
                          promo.active
                            ? 'bg-[#FF6B00] text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {promo.active ? 'ACTIVE' : 'DISABLED'}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-900 text-amber-300 font-extrabold px-1.5 py-0.5 rounded">
                            {promo.badge}
                          </span>
                          <span className="font-bold text-xs text-[#0B1B3D]">{promo.highlight}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{promo.text}</p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Expires note: {promo.expiresText} · Linked: {promo.destination}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => {
                          setEditingPromo(promo);
                          setIsPromoModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-[#0B1B3D] bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete promotional offer?')) {
                            deletePromoOffer(promo.id);
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: HIRING & CAREERS */}
          {activeTab === 'careers' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                  Job Applications & Recruitment Desk
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage candidate submissions for Ticketing Agent and Holiday Consultant positions.
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Position</th>
                      <th className="py-3 px-4">Experience & Qualifications</th>
                      <th className="py-3 px-4">Resume / CV</th>
                      <th className="py-3 px-4">Hiring Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{app.candidateName}</span>
                          <a href={`tel:${app.candidatePhone}`} className="text-slate-500 hover:text-[#FF6B00]">
                            {app.candidatePhone}
                          </a>
                          <span className="text-[11px] text-slate-400 block">{app.candidateEmail}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#0B1B3D] block">{app.position}</span>
                          <span className="text-[10px] text-slate-400">{app.createdAt}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <div><strong>Exp:</strong> {app.experience}</div>
                          <div className="text-[11px] text-slate-500">{app.qualification}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-emerald-700">
                          {app.fileName || 'Online Profile'}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              updateJobApplicationStatus(app.id, e.target.value as EnrichedJobApplication['status'])
                            }
                            className="text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-200 bg-slate-50"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => setSelectedJobApp(app)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete application from ${app.candidateName}?`)) {
                                deleteJobApplication(app.id);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: AGENCY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#0B1B3D]">
                  Agency Contact & Live Branding Settings
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update primary contact details, phone, WhatsApp message links, and office address shown across the entire website.
                </p>
              </div>

              {settingsSaved && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Agency contact information updated successfully across the entire website!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          phone: e.target.value,
                          phoneRaw: e.target.value.replace(/[^0-9+]/g, ''),
                        })
                      }
                      className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Office Address</label>
                  <textarea
                    rows={2}
                    value={settingsForm.officeAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Hours</label>
                  <input
                    type="text"
                    value={settingsForm.businessHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#0B1B3D] hover:bg-[#1E3A8A] transition-colors shadow-sm"
                  >
                    Save & Update Website Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* DETAIL MODAL: Holiday Enquiry Review */}
      {selectedHolidayEnq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedHolidayEnq(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              Lead Ref: {selectedHolidayEnq.referenceId}
            </span>
            <h3 className="font-display text-xl font-bold text-[#0B1B3D] mt-0.5">
              Holiday Enquiry Details
            </h3>

            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Client:</span>
                <span className="font-bold text-slate-800">{selectedHolidayEnq.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <a href={`tel:${selectedHolidayEnq.phone}`} className="font-bold text-[#FF6B00]">
                  {selectedHolidayEnq.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-medium text-slate-800">{selectedHolidayEnq.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-[#0B1B3D]">{selectedHolidayEnq.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Departure City:</span>
                <span className="text-slate-800">{selectedHolidayEnq.departureCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travel Date:</span>
                <span className="text-slate-800">{selectedHolidayEnq.travelDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travellers:</span>
                <span className="text-slate-800">
                  {selectedHolidayEnq.adults} Adults, {selectedHolidayEnq.children} Children
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Budget:</span>
                <span className="text-slate-800">{selectedHolidayEnq.budgetRange}</span>
              </div>
              {selectedHolidayEnq.additionalNotes && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block mb-1">Client Notes:</span>
                  <p className="text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200/60">
                    "{selectedHolidayEnq.additionalNotes}"
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Internal Consultant Notes
                </label>
                <textarea
                  rows={2}
                  defaultValue={selectedHolidayEnq.adminNotes || ''}
                  onBlur={(e) =>
                    updateHolidayEnquiryStatus(
                      selectedHolidayEnq.id,
                      selectedHolidayEnq.status,
                      e.target.value
                    )
                  }
                  placeholder="e.g. Called client on WhatsApp. Sent 4-star hotel quotation..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${selectedHolidayEnq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(
                    selectedHolidayEnq.fullName
                  )}%2C%20greetings%20from%20Flymego%20Tours!%20Regarding%20your%20holiday%20enquiry%20for%20${encodeURIComponent(
                    selectedHolidayEnq.destination
                  )}...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 text-center hover:bg-emerald-100"
                >
                  Chat on WhatsApp
                </a>
                <button
                  onClick={() => setSelectedHolidayEnq(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#0B1B3D]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL: Flight Enquiry Review */}
      {selectedFlightEnq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedFlightEnq(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              Flight Desk: {selectedFlightEnq.referenceId}
            </span>
            <h3 className="font-display text-xl font-bold text-[#0B1B3D] mt-0.5">
              Flight Ticket Request
            </h3>

            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Route:</span>
                <span className="font-bold text-slate-800">
                  {selectedFlightEnq.from} ➔ {selectedFlightEnq.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Passenger / Client:</span>
                <span className="font-bold text-slate-800">{selectedFlightEnq.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <a href={`tel:${selectedFlightEnq.phone}`} className="font-bold text-[#FF6B00]">
                  {selectedFlightEnq.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dates:</span>
                <span>
                  Dep: {selectedFlightEnq.departureDate}
                  {selectedFlightEnq.returnDate !== 'N/A' && ` | Ret: ${selectedFlightEnq.returnDate}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Class & Count:</span>
                <span>
                  {selectedFlightEnq.passengers} · {selectedFlightEnq.cabinClass}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ticketing Agent Notes / Quoted Airline
              </label>
              <textarea
                rows={2}
                defaultValue={selectedFlightEnq.adminNotes || ''}
                onBlur={(e) =>
                  updateFlightEnquiryStatus(
                    selectedFlightEnq.id,
                    selectedFlightEnq.status,
                    e.target.value
                  )
                }
                placeholder="e.g. Indigo / Air India quoted ₹18,500 return..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white mb-4"
              />
            </div>

            <button
              onClick={() => setSelectedFlightEnq(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3D]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL: Job Application Review */}
      {selectedJobApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedJobApp(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-[#0B1B3D]">
              Candidate: {selectedJobApp.candidateName}
            </h3>
            <p className="text-xs text-[#FF6B00] font-semibold">{selectedJobApp.position}</p>

            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div><strong>Phone:</strong> {selectedJobApp.candidatePhone}</div>
              <div><strong>Email:</strong> {selectedJobApp.candidateEmail}</div>
              <div><strong>Experience:</strong> {selectedJobApp.experience}</div>
              <div><strong>Background:</strong> {selectedJobApp.qualification}</div>
              <div><strong>File Name:</strong> {selectedJobApp.fileName || 'Online Application'}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recruiter / Interview Notes
              </label>
              <textarea
                rows={2}
                defaultValue={selectedJobApp.adminNotes || ''}
                onBlur={(e) =>
                  updateJobApplicationStatus(
                    selectedJobApp.id,
                    selectedJobApp.status,
                    e.target.value
                  )
                }
                placeholder="e.g. Called candidate. Good fluency. Scheduled F2F interview..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white mb-4"
              />
            </div>

            <button
              onClick={() => setSelectedJobApp(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3D]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD / EDIT PACKAGE MODAL */}
      {isPackageModalOpen && (
        <PackageFormModal
          pkg={editingPackage}
          onClose={() => setIsPackageModalOpen(false)}
          onSave={(pkgData) => {
            if (editingPackage) {
              updatePackage(editingPackage.id, pkgData);
            } else {
              addPackage({
                ...pkgData,
                id: 'pkg-' + Date.now(),
              } as HolidayPackage);
            }
            setIsPackageModalOpen(false);
          }}
        />
      )}

      {/* ADD / EDIT DESTINATION MODAL */}
      {isDestinationModalOpen && (
        <DestinationFormModal
          dest={editingDestination}
          onClose={() => setIsDestinationModalOpen(false)}
          onSave={(destData) => {
            if (editingDestination) {
              updateDestination(editingDestination.id, destData);
            } else {
              const safeName = destData.name ? destData.name.toLowerCase().replace(/\s+/g, '-') : 'dest-' + Date.now();
              addDestination({
                ...destData,
                id: safeName,
              } as Destination);
            }
            setIsDestinationModalOpen(false);
          }}
        />
      )}

      {/* ADD / EDIT PROMO MODAL */}
      {isPromoModalOpen && (
        <PromoFormModal
          promo={editingPromo}
          onClose={() => setIsPromoModalOpen(false)}
          onSave={(promoData) => {
            if (editingPromo) {
              updatePromoOffer(editingPromo.id, promoData);
            } else {
              addPromoOffer({
                ...promoData,
                id: 'promo-' + Date.now(),
                active: true,
              } as AdminPromoOffer);
            }
            setIsPromoModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Sub-component: Package Form Modal
function PackageFormModal({
  pkg,
  onClose,
  onSave,
}: {
  pkg: HolidayPackage | null;
  onClose: () => void;
  onSave: (data: Partial<HolidayPackage>) => void;
}) {
  const [title, setTitle] = useState(pkg?.title || '');
  const [destination, setDestination] = useState(pkg?.destination || 'Dubai');
  const [country, setCountry] = useState(pkg?.country || 'UAE');
  const [type, setType] = useState<'International' | 'Domestic'>(pkg?.type || 'International');
  const [category, setCategory] = useState<'Family' | 'Honeymoon' | 'Adventure' | 'Leisure'>(
    pkg?.category || 'Family'
  );
  const [duration, setDuration] = useState(pkg?.duration || '5 Days / 4 Nights');
  const [pricePlaceholder, setPricePlaceholder] = useState(
    pkg?.pricePlaceholder || 'Starting from ₹35,000 / person'
  );
  const [overview, setOverview] = useState(pkg?.overview || '');
  const [image, setImage] = useState(pkg?.image || '/src/assets/images/dest_dubai_skyline_1792831851592.jpg');
  const [highlightsText, setHighlightsText] = useState(pkg?.highlights.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      destination,
      country,
      type,
      category,
      duration,
      pricePlaceholder,
      overview,
      image,
      highlights: highlightsText.split('\n').filter((h) => h.trim().length > 0),
      inclusions: pkg?.inclusions || [
        '4-Star Hotel Accommodation',
        'Daily Breakfast',
        'Airport Transfers',
        'Sightseeing Tours',
      ],
      exclusions: pkg?.exclusions || ['Personal expenses', 'Airfares'],
      itinerary: pkg?.itinerary || [
        { day: 1, title: 'Arrival & Welcome', details: 'Check in and leisure afternoon.' },
        { day: 2, title: 'City Highlights Tour', details: 'Visit iconic landmarks.' },
      ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-display text-xl font-bold text-[#0B1B3D] mb-4">
          {pkg ? 'Edit Holiday Package' : 'Create New Holiday Package'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Package Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dubai Luxury & Desert Safari"
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Destination *</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              >
                <option value="International">International</option>
                <option value="Domestic">Domestic</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5 Days / 4 Nights"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pricing Placeholder</label>
            <input
              type="text"
              value={pricePlaceholder}
              onChange={(e) => setPricePlaceholder(e.target.value)}
              placeholder="Starting from ₹..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Overview Description</label>
            <textarea
              rows={2}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Key Highlights (1 per line)</label>
            <textarea
              rows={3}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Burj Khalifa visit&#10;Desert Safari 4x4&#10;Marina Dhow Cruise"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3D]"
            >
              Save Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub-component: Destination Form Modal
function DestinationFormModal({
  dest,
  onClose,
  onSave,
}: {
  dest: Destination | null;
  onClose: () => void;
  onSave: (data: Partial<Destination>) => void;
}) {
  const [name, setName] = useState(dest?.name || '');
  const [country, setCountry] = useState(dest?.country || '');
  const [tagline, setTagline] = useState(dest?.tagline || '');
  const [type, setType] = useState<'International' | 'Domestic'>(dest?.type || 'International');
  const [durationSuggestion, setDurationSuggestion] = useState(dest?.durationSuggestion || '5 to 6 Days');
  const [bestTimeToVisit, setBestTimeToVisit] = useState(dest?.bestTimeToVisit || 'Oct to Apr');
  const [description, setDescription] = useState(dest?.description || '');
  const [image, setImage] = useState(dest?.image || '/src/assets/images/dest_dubai_skyline_1792831851592.jpg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      country,
      tagline,
      type,
      durationSuggestion,
      bestTimeToVisit,
      description,
      image,
      keyHighlights: dest?.keyHighlights || ['City Tours', 'Cultural Sights'],
      popularAttractions: dest?.popularAttractions || ['Main Landmark', 'Heritage Spot'],
      startingQuotePlaceholder: 'Custom quotes on request',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-display text-xl font-bold text-[#0B1B3D] mb-4">
          {dest ? 'Edit Destination' : 'Add New Destination'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Switzerland"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              >
                <option value="International">International</option>
                <option value="Domestic">Domestic</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Alpine Peaks & Serene Lakes"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Stay Duration</label>
              <input
                type="text"
                value={durationSuggestion}
                onChange={(e) => setDurationSuggestion(e.target.value)}
                placeholder="e.g. 6 to 7 Days"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Best Season</label>
              <input
                type="text"
                value={bestTimeToVisit}
                onChange={(e) => setBestTimeToVisit(e.target.value)}
                placeholder="e.g. May to September"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3D]"
            >
              Save Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub-component: Promo Form Modal
function PromoFormModal({
  promo,
  onClose,
  onSave,
}: {
  promo: AdminPromoOffer | null;
  onClose: () => void;
  onSave: (data: Partial<AdminPromoOffer>) => void;
}) {
  const [badge, setBadge] = useState(promo?.badge || 'FLASH SALE');
  const [highlight, setHighlight] = useState(promo?.highlight || 'Special Deal:');
  const [text, setText] = useState(promo?.text || '');
  const [expiresText, setExpiresText] = useState(promo?.expiresText || 'Limited time offer');
  const [destination, setDestination] = useState(promo?.destination || 'Dubai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      badge,
      highlight,
      text,
      expiresText,
      destination,
      offerNote: `[${badge}] ${highlight} ${text}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-display text-xl font-bold text-[#0B1B3D] mb-4">
          {promo ? 'Edit Promo Marquee Offer' : 'Add Promo Marquee Offer'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency Badge</label>
            <input
              type="text"
              required
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. FLASH SALE, EARLY BIRD"
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Headline Highlight</label>
            <input
              type="text"
              required
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="e.g. Dubai Super Saver:"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Offer Details Text</label>
            <textarea
              rows={2}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Flat ₹5,000 Off on 5D/4N Packages + Free Desert Safari"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Expires Note</label>
              <input
                type="text"
                value={expiresText}
                onChange={(e) => setExpiresText(e.target.value)}
                placeholder="e.g. Valid this week"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Dubai"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#FF6B00]"
            >
              Save Promo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
