import { Contact, Deal, PipelineStage, TeamMember } from './types';

// Pipeline stage definitions with metadata
export const pipelineStages = [
  { key: 'lead', label: 'Lead', icon: 'UserRound', color: 'bg-skyblue-light' },
  { key: 'contacted', label: 'Contacted', icon: 'PhoneCall', color: 'bg-blue-400' },
  { key: 'demo', label: 'Demo', icon: 'Presentation', color: 'bg-purple-400' },
  { key: 'proposal', label: 'Proposal', icon: 'FileText', color: 'bg-amber-400' },
  { key: 'won', label: 'Won', icon: 'Trophy', color: 'bg-green-500' },
  { key: 'lost', label: 'Lost', icon: 'XCircle', color: 'bg-red-500' },
] as const;

// Mock contact data for development
export const mockContacts: Contact[] = [
  { 
    id: '1', 
    name: 'Jane Doe', 
    company: 'Acme Corp', 
    status: 'Active', 
    stage: 'lead', 
    notes: 'Follow up next week.',
    email: 'jane@acmecorp.com',
    phone: '(555) 123-4567',
    value: 50000,
    probability: 0.2,
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-06-22'),
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  { 
    id: '2', 
    name: 'John Smith', 
    company: 'Globex', 
    status: 'Stalled', 
    stage: 'contacted', 
    notes: 'Waiting for reply to budget questions.',
    email: 'john@globex.com',
    phone: '(555) 234-5678',
    value: 75000,
    probability: 0.4,
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-06-20'),
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  { 
    id: '3', 
    name: 'Alice Lee', 
    company: 'Initech', 
    status: 'New', 
    stage: 'demo', 
    notes: 'Demo scheduled for Friday at 2pm.',
    email: 'alice@initech.com',
    phone: '(555) 345-6789',
    value: 120000,
    probability: 0.6,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-25'),
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  { 
    id: '4', 
    name: 'Bob Brown', 
    company: 'Umbrella', 
    status: 'Won', 
    stage: 'won', 
    notes: 'Closed successfully! Implementation starts next month.',
    email: 'bob@umbrella.com',
    phone: '(555) 456-7890',
    value: 95000,
    probability: 1.0,
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-06-10'),
    avatar: 'https://i.pravatar.cc/150?img=7'
  },
  { 
    id: '5', 
    name: 'Carol White', 
    company: 'Soylent', 
    status: 'Lost', 
    stage: 'lost', 
    notes: 'Went with competitor on price.',
    email: 'carol@soylent.com',
    phone: '(555) 567-8901',
    value: 60000,
    probability: 0,
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-05-15'),
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  { 
    id: '6', 
    name: 'Eve Black', 
    company: 'Hooli', 
    status: 'Active', 
    stage: 'proposal', 
    notes: 'Proposal sent, awaiting feedback. Follow up next Tuesday.',
    email: 'eve@hooli.com',
    phone: '(555) 678-9012',
    value: 200000,
    probability: 0.8,
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-06-18'),
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '7',
    name: 'Michael Johnson',
    company: 'Stark Industries',
    status: 'Active',
    stage: 'lead',
    notes: 'Interested in enterprise plan. Schedule intro call.',
    email: 'michael@stark.com',
    phone: '(555) 789-0123',
    value: 300000,
    probability: 0.3,
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-24'),
    avatar: 'https://i.pravatar.cc/150?img=13'
  },
  {
    id: '8',
    name: 'Sarah Miller',
    company: 'Wayne Enterprises',
    status: 'Active',
    stage: 'contacted',
    notes: 'Had initial call. Very interested in security features.',
    email: 'sarah@wayne.com',
    phone: '(555) 890-1234',
    value: 250000,
    probability: 0.5,
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-23'),
    avatar: 'https://i.pravatar.cc/150?img=15'
  },
];

// Mock deals data for development
export const mockDeals: Deal[] = [
  {
    id: 'd1',
    name: 'Acme Corp Enterprise License',
    value: 50000,
    contactId: '1',
    status: 'Active',
    stage: 'lead',
    notes: 'Annual enterprise license renewal',
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-06-22'),
    closeDate: new Date('2023-08-31'),
    probability: 0.2
  },
  {
    id: 'd2',
    name: 'Globex Expansion Package',
    value: 75000,
    contactId: '2',
    status: 'Stalled',
    stage: 'contacted',
    notes: 'Expansion to international offices',
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-06-20'),
    closeDate: new Date('2023-09-15'),
    probability: 0.4
  },
  {
    id: 'd3',
    name: 'Initech Software Integration',
    value: 120000,
    contactId: '3',
    status: 'New',
    stage: 'demo',
    notes: 'Custom API integration project',
    createdAt: new Date('2023-06-05'),
    updatedAt: new Date('2023-06-25'),
    closeDate: new Date('2023-10-01'),
    probability: 0.6
  },
  {
    id: 'd4',
    name: 'Umbrella Corp Security Suite',
    value: 95000,
    contactId: '4',
    status: 'Won',
    stage: 'won',
    notes: 'Complete security suite implementation',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-06-10'),
    closeDate: new Date('2023-06-10'),
    probability: 1.0
  },
  {
    id: 'd5',
    name: 'Soylent Analytics Platform',
    value: 60000,
    contactId: '5',
    status: 'Lost',
    stage: 'lost',
    notes: 'Data analytics platform proposal',
    createdAt: new Date('2023-02-25'),
    updatedAt: new Date('2023-05-15'),
    closeDate: new Date('2023-05-15'),
    probability: 0
  },
  {
    id: 'd6',
    name: 'Hooli Premium Partnership',
    value: 200000,
    contactId: '6',
    status: 'Active',
    stage: 'proposal',
    notes: 'Strategic partnership agreement',
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-06-18'),
    closeDate: new Date('2023-09-30'),
    probability: 0.8
  },
];

// Mock team members
export const mockTeamMembers: TeamMember[] = [
  {
    id: 'user1',
    name: 'Alex Rodriguez',
    email: 'alex@salescrm.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=20'
  },
  {
    id: 'user2',
    name: 'Jamie Wilson',
    email: 'jamie@salescrm.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=32'
  },
  {
    id: 'user3',
    name: 'Taylor Kim',
    email: 'taylor@salescrm.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=48'
  }
];