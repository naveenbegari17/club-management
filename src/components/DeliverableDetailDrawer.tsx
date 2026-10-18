import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  FolderGit2, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  Award,
  FileText
} from 'lucide-react';
import { WorkDeliverable } from '../types';

interface DeliverableDetailDrawerProps {
  deliverable: WorkDeliverable | null;
  onClose: () => void;
}

export const DeliverableDetailDrawer: React.FC<DeliverableDetailDrawerProps> = ({
  deliverable,
  onClose,
}) => {
  if (!deliverable) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#cbdbf5] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-[#e5eeff] bg-[#f8f9ff] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5]">
                {deliverable.domainName} • {deliverable.subDept}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {deliverable.deliveryPerformance.label}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#737686] hover:text-[#0b1c30] hover:bg-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title & Scope */}
            <div>
              <h2 className="text-lg font-extrabold text-[#0b1c30] leading-snug">
                {deliverable.title}
              </h2>
              <p className="text-xs text-[#434655] mt-1.5 leading-relaxed bg-[#f8f9ff] p-3 rounded-xl border border-[#e5eeff]">
                <span className="font-semibold text-[#0b1c30]">Scope: </span>
                {deliverable.scope}
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-[#cbdbf5]">
                <div className="flex items-center gap-1.5 text-xs text-[#737686]">
                  <Clock className="w-3.5 h-3.5 text-[#004ac6]" />
                  <span>Turnaround (TAT)</span>
                </div>
                <div className="text-xl font-bold text-[#0b1c30] mt-1">
                  {deliverable.tatDays} Days
                </div>
                <div className="text-[10px] text-[#006058] font-medium mt-0.5">
                  Target met within sprint
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
                <div className="flex items-center gap-1.5 text-xs text-[#737686]">
                  <Calendar className="w-3.5 h-3.5 text-[#737686]" />
                  <span>Term & Completed</span>
                </div>
                <div className="text-sm font-bold text-[#0b1c30] mt-1">
                  {deliverable.term}
                </div>
                <div className="text-[10px] text-[#737686] mt-0.5">
                  {deliverable.completionDate}
                </div>
              </div>
            </div>

            {/* Lead Assignee */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737686] mb-2.5">
                Lead Assignee
              </h4>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff]">
                <div className={`w-10 h-10 rounded-full ${deliverable.leadAssignee.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                  {deliverable.leadAssignee.avatarLetter}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1c30]">
                    {deliverable.leadAssignee.name}
                  </div>
                  <div className="text-[11px] text-[#737686]">
                    {deliverable.leadAssignee.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Stamp & Cryptographic Hash */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737686] mb-2.5">
                Verification & Audit Ledger
              </h4>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified by Student Governance</span>
                </div>
                <div className="text-[11px] text-emerald-900/80 space-y-1">
                  <div>
                    <span className="font-semibold">Signatory:</span> {deliverable.verification.verifiedBy}
                  </div>
                  <div>
                    <span className="font-semibold">Stamped:</span> {deliverable.verification.timestamp}
                  </div>
                  <div className="font-mono text-[10px] bg-white/70 p-1.5 rounded-lg border border-emerald-200 break-all">
                    Hash: {deliverable.verification.certificateHash}
                  </div>
                </div>
              </div>
            </div>

            {/* Attached Assets */}
            {deliverable.deliverableFiles && deliverable.deliverableFiles.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#737686] mb-2.5">
                  Deliverable Artifacts ({deliverable.deliverableFiles.length})
                </h4>
                <div className="space-y-2">
                  {deliverable.deliverableFiles.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#004ac6]" />
                        <span className="font-medium text-[#0b1c30] truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#737686]">{file.size}</span>
                        <button 
                          onClick={() => alert(`Downloading asset: ${file.name}`)}
                          className="p-1 rounded text-[#004ac6] hover:bg-[#eff4ff]"
                          title="Download asset"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e5eeff] bg-[#f8f9ff] flex items-center justify-between">
          <span className="text-[11px] text-[#737686]">Status: Closed & Audited</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#004ac6] rounded-xl hover:bg-[#2563eb] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
