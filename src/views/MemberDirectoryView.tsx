import React, { useState } from 'react';
import { Users, Search, Mail, ShieldCheck, CheckCircle2, Award, Zap } from 'lucide-react';
import { Member } from '../types';
import { MEMBERS_DATA } from '../data/mockData';

interface MemberDirectoryViewProps {
  searchQuery?: string;
}

export const MemberDirectoryView: React.FC<MemberDirectoryViewProps> = ({ searchQuery = '' }) => {
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const q = (localSearch || searchQuery).toLowerCase();

  const filteredMembers = MEMBERS_DATA.filter((m) => {
    const matchesDomain = filterDomain === 'all' || m.domain.toLowerCase().includes(filterDomain.toLowerCase());
    const matchesQuery = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.domain.toLowerCase().includes(q);
    return matchesDomain && matchesQuery;
  });

  return (
    <div className="space-y-7 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5] text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Collegiate Roster</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Member & Leadership Directory</h1>
          <p className="text-xs text-[#434655] mt-1">
            Complete registry of student officers, domain leads, and contributors for Spring 2025.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#cbdbf5]">
          {['all', 'Technical', 'Design', 'Event Management', 'Content', 'Sponsorship'].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDomain(d)}
              className={`px-3 py-1 text-xs font-semibold rounded-xl capitalize transition-colors ${
                filterDomain === d
                  ? 'bg-[#004ac6] text-white shadow-xs'
                  : 'text-[#434655] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              {d === 'all' ? 'All Domains' : d}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-3xl bg-white border border-[#cbdbf5] shadow-2xs hover:border-[#004ac6]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${member.avatarBg} text-white flex items-center justify-center font-extrabold text-base shadow-xs`}>
                    {member.avatarLetter}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0b1c30]">{member.name}</h3>
                    <p className="text-xs text-[#737686]">{member.role}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold text-[#004ac6] bg-[#eff4ff] px-2 py-0.5 rounded-md border border-[#cbdbf5]">
                      {member.tier}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats box */}
              <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff] text-center text-xs">
                <div>
                  <span className="block text-[10px] text-[#737686]">Closed</span>
                  <span className="font-bold text-[#0b1c30]">{member.completedWorks}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#737686]">Avg TAT</span>
                  <span className="font-bold text-[#004ac6]">{member.avgTat}d</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#737686]">On-Time</span>
                  <span className="font-bold text-emerald-600">{member.onTimeRate}%</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-[#e5eeff] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#737686]">{member.domain}</span>
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-1 text-[11px] font-bold text-[#004ac6] hover:underline"
              >
                <Mail className="w-3 h-3" />
                Contact
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
