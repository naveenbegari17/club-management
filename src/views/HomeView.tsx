import React from 'react';
import { 
  BarChart3, 
  Layers, 
  Sparkles, 
  Clock, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { NavigationTab, DomainMetric, WorkDeliverable } from '../types';

interface HomeViewProps {
  onNavigate: (tab: NavigationTab) => void;
  domains: DomainMetric[];
  deliverables: WorkDeliverable[];
  onOpenCreateWork: () => void;
  onSelectDeliverable: (d: WorkDeliverable) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  domains,
  deliverables,
  onOpenCreateWork,
  onSelectDeliverable,
}) => {
  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#004ac6] via-[#1d4ed8] to-[#006058] text-white p-7 lg:p-9 shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Spring 2025 Active Governance Term</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Welcome to ClubSync Campus Workspace
          </h1>
          <p className="text-xs lg:text-sm text-blue-100 leading-relaxed">
            The unified telemetry and performance engine for collegiate leadership. Monitor cross-domain turnaround time (TAT), manage work in progress quotas, and verify deliverable integrity.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('velocity')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#004ac6] hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Open Velocity & Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenCreateWork}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
            >
              <span>+ Create Deliverable</span>
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
          <Layers className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div 
          onClick={() => onNavigate('velocity')}
          className="bg-white p-6 rounded-3xl border border-[#cbdbf5] hover:border-[#004ac6] shadow-2xs hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#004ac6] transition-colors">
            Velocity Intelligence
          </h3>
          <p className="text-xs text-[#737686] mt-1.5 leading-relaxed">
            Telemetry matrix across all 6 campus domains with real-time TAT metrics, 46 closed works, and on-time completion rates.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#004ac6] mt-4">
            <span>Explore Matrix</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('domain-access')}
          className="bg-white p-6 rounded-3xl border border-[#cbdbf5] hover:border-[#004ac6] shadow-2xs hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#004ac6] transition-colors">
            Domain Limits & WIP Quotas
          </h3>
          <p className="text-xs text-[#737686] mt-1.5 leading-relaxed">
            Monitor and enforce the 19 active pipeline items against maximum WIP thresholds to prevent student burnout.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#004ac6] mt-4">
            <span>Manage Access Rules</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('about')}
          className="bg-white p-6 rounded-3xl border border-[#cbdbf5] hover:border-[#004ac6] shadow-2xs hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#004ac6] transition-colors">
            Governance & Constitution
          </h3>
          <p className="text-xs text-[#737686] mt-1.5 leading-relaxed">
            Learn about ClubSync’s verification methodology, Senate accreditation, and verified student governance standards.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#004ac6] mt-4">
            <span>Read Constitution</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Snapshot of Active Sprints and Top Domain */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Latest High-Velocity Works */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0b1c30]">Recent Audited Deliverables</h3>
                <p className="text-[11px] text-[#737686]">Latest 3 packages verified by council leadership</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('velocity')}
              className="text-xs font-bold text-[#004ac6] hover:underline"
            >
              View All 46 →
            </button>
          </div>

          <div className="space-y-2.5">
            {deliverables.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectDeliverable(item)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#e5eeff] cursor-pointer transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-[#0b1c30]">{item.title}</div>
                  <div className="text-[11px] text-[#737686] mt-0.5">
                    {item.domainName} • {item.subDept} | Lead: {item.leadAssignee.name}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#0b1c30] block">{item.tatDays} Days</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                    {item.deliveryPerformance.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Top Domain Highlights */}
        <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-[#0b1c30]">Output Champion</h3>
            </div>
            <div className="text-lg font-extrabold text-[#004ac6]">
              Technical Domain
            </div>
            <p className="text-xs text-[#434655] mt-1">
              Delivered 16 verified deliverables with a 92% on-time rate and 3.1 days average TAT.
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-[#eff4ff] border border-[#cbdbf5] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#737686]">Total Works Share</span>
                <span className="font-bold text-[#004ac6]">34.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737686]">Fastest Sub-dept</span>
                <span className="font-semibold text-[#0b1c30]">AI/ML (2.4d)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737686]">Lead Assignee</span>
                <span className="font-semibold text-[#0b1c30]">Rohan Verma</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('velocity')}
            className="w-full mt-4 py-2 px-3 bg-[#004ac6] hover:bg-[#1d4ed8] text-white rounded-xl text-xs font-bold transition-colors text-center"
          >
            Inspect Performance Matrix
          </button>
        </div>

      </div>

    </div>
  );
};
