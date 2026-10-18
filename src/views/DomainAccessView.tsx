import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Layers, 
  Plus, 
  Info
} from 'lucide-react';
import { DomainMetric } from '../types';

interface DomainAccessViewProps {
  domains: DomainMetric[];
  onUpdateDomainQuota?: (domainId: string, newQuota: number) => void;
}

export const DomainAccessView: React.FC<DomainAccessViewProps> = ({ domains }) => {
  const [quotas, setQuotas] = useState<Record<string, number>>(
    domains.reduce((acc, d) => ({ ...acc, [d.id]: d.maxWipQuota }), {})
  );

  const handleQuotaChange = (id: string, delta: number) => {
    setQuotas((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(15, (prev[id] || 5) + delta)),
    }));
  };

  return (
    <div className="space-y-7 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5] text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Governance & Capacity Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">
            Domain Access & Work-in-Progress (WIP) Limits
          </h1>
          <p className="text-xs text-[#434655] mt-1">
            Enforce concurrent work limits across domains to ensure predictable turnaround velocity without burnout.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border border-[#cbdbf5] text-xs font-semibold text-[#004ac6]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>19 Active Slots / 30 Capacity</span>
        </div>
      </div>

      {/* Tier Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#cbdbf5] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-[#004ac6] uppercase tracking-wider">Tier-1 Access</span>
            <span className="text-[10px] bg-[#eff4ff] text-[#004ac6] font-bold px-2 py-0.5 rounded-full">Executive</span>
          </div>
          <div className="text-xs font-bold text-[#0b1c30]">President & Vice President</div>
          <p className="text-[11px] text-[#737686] mt-1">
            Full permissions to sign off verification hashes, reallocate WIP quotas, and override sprint locks.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#cbdbf5] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-[#1d4ed8] uppercase tracking-wider">Tier-2 Access</span>
            <span className="text-[10px] bg-[#eff4ff] text-[#1d4ed8] font-bold px-2 py-0.5 rounded-full">Domain Leads</span>
          </div>
          <div className="text-xs font-bold text-[#0b1c30]">Department & Sprint Directors</div>
          <p className="text-[11px] text-[#737686] mt-1">
            Authorized to register new deliverables, assign sub-department members, and submit closed works for audit.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#cbdbf5] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-[#006058] uppercase tracking-wider">Tier-3 Access</span>
            <span className="text-[10px] bg-[#eafbf7] text-[#006058] font-bold px-2 py-0.5 rounded-full">Contributors</span>
          </div>
          <div className="text-xs font-bold text-[#0b1c30]">Club Members & General Body</div>
          <p className="text-[11px] text-[#737686] mt-1">
            Read access to live velocity telemetry, roster directories, and ability to submit pull requests / artifacts.
          </p>
        </div>
      </div>

      {/* Domain WIP Capacity Controls */}
      <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-5">
        <h3 className="text-base font-bold text-[#0b1c30]">Active Domain Capacity Matrix</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((d) => {
            const currentLimit = quotas[d.id] || d.maxWipQuota;
            const utilization = Math.round((d.currentWip / currentLimit) * 100);
            const isNearLimit = utilization >= 80;

            return (
              <div
                key={d.id}
                className="p-5 rounded-2xl bg-[#f8f9ff] border border-[#cbdbf5] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0b1c30]">{d.name}</h4>
                    <span className="text-[11px] text-[#004ac6] font-medium">{d.championTag}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#0b1c30]">
                      {d.currentWip} / {currentLimit} WIP
                    </span>
                    <span className={`block text-[10px] font-bold ${isNearLimit ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {utilization}% Capacity
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#cbdbf5]/50 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isNearLimit ? 'bg-amber-500' : 'bg-[#004ac6]'
                    }`}
                    style={{ width: `${Math.min(100, utilization)}%` }}
                  ></div>
                </div>

                {/* Sub-departments & adjustment */}
                <div className="flex items-center justify-between pt-2 border-t border-[#cbdbf5]/50 text-xs">
                  <span className="text-[11px] text-[#737686]">
                    Sub-depts: {d.subDepartments.map(s => s.name).join(', ')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-[#434655]">Limit:</span>
                    <button
                      onClick={() => handleQuotaChange(d.id, -1)}
                      className="w-6 h-6 rounded bg-white border border-[#cbdbf5] text-[#0b1c30] font-bold hover:bg-[#eff4ff]"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-xs">{currentLimit}</span>
                    <button
                      onClick={() => handleQuotaChange(d.id, 1)}
                      className="w-6 h-6 rounded bg-white border border-[#cbdbf5] text-[#0b1c30] font-bold hover:bg-[#eff4ff]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
