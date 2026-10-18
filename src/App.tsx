import React, { useState } from 'react';
import { NavigationTab, TimeframeOption, WorkDeliverable } from './types';
import { DOMAINS_DATA, WORK_DELIVERABLES, SPRINT_BANNERS } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VelocityAnalyticsView } from './views/VelocityAnalyticsView';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { DomainAccessView } from './views/DomainAccessView';
import { MemberDirectoryView } from './views/MemberDirectoryView';
import { GovernanceView } from './views/GovernanceView';
import { CreateWorkModal } from './components/CreateWorkModal';
import { DeliverableDetailDrawer } from './components/DeliverableDetailDrawer';
import { DownloadReportModal } from './components/DownloadReportModal';

export default function App() {
  // Navigation State - default to 'velocity' so it immediately shows the screenshot screen!
  const [currentTab, setCurrentTab] = useState<NavigationTab>('velocity');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption>('spring-2025');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals and Drawers
  const [isCreateWorkOpen, setIsCreateWorkOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState<WorkDeliverable | null>(null);

  // Dynamic Data state
  const [domains, setDomains] = useState(DOMAINS_DATA);
  const [deliverables, setDeliverables] = useState<WorkDeliverable[]>(WORK_DELIVERABLES);

  // Handle adding a new deliverable from CreateWorkModal
  const handleCreateWork = (newWork: WorkDeliverable) => {
    setDeliverables((prev) => [newWork, ...prev]);

    // Update domain work count
    setDomains((prev) =>
      prev.map((d) => {
        if (d.id === newWork.domainId) {
          const updatedWorks = d.worksCount + 1;
          return {
            ...d,
            worksCount: updatedWorks,
            currentWip: Math.min(d.maxWipQuota, d.currentWip + 1),
          };
        }
        return d;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#eff4ff] selection:text-[#004ac6]">
      {/* Top Header / Navigation Bar (Accessible on all pages with Home, About, Contact, Velocity & screens) */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
        onOpenCreateWork={() => setIsCreateWorkOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main App Layout: Sidebar + Content */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Left Sidebar Navigation */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenCreateWork={() => setIsCreateWorkOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {currentTab === 'velocity' && (
            <VelocityAnalyticsView
              domains={domains}
              deliverables={deliverables}
              sprintBanners={SPRINT_BANNERS}
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={setSelectedTimeframe}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onSelectDeliverable={(d) => setSelectedDeliverable(d)}
              searchFilter={searchQuery}
            />
          )}

          {(currentTab === 'home' || currentTab === 'dashboard') && (
            <HomeView
              onNavigate={setCurrentTab}
              domains={domains}
              deliverables={deliverables}
              onOpenCreateWork={() => setIsCreateWorkOpen(true)}
              onSelectDeliverable={(d) => setSelectedDeliverable(d)}
            />
          )}

          {currentTab === 'about' && (
            <AboutView onNavigate={setCurrentTab} />
          )}

          {currentTab === 'contact' && (
            <ContactView />
          )}

          {currentTab === 'domain-access' && (
            <DomainAccessView domains={domains} />
          )}

          {currentTab === 'members' && (
            <MemberDirectoryView searchQuery={searchQuery} />
          )}

          {currentTab === 'governance' && (
            <GovernanceView />
          )}
        </main>
      </div>

      {/* Modals & Drawers */}
      <CreateWorkModal
        isOpen={isCreateWorkOpen}
        onClose={() => setIsCreateWorkOpen(false)}
        onSubmit={handleCreateWork}
      />

      <DeliverableDetailDrawer
        deliverable={selectedDeliverable}
        onClose={() => setSelectedDeliverable(null)}
      />

      <DownloadReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        deliverables={deliverables}
        domains={domains}
        activeTerm="Spring 2025"
      />
    </div>
  );
}
