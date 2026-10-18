import React, { useState } from 'react';
import { 
  CheckSquare, 
  Trophy, 
  Gauge, 
  Kanban, 
  ArrowUpRight, 
  TrendingDown, 
  Star, 
  Zap, 
  Shield, 
  Sparkles, 
  Clock, 
  Download, 
  Filter, 
  CheckCircle2, 
  Check, 
  Layers, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { DomainMetric, WorkDeliverable, SprintBanner, TimeframeOption } from '../types';

interface VelocityAnalyticsViewProps {
  domains: DomainMetric[];
  deliverables: WorkDeliverable[];
  sprintBanners: SprintBanner[];
  selectedTimeframe: TimeframeOption;
  onTimeframeChange: (t: TimeframeOption) => void;
  onOpenReportModal: () => void;
  onSelectDeliverable: (d: WorkDeliverable) => void;
  searchFilter: string;
}

export const VelocityAnalyticsView: React.FC<VelocityAnalyticsViewProps> = ({
  domains,
  deliverables,
  sprintBanners,
  selectedTimeframe,
  onTimeframeChange,
  onOpenReportModal,
  onSelectDeliverable,
  searchFilter,
}) => {
  const [matrixMetricMode, setMatrixMetricMode] = useState<'volume' | 'speed'>('volume');
  const [tableFilter, setTableFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // Filter deliverables based on global search & local table filter
  const effectiveFilter = (tableFilter || searchFilter).toLowerCase();
  const filteredDeliverables = deliverables.filter((item) => {
    if (!effectiveFilter) return true;
    return (
      item.title.toLowerCase().includes(effectiveFilter) ||
      item.scope.toLowerCase().includes(effectiveFilter) ||
      item.domainName.toLowerCase().includes(effectiveFilter) ||
      item.leadAssignee.name.toLowerCase().includes(effectiveFilter)
    );
  });

  const totalPages = Math.ceil(filteredDeliverables.length / itemsPerPage) || 1;
  const currentDeliverables = filteredDeliverables.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-7 pb-16">
      
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-[28px] font-extrabold text-[#0b1c30] tracking-tight">
            Cross-Domain Velocity & Performance Intelligence
          </h1>
          <p className="text-xs lg:text-[13px] text-[#434655] mt-1 max-w-3xl">
            Real-time telemetry on completed work volume, domain workload share, turnaround speed (TAT), and sprint delivery velocity.
          </p>
        </div>

        {/* Right Filter Pills & Download Action */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Pill Group */}
          <div className="inline-flex p-1 bg-white rounded-full border border-[#cbdbf5] shadow-2xs">
            {[
              { id: 'all-time', label: 'All Time' },
              { id: 'spring-2025', label: 'Spring 2025 (Active)' },
              { id: 'last-30', label: 'Last 30 Days' },
              { id: 'this-week', label: 'This Week' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => onTimeframeChange(opt.id as TimeframeOption)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  selectedTimeframe === opt.id
                    ? 'bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5] shadow-2xs'
                    : 'text-[#434655] hover:text-[#0b1c30]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#004ac6] hover:bg-[#1d4ed8] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Velocity Report (CSV/PDF)</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat KPI Cards (From Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Works Completed */}
        <div className="bg-white rounded-2xl p-5 border border-[#cbdbf5] shadow-2xs relative flex flex-col justify-between hover:border-[#004ac6]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center border border-[#cbdbf5]">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ArrowUpRight className="w-3 h-3" />
                +24% vs prior
              </span>
            </div>
            <div className="text-2xl lg:text-[26px] font-extrabold text-[#0b1c30] tracking-tight">
              46 Works Completed
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-[#e5eeff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '88.5%' }}></div>
            </div>
            <div className="text-[11px] text-[#737686] font-semibold mt-1.5 text-right">
              88.5% on-time
            </div>
          </div>
        </div>

        {/* KPI 2: Technical Domain */}
        <div className="bg-white rounded-2xl p-5 border border-[#cbdbf5] shadow-2xs relative flex flex-col justify-between hover:border-[#004ac6]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center border border-[#cbdbf5]">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5]">
                <Star className="w-3 h-3 fill-[#004ac6]" />
                #1 Output
              </span>
            </div>
            <div className="text-2xl lg:text-[26px] font-extrabold text-[#0b1c30] tracking-tight">
              Technical Domain
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#434655]">
            <span>16 Works Total</span>
            <span className="text-[#004ac6] font-bold">34.8% Share</span>
          </div>
        </div>

        {/* KPI 3: Turnaround Speed (TAT) */}
        <div className="bg-white rounded-2xl p-5 border border-[#cbdbf5] shadow-2xs relative flex flex-col justify-between hover:border-[#004ac6]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#eafbf7] text-[#006058] flex items-center justify-center border border-[#b3fff3]">
                <Gauge className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#eafbf7] text-[#006058] border border-[#b3fff3]">
                <TrendingDown className="w-3 h-3" />
                -1.4d from 3.8d
              </span>
            </div>
            <div className="text-2xl lg:text-[26px] font-extrabold text-[#0b1c30] tracking-tight">
              2.4 Days
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-[#737686]">
            Club-wide Turnaround Velocity (TAT)
          </div>
        </div>

        {/* KPI 4: WIP Pipeline */}
        <div className="bg-white rounded-2xl p-5 border border-[#cbdbf5] shadow-2xs relative flex flex-col justify-between hover:border-[#004ac6]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center border border-[#cbdbf5]">
                <Kanban className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span>
                WIP Balanced
              </span>
            </div>
            <div className="text-2xl lg:text-[26px] font-extrabold text-[#0b1c30] tracking-tight">
              19 in Pipeline
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-[#737686]">
            No domain exceeding max WIP quota
          </div>
        </div>

      </div>

      {/* Main Grid: Left Section (Matrix + Sprints + Ledger) and Right Section (Status & Quota rail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Primary Section (spans 12 columns or 9 depending on layout) */}
        <div className="lg:col-span-12 space-y-7">
          
          {/* Domain Workload & Velocity Matrix */}
          <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#0b1c30]">Domain Workload & Velocity Matrix</h2>
                <p className="text-xs text-[#737686]">
                  Cross-functional volume comparison, speed, and sub-department efficiency
                </p>
              </div>

              {/* Mode toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMatrixMetricMode('volume')}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                    matrixMetricMode === 'volume'
                      ? 'bg-[#eff4ff] text-[#004ac6] border-[#cbdbf5]'
                      : 'text-[#737686] border-transparent hover:text-[#0b1c30]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
                  Volume
                </button>
                <button
                  onClick={() => setMatrixMetricMode('speed')}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                    matrixMetricMode === 'speed'
                      ? 'bg-[#eff4ff] text-[#004ac6] border-[#cbdbf5]'
                      : 'text-[#737686] border-transparent hover:text-[#0b1c30]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#006058]"></span>
                  Speed Rate
                </button>
              </div>
            </div>

            {/* 6 Domain Cards in 2-column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domains.map((domain) => {
                const getRatingIcon = () => {
                  switch (domain.ratingIcon) {
                    case 'star':
                      return <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />;
                    case 'lightning':
                      return <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />;
                    case 'shield':
                      return <Shield className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />;
                    case 'sparkle':
                      return <Sparkles className="w-3.5 h-3.5 text-[#004ac6]" />;
                    default:
                      return <Clock className="w-3.5 h-3.5 text-[#737686]" />;
                  }
                };

                return (
                  <div
                    key={domain.id}
                    className="p-5 rounded-2xl bg-[#f8f9ff] border border-[#cbdbf5] hover:border-[#004ac6]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Rank, Domain Name, Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            #{domain.rank}
                          </span>
                          <div>
                            <h3 className="text-sm font-bold text-[#0b1c30] leading-tight">
                              {domain.name}
                            </h3>
                            <div className="text-[11px] font-semibold text-[#004ac6] mt-0.5">
                              {domain.championTag}
                            </div>
                          </div>
                        </div>

                        {/* Works & Share Badge */}
                        <div className="text-right bg-[#eff4ff] border border-[#cbdbf5] px-2.5 py-1 rounded-xl">
                          <div className="text-xs font-extrabold text-[#004ac6] leading-none">
                            {domain.worksCount} Works
                          </div>
                          <div className="text-[10px] text-[#737686] font-medium mt-0.5">
                            ({domain.sharePercentage}%)
                          </div>
                        </div>
                      </div>

                      {/* Turnaround Speed */}
                      <div className="flex items-center justify-between text-xs mt-4">
                        <span className="text-[#737686] font-medium">Turnaround Speed</span>
                        <span className="font-bold text-[#0b1c30]">
                          {domain.tatDays} Days {domain.tatBadge ? `(${domain.tatBadge})` : ''}
                        </span>
                      </div>

                      {/* On-Time Completion Bar */}
                      <div className="mt-2.5">
                        <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                          <span className="text-[#737686]">On-Time Completion</span>
                          <span className="text-[#004ac6]">{domain.onTimePercentage}%</span>
                        </div>
                        <div className="w-full bg-[#cbdbf5]/50 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#004ac6]"
                            style={{ width: `${domain.onTimePercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Sub-departments pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3.5">
                        {domain.subDepartments.map((sub, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-white border border-[#cbdbf5] text-[#434655]"
                          >
                            {sub.name} <span className="text-[#004ac6] font-bold">({sub.count})</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Rating footer */}
                    <div className="mt-4 pt-3 border-t border-[#cbdbf5]/50 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#434655] font-semibold">
                        <span>Rating:</span>
                        {getRatingIcon()}
                        <span>{domain.rating}</span>
                      </div>
                      <span className="text-[10px] text-[#737686]">
                        WIP: {domain.currentWip}/{domain.maxWipQuota}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Project Sprint Banners (From Screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sprintBanners.map((banner) => (
              <div
                key={banner.id}
                className="group relative rounded-2xl overflow-hidden h-44 shadow-2xs border border-[#cbdbf5] cursor-pointer"
                onClick={() => {
                  const matched = deliverables.find((d) => d.domainId === banner.domainId);
                  if (matched) onSelectDeliverable(matched);
                }}
              >
                {/* Background photo */}
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

                {/* Banner Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs border border-white/20 mb-1.5">
                    {banner.category}
                  </span>
                  <h4 className="text-sm font-bold leading-tight group-hover:text-blue-200 transition-colors">
                    {banner.title}
                  </h4>
                  <p className="text-[11px] text-gray-300 mt-1 leading-snug">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent High-Velocity Work Deliverables Ledger */}
          <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-4">
            
            {/* Header & Filter Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center border border-[#cbdbf5]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0b1c30]">
                    Recent High-Velocity Work Deliverables
                  </h3>
                  <p className="text-[11px] text-[#737686]">
                    Live audit ledger of club work packages closed within the active term
                  </p>
                </div>
              </div>

              {/* Table search filter */}
              <div className="relative">
                <Filter className="w-3.5 h-3.5 text-[#737686] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter deliverables..."
                  value={tableFilter}
                  onChange={(e) => {
                    setTableFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-8 pr-3 py-1.5 text-xs text-[#0b1c30] bg-[#f8f9ff] rounded-xl border border-[#cbdbf5] focus:outline-none focus:border-[#004ac6]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#e5eeff]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f8f9ff] text-[10px] uppercase font-bold text-[#737686] tracking-wider border-b border-[#e5eeff]">
                    <th className="py-3 px-4">WORK DELIVERABLE & SCOPE</th>
                    <th className="py-3 px-4">DOMAIN / DEPT</th>
                    <th className="py-3 px-4">LEAD ASSIGNEE</th>
                    <th className="py-3 px-4">TURNAROUND (TAT)</th>
                    <th className="py-3 px-4">DELIVERY PERFORMANCE</th>
                    <th className="py-3 px-4 text-center">VERIFICATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff]">
                  {currentDeliverables.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-[#737686]">
                        No deliverables found matching your search.
                      </td>
                    </tr>
                  ) : (
                    currentDeliverables.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => onSelectDeliverable(item)}
                        className="hover:bg-[#f8f9ff] cursor-pointer transition-colors group"
                      >
                        {/* Title & Scope */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-bold text-[#0b1c30] group-hover:text-[#004ac6] transition-colors leading-snug">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#737686] mt-0.5 truncate">
                            {item.scope}
                          </div>
                        </td>

                        {/* Domain / Dept */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5]">
                            {item.domainName} • {item.subDept}
                          </span>
                        </td>

                        {/* Lead Assignee */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${item.leadAssignee.avatarColor} text-white flex items-center justify-center font-bold text-[10px]`}>
                              {item.leadAssignee.avatarLetter}
                            </div>
                            <span className="font-semibold text-[#0b1c30] text-xs">
                              {item.leadAssignee.name}
                            </span>
                          </div>
                        </td>

                        {/* Turnaround TAT */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-bold text-[#0b1c30]">
                          {item.tatDays} Days
                        </td>

                        {/* Delivery Performance */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.deliveryPerformance.variant === 'success'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.deliveryPerformance.variant === 'info'
                              ? 'bg-blue-50 text-[#004ac6] border border-blue-200'
                              : 'bg-gray-100 text-[#434655] border border-gray-200'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {item.deliveryPerformance.label}
                          </span>
                        </td>

                        {/* Verification */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center" title={`Verified by ${item.verification.verifiedBy}`}>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination & Status Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-[#737686]">
              <div>
                Showing latest {currentDeliverables.length} of {deliverables.length} closed works for Active Spring 2025
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-[#cbdbf5] text-xs font-semibold text-[#434655] hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#004ac6] text-white'
                        : 'border border-[#cbdbf5] text-[#434655] hover:bg-[#eff4ff]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-[#cbdbf5] text-xs font-semibold text-[#434655] hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
