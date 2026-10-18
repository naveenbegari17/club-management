export type NavigationTab = 
  | 'home'
  | 'velocity' 
  | 'dashboard' 
  | 'create-work' 
  | 'domain-access' 
  | 'members' 
  | 'governance'
  | 'about'
  | 'contact';

export type TimeframeOption = 'all-time' | 'spring-2025' | 'last-30' | 'this-week';

export interface DomainMetric {
  id: string;
  rank: number;
  name: string;
  shortName: string;
  worksCount: number;
  sharePercentage: number;
  championTag: string;
  tatDays: number;
  tatBadge?: string;
  onTimePercentage: number;
  subDepartments: { name: string; count: number }[];
  rating: string;
  ratingIcon: 'star' | 'lightning' | 'shield' | 'check' | 'clock' | 'sparkle';
  color: string;
  accentBg: string;
  badgeBg: string;
  maxWipQuota: number;
  currentWip: number;
}

export interface WorkDeliverable {
  id: string;
  title: string;
  scope: string;
  domainId: string;
  domainName: string;
  subDept: string;
  leadAssignee: {
    name: string;
    avatarLetter: string;
    avatarColor: string;
    role: string;
  };
  tatDays: number;
  deliveryPerformance: {
    label: string;
    variant: 'success' | 'info' | 'neutral' | 'warning';
  };
  verification: {
    verified: boolean;
    timestamp: string;
    verifiedBy: string;
    certificateHash: string;
  };
  completionDate: string;
  term: string;
  priority: 'High' | 'Medium' | 'Urgent';
  deliverableFiles?: { name: string; size: string }[];
}

export interface SprintBanner {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  domainId: string;
  badgeColor: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  tier: 'Tier-1 Full Access' | 'Tier-2 Domain Lead' | 'Tier-3 Member';
  domain: string;
  subDept: string;
  completedWorks: number;
  avgTat: number;
  onTimeRate: number;
  avatarLetter: string;
  avatarBg: string;
  email: string;
  activeStatus: 'Active' | 'On Sabbatical' | 'Alumni Lead';
}

export interface GovernanceLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  domain: string;
  status: 'Approved' | 'Audited' | 'Pending Review';
  verificationHash: string;
}
