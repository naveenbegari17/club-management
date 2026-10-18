import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileText, KeyRound, Award, ArrowUpRight } from 'lucide-react';
import { GOVERNANCE_LOGS } from '../data/mockData';

export const GovernanceView: React.FC = () => {
  return (
    <div className="space-y-7 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audited & Cryptographically Verified</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Security & Governance Ledger</h1>
          <p className="text-xs text-[#434655] mt-1">
            Immutable audit record of presidential sign-offs, SLA ratifications, and student council resolutions.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#eff4ff] text-[#004ac6] rounded-2xl border border-[#cbdbf5] text-xs font-bold">
          <KeyRound className="w-3.5 h-3.5" />
          <span>SHA-256 Ledger Live</span>
        </div>
      </div>

      {/* Verification Architecture Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#0b1c30]">Student Senate Verification Protocol</h3>
        <p className="text-xs text-[#434655] leading-relaxed">
          Every closed work deliverable undergoes multi-stage verification before telemetry inclusion. The lead assignee signs off on the git repository or design archive, followed by secondary review by the VP Governance, culminating in presidential cryptographic ledger signing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <span className="text-[10px] font-bold text-[#004ac6] uppercase">Stage 1</span>
            <div className="text-xs font-bold text-[#0b1c30] mt-1">Artifact Inspection</div>
            <p className="text-[11px] text-[#737686] mt-0.5">Automated checksum & file manifest verification</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <span className="text-[10px] font-bold text-[#004ac6] uppercase">Stage 2</span>
            <div className="text-xs font-bold text-[#0b1c30] mt-1">TAT & SLA Validation</div>
            <p className="text-[11px] text-[#737686] mt-0.5">Comparison against sprint turnaround deadlines</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
            <span className="text-[10px] font-bold text-[#004ac6] uppercase">Stage 3</span>
            <div className="text-xs font-bold text-[#0b1c30] mt-1">Presidential Stamp</div>
            <p className="text-[11px] text-[#737686] mt-0.5">Permanent record registration with verification hash</p>
          </div>
        </div>
      </div>

      {/* Recent Ledger Entries */}
      <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#0b1c30]">Audit Trail Entries</h3>

        <div className="space-y-3">
          {GOVERNANCE_LOGS.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0b1c30]">{log.action}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
                    {log.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#737686]">
                  Signatory: <span className="text-[#0b1c30] font-semibold">{log.actor}</span> • Domain: {log.domain}
                </div>
              </div>

              <div className="text-right sm:text-right font-mono text-[11px] text-[#737686]">
                <div className="bg-white px-2 py-1 rounded-lg border border-[#cbdbf5] inline-block font-semibold text-[#004ac6]">
                  {log.verificationHash}
                </div>
                <div className="text-[10px] mt-0.5">{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
