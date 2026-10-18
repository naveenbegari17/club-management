import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Lock, 
  BarChart2, 
  Users, 
  ShieldCheck,
  CheckCircle2,
  Info,
  Mail,
  ChevronRight
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenCreateWork: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onOpenCreateWork,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      onClick: () => onTabChange('dashboard'),
    },
    {
      id: 'create-work',
      label: 'Create Work',
      icon: PlusCircle,
      onClick: onOpenCreateWork,
      badge: 'New',
    },
    {
      id: 'domain-access',
      label: 'Domain Access & Limits',
      icon: Lock,
      onClick: () => onTabChange('domain-access'),
    },
    {
      id: 'velocity',
      label: 'Velocity & Analytics',
      icon: BarChart2,
      onClick: () => onTabChange('velocity'),
      highlight: true,
    },
    {
      id: 'members',
      label: 'Member Directory',
      icon: Users,
      onClick: () => onTabChange('members'),
    },
    {
      id: 'governance',
      label: 'Security & Governance',
      icon: ShieldCheck,
      onClick: () => onTabChange('governance'),
    },
  ];

  return (
    <aside className="w-56 shrink-0 hidden md:flex flex-col justify-between py-6 px-3 bg-[#f8f9ff] border-r border-[#cbdbf5]/50 min-h-[calc(100vh-61px)]">
      {/* Navigation Items List */}
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'dashboard' && currentTab === 'home');
          
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all group ${
                isActive
                  ? 'bg-[#eff4ff] text-[#004ac6] shadow-xs border border-[#cbdbf5]'
                  : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#004ac6]' : 'text-[#737686] group-hover:text-[#0b1c30]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#004ac6] text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Secondary Info / Contact section */}
        <div className="pt-4 mt-4 border-t border-[#cbdbf5]/60 space-y-1">
          <button
            onClick={() => onTabChange('about')}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-colors ${
              currentTab === 'about'
                ? 'bg-[#eff4ff] text-[#004ac6] font-semibold'
                : 'text-[#737686] hover:text-[#0b1c30] hover:bg-white/60'
            }`}
          >
            <Info className="w-4 h-4 text-[#737686]" />
            <span>About</span>
          </button>
          <button
            onClick={() => onTabChange('contact')}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-colors ${
              currentTab === 'contact'
                ? 'bg-[#eff4ff] text-[#004ac6] font-semibold'
                : 'text-[#737686] hover:text-[#0b1c30] hover:bg-white/60'
            }`}
          >
            <Mail className="w-4 h-4 text-[#737686]" />
            <span>Contact & Senate</span>
          </button>
        </div>
      </div>

      {/* Verified Body Pill at Bottom (exact match from screenshot) */}
      <div className="mt-8 pt-4">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#eff4ff] border border-[#cbdbf5] text-left">
          <div className="w-7 h-7 rounded-lg bg-[#006058] flex items-center justify-center text-white shrink-0 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#b3fff3]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0b1c30] leading-tight">Verified Body</div>
            <div className="text-[10px] text-[#434655] font-medium">Student Governance</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
