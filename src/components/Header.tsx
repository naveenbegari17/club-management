import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Layers, 
  ShieldCheck, 
  Info, 
  Mail, 
  Home, 
  BarChart3, 
  Users, 
  Sliders, 
  X,
  ExternalLink,
  Lock
} from 'lucide-react';
import { NavigationTab, TimeframeOption } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  selectedTimeframe: TimeframeOption;
  onTimeframeChange: (timeframe: TimeframeOption) => void;
  onOpenCreateWork: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  selectedTimeframe,
  onTimeframeChange,
  onOpenCreateWork,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTermDropdown, setShowTermDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut for search (/ or ⌘K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.metaKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowTermDropdown(false);
        setShowProfileMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Technical Domain delivered Club Portal v2.4',
      sub: 'Completed 12h ahead of deadline (TAT: 2.8d)',
      time: '15m ago',
      read: false,
    },
    {
      id: 2,
      title: 'New fast-tracked design package verified',
      sub: 'Annual Tech Fest Visual Branding Suite verified by Sanya Kapoor',
      time: '1h ago',
      read: false,
    },
    {
      id: 3,
      title: 'WIP quota balance alert',
      sub: 'Technical domain is at 6/8 active slots (Within threshold)',
      time: '3h ago',
      read: true,
    },
  ];

  const terms = [
    { id: 'spring-2025', label: 'Spring 2025 Term', active: true },
    { id: 'fall-2024', label: 'Fall 2024 Term', active: false },
    { id: 'summer-2024', label: 'Summer 2024 Term', active: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#e5eeff] px-4 lg:px-6 py-2.5 transition-all">
      {/* Top Main Bar */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Brand & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#004ac6] to-[#2563eb] flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[17px] tracking-tight text-[#0b1c30]">ClubSync</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5]">v2.4</span>
              </div>
              <div className="text-[11px] text-[#737686] font-medium leading-tight">Campus Workspace</div>
            </div>
          </button>
        </div>

        {/* Global Navigation Links (Requested: Home, About, Contact, + Screens) */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#f8f9ff] p-1 rounded-xl border border-[#e5eeff]">
          <button
            onClick={() => onTabChange('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'home' || currentTab === 'dashboard'
                ? 'bg-white text-[#004ac6] shadow-xs'
                : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>

          <button
            onClick={() => onTabChange('velocity')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'velocity'
                ? 'bg-[#004ac6] text-white shadow-xs'
                : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Velocity & Intelligence
            <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
              currentTab === 'velocity' ? 'bg-white/20 text-white' : 'bg-[#e5eeff] text-[#004ac6]'
            }`}>Active</span>
          </button>

          <button
            onClick={() => onTabChange('domain-access')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'domain-access'
                ? 'bg-white text-[#004ac6] shadow-xs'
                : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Domain Limits
          </button>

          <button
            onClick={() => onTabChange('members')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'members'
                ? 'bg-white text-[#004ac6] shadow-xs'
                : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Directory
          </button>

          <button
            onClick={() => onTabChange('about')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'about'
                ? 'bg-white text-[#004ac6] shadow-xs'
                : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/50'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            About
          </button>

          <button
            onClick={() => onTabChange('contact')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'contact'
                ? 'bg-white text-[#004ac6] shadow-xs'
                : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact
          </button>
        </nav>

        {/* Global Search Bar (matching screenshot) */}
        <div className="flex-1 max-w-md hidden md:block mx-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#737686] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search operations, projects, rosters..."
              className="w-full bg-[#f8f9ff] text-xs font-medium text-[#0b1c30] pl-9 pr-14 py-2 rounded-xl border border-[#e5eeff] focus:border-[#004ac6] focus:bg-white focus:outline-none transition-all placeholder:text-[#737686]"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#737686] bg-white border border-[#cbdbf5] rounded shadow-2xs">
                /
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Action Items: Term Pill, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Create Work button */}
          <button
            onClick={onOpenCreateWork}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#004ac6] hover:bg-[#dce9ff] text-xs font-semibold border border-[#cbdbf5] transition-all"
            title="Create Deliverable"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Work</span>
          </button>

          {/* Spring 2025 Term Pill (from screenshot) */}
          <div className="relative">
            <button
              onClick={() => setShowTermDropdown(!showTermDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#004ac6] border border-[#cbdbf5] rounded-full text-xs font-semibold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Spring 2025 Term</span>
              <ChevronDown className="w-3 h-3 text-[#004ac6]" />
            </button>

            {showTermDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#e5eeff] py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-[#eff4ff]">
                  <p className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">Active Academic Term</p>
                </div>
                {terms.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => {
                      setShowTermDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-[#0b1c30] hover:bg-[#eff4ff] flex items-center justify-between"
                  >
                    <span>{term.label}</span>
                    {term.active && (
                      <span className="text-[10px] bg-[#dce9ff] text-[#004ac6] font-bold px-1.5 py-0.5 rounded">Current</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell (from screenshot) */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-[#434655] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#004ac6] ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#e5eeff] p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
                  <h4 className="text-xs font-bold text-[#0b1c30]">Domain Telemetry Alerts</h4>
                  <span className="text-[10px] text-[#004ac6] font-semibold bg-[#eff4ff] px-2 py-0.5 rounded-full">2 new</span>
                </div>
                <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-xl hover:bg-[#f8f9ff] text-left transition-colors border border-transparent hover:border-[#e5eeff]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0b1c30]">{n.title}</span>
                        <span className="text-[10px] text-[#737686]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#434655] mt-0.5 leading-snug">{n.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill (from screenshot: Aarav Sharma - President • Tier-1 Full Access) */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-[#eff4ff] border border-transparent hover:border-[#cbdbf5] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#004ac6] to-[#4069f2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                A
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-[#0b1c30] leading-none">Aarav Sharma</div>
                <div className="text-[10px] text-[#004ac6] font-semibold mt-0.5 flex items-center gap-1">
                  <span>President</span>
                  <span className="text-[#cbdbf5]">•</span>
                  <span className="text-[#737686]">Tier-1 Full Access</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#737686] hidden lg:block ml-1" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e5eeff] p-2 z-50">
                <div className="p-3 border-b border-[#eff4ff]">
                  <p className="text-xs font-bold text-[#0b1c30]">Aarav Sharma</p>
                  <p className="text-[11px] text-[#737686]">aarav.sharma@campus.edu</p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold bg-[#eff4ff] text-[#004ac6] rounded-md">
                    Student Senate Verified ID: #ST-8841
                  </span>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { onTabChange('governance'); setShowProfileMenu(false); }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-[#434655] hover:bg-[#eff4ff] rounded-lg flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#004ac6]" />
                    Governance & Signatures
                  </button>
                  <button 
                    onClick={() => { onTabChange('domain-access'); setShowProfileMenu(false); }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-[#434655] hover:bg-[#eff4ff] rounded-lg flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#004ac6]" />
                    Role & WIP Permissions
                  </button>
                  <button 
                    onClick={() => { onTabChange('about'); setShowProfileMenu(false); }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-[#434655] hover:bg-[#eff4ff] rounded-lg flex items-center gap-2"
                  >
                    <Info className="w-3.5 h-3.5 text-[#737686]" />
                    About Constitution
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[#434655] hover:bg-[#eff4ff]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-[#eff4ff] pb-2 space-y-1">
          <div className="px-2 pb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search operations, projects..."
              className="w-full bg-[#f8f9ff] text-xs text-[#0b1c30] px-3 py-2 rounded-xl border border-[#cbdbf5]"
            />
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-2">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'velocity', label: 'Velocity Matrix', icon: BarChart3 },
              { id: 'domain-access', label: 'Domain Limits', icon: Sliders },
              { id: 'members', label: 'Member Directory', icon: Users },
              { id: 'governance', label: 'Governance', icon: ShieldCheck },
              { id: 'about', label: 'About', icon: Info },
              { id: 'contact', label: 'Contact', icon: Mail },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onTabChange(id as NavigationTab);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentTab === id
                    ? 'bg-[#004ac6] text-white'
                    : 'text-[#434655] bg-[#f8f9ff] hover:bg-[#e5eeff]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
