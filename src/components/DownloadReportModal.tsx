import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, Printer, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { WorkDeliverable, DomainMetric } from '../types';

interface DownloadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliverables: WorkDeliverable[];
  domains: DomainMetric[];
  activeTerm: string;
}

export const DownloadReportModal: React.FC<DownloadReportModalProps> = ({
  isOpen,
  onClose,
  deliverables,
  domains,
  activeTerm,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const exportCSV = () => {
    const headers = [
      'ID',
      'Deliverable Title',
      'Scope',
      'Domain',
      'Sub-Department',
      'Lead Assignee',
      'TAT (Days)',
      'Performance Status',
      'Verified By',
      'Verification Hash',
      'Term',
    ];

    const rows = deliverables.map((d) => [
      `"${d.id}"`,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.scope.replace(/"/g, '""')}"`,
      `"${d.domainName}"`,
      `"${d.subDept}"`,
      `"${d.leadAssignee.name}"`,
      d.tatDays,
      `"${d.deliveryPerformance.label}"`,
      `"${d.verification.verifiedBy}"`,
      `"${d.verification.certificateHash}"`,
      `"${d.term}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ClubSync_Velocity_Report_${activeTerm.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-[#cbdbf5] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e5eeff] bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#004ac6] text-white flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">Download Velocity Report</h3>
              <p className="text-[11px] text-[#737686]">Telemetry package for {activeTerm}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737686] hover:text-[#0b1c30] hover:bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-[#eff4ff] p-4 rounded-2xl border border-[#cbdbf5]">
            <div className="flex items-center justify-between text-xs font-bold text-[#004ac6] mb-1">
              <span>Sprint Telemetry Summary</span>
              <span>46 Works Audited</span>
            </div>
            <div className="text-[11px] text-[#434655] space-y-1">
              <div>• Club-wide Turnaround Speed (TAT): <span className="font-semibold text-[#0b1c30]">2.4 Days</span></div>
              <div>• On-Time Rate: <span className="font-semibold text-[#0b1c30]">88.5%</span></div>
              <div>• Top Domain: <span className="font-semibold text-[#0b1c30]">Technical Domain (34.8% share)</span></div>
              <div>• Active Pipeline: <span className="font-semibold text-[#0b1c30]">19 Works In Progress (Balanced)</span></div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#0b1c30]">Export Options</h4>
            
            <button
              onClick={exportCSV}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-[#cbdbf5] hover:border-[#004ac6] hover:bg-[#eff4ff] transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1c30]">Structured CSV Ledger</div>
                  <div className="text-[11px] text-[#737686]">Full deliverable audit trail, hashes, and TAT metrics</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-[#004ac6] group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={printReport}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-[#cbdbf5] hover:border-[#004ac6] hover:bg-[#eff4ff] transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#004ac6] flex items-center justify-center">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1c30]">Printable PDF Summary</div>
                  <div className="text-[11px] text-[#737686]">Pre-formatted executive deck for University Senate review</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#004ac6] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {downloadSuccess && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium border border-emerald-200 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CSV exported successfully to your downloads!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e5eeff] bg-[#f8f9ff] flex items-center justify-between">
          <span className="text-[10px] text-[#737686]">Certified by Student Senate Governance</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#434655] hover:bg-white rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
