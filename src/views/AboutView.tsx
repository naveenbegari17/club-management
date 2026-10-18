import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Clock, 
  FileCheck,
  Compass
} from 'lucide-react';
import { NavigationTab } from '../types';

interface AboutViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Title & Introduction */}
      <div className="bg-white rounded-3xl p-7 lg:p-9 border border-[#cbdbf5] shadow-2xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5] text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>About ClubSync Framework</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
          Campus Governance & Performance Intelligence
        </h1>
        <p className="text-xs lg:text-sm text-[#434655] leading-relaxed">
          ClubSync was engineered to eliminate opacity and sprint bottlenecks in university student organizations. Serving over 450 active club members and six core operational domains, it provides real-time telemetry on turnaround time (TAT), workload quotas (WIP), and cryptographic audit sign-offs.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1c30]">Turnaround Speed (TAT)</h3>
          <p className="text-xs text-[#737686] leading-relaxed">
            Measures the exact operational elapsed time from deliverable registration to verified governance sign-off. The current active club-wide TAT benchmark is 2.4 days.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1c30]">Work-in-Progress (WIP) Caps</h3>
          <p className="text-xs text-[#737686] leading-relaxed">
            Strict concurrency caps per domain prevent volunteer burnout while maintaining steady cadence across Technical, Design, Event, Content, and Sponsorship teams.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] text-[#004ac6] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1c30]">Cryptographic Verification</h3>
          <p className="text-xs text-[#737686] leading-relaxed">
            Every completed deliverable is validated with a SHA-256 certificate stamp signed by the President or VP Governance for Student Senate compliance.
          </p>
        </div>
      </div>

      {/* Domain Architecture & Methodology */}
      <div className="bg-white rounded-3xl p-7 border border-[#cbdbf5] shadow-2xs space-y-5">
        <h2 className="text-lg font-bold text-[#0b1c30]">The 6 Operational Domains</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <h4 className="text-xs font-bold text-[#004ac6]">1. Technical Domain</h4>
            <p className="text-xs text-[#737686] mt-1">
              Maintains campus web portals, mobile attendance apps, microservices, and student AI tools. Currently the #1 output volume champion.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <h4 className="text-xs font-bold text-[#004ac6]">2. Design Domain</h4>
            <p className="text-xs text-[#737686] mt-1">
              Produces brand guidelines, tech fest poster suites, UI/UX wireframes, and video promos. Fastest turnaround (1.6 days TAT).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <h4 className="text-xs font-bold text-[#004ac6]">3. Event Management</h4>
            <p className="text-xs text-[#737686] mt-1">
              Coordinates campus auditoriums, staging, AV decibel sync, security logistics, and participant check-ins.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <h4 className="text-xs font-bold text-[#004ac6]">4. Content & Docs</h4>
            <p className="text-xs text-[#737686] mt-1">
              Curates official monthly tech newsletters, senate meeting minutes, alumni spotlight interviews, and archive records.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <h4 className="text-xs font-bold text-[#004ac6]">5. Sponsorship & Outreach</h4>
            <p className="text-xs text-[#737686] mt-1">
              Builds corporate pitch decks, negotiates tier-1 campus titles with enterprise partners, and manages legal contracts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <h4 className="text-xs font-bold text-[#004ac6]">6. Social Media & PR</h4>
            <p className="text-xs text-[#737686] mt-1">
              Drives broadcast campaigns, Instagram reels, live hackathon updates, and campus student relations.
            </p>
          </div>
        </div>
      </div>

      {/* Senate Accreditation Footer Banner */}
      <div className="bg-[#eff4ff] rounded-3xl p-6 border border-[#cbdbf5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006058] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#b3fff3]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Student Senate Recognized & Audited</h4>
            <p className="text-[11px] text-[#434655]">
              Chartered under University Student Governance Constitution § 14-B.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('velocity')}
          className="px-4 py-2 bg-[#004ac6] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
        >
          View Live Telemetry
        </button>
      </div>

    </div>
  );
};
