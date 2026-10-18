import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { WorkDeliverable } from '../types';
import { DOMAINS_DATA, MEMBERS_DATA } from '../data/mockData';

interface CreateWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newWork: WorkDeliverable) => void;
}

export const CreateWorkModal: React.FC<CreateWorkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [scope, setScope] = useState('');
  const [domainId, setDomainId] = useState('technical');
  const [subDept, setSubDept] = useState('Web Dev');
  const [assigneeId, setAssigneeId] = useState(MEMBERS_DATA[1].id);
  const [tatDays, setTatDays] = useState(2.0);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Urgent'>('High');

  if (!isOpen) return null;

  const currentDomain = DOMAINS_DATA.find((d) => d.id === domainId) || DOMAINS_DATA[0];

  const handleDomainChange = (newDomainId: string) => {
    setDomainId(newDomainId);
    const domain = DOMAINS_DATA.find((d) => d.id === newDomainId);
    if (domain && domain.subDepartments.length > 0) {
      setSubDept(domain.subDepartments[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignee = MEMBERS_DATA.find((m) => m.id === assigneeId) || MEMBERS_DATA[1];

    const newWork: WorkDeliverable = {
      id: `work-${Date.now()}`,
      title: title.trim(),
      scope: scope.trim() || 'General domain sprint objective',
      domainId: currentDomain.id,
      domainName: currentDomain.shortName,
      subDept: subDept,
      leadAssignee: {
        name: assignee.name,
        avatarLetter: assignee.avatarLetter,
        avatarColor: assignee.avatarBg,
        role: assignee.role,
      },
      tatDays: Number(tatDays),
      deliveryPerformance: {
        label: 'On schedule',
        variant: 'neutral',
      },
      verification: {
        verified: true,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        verifiedBy: 'Aarav Sharma (President)',
        certificateHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      },
      completionDate: new Date().toISOString().substring(0, 10),
      term: 'Spring 2025',
      priority,
      deliverableFiles: [
        { name: `${title.toLowerCase().replace(/\s+/g, '_')}_package.zip`, size: '2.4 MB' },
      ],
    };

    onSubmit(newWork);
    setTitle('');
    setScope('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-[#cbdbf5] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e5eeff] bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#004ac6] text-white flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">Create Work Deliverable</h3>
              <p className="text-[11px] text-[#737686]">Log deliverable to active Spring 2025 sprint ledger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737686] hover:text-[#0b1c30] hover:bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1">
              Work Title & Deliverable Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Campus Hackathon Landing Page & Registration Flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] focus:outline-none focus:border-[#004ac6] bg-[#f8f9ff] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1">
              Scope & Specification Summary
            </label>
            <input
              type="text"
              placeholder="e.g. Next.js, Supabase auth, QR check-in & badge generator"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] focus:outline-none focus:border-[#004ac6] bg-[#f8f9ff] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                Domain
              </label>
              <select
                value={domainId}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] focus:outline-none focus:border-[#004ac6] bg-[#f8f9ff]"
              >
                {DOMAINS_DATA.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.worksCount} works)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                Sub-Department
              </label>
              <select
                value={subDept}
                onChange={(e) => setSubDept(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] focus:outline-none focus:border-[#004ac6] bg-[#f8f9ff]"
              >
                {currentDomain.subDepartments.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                Lead Assignee
              </label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] focus:outline-none focus:border-[#004ac6] bg-[#f8f9ff]"
              >
                {MEMBERS_DATA.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                Target TAT (Days)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="14"
                value={tatDays}
                onChange={(e) => setTatDays(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] focus:outline-none focus:border-[#004ac6] bg-[#f8f9ff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0b1c30] mb-1">
              Sprint Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Medium', 'High', 'Urgent'] as const).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    priority === p
                      ? 'bg-[#004ac6] text-white border-[#004ac6]'
                      : 'bg-white text-[#434655] border-[#cbdbf5] hover:bg-[#eff4ff]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Governance Notice */}
          <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#cbdbf5] text-[11px] text-[#004ac6] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#004ac6] mt-0.5" />
            <div>
              <span className="font-bold">Student Council Quota Policy: </span>
              Submission will be signed with student governance cryptographic hash upon verification.
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#434655] hover:bg-[#f8f9ff] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#004ac6] hover:bg-[#2563eb] rounded-xl shadow-sm transition-colors"
            >
              Register Deliverable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
