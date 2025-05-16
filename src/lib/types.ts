// Status types
export type ContactStatus = 'Active' | 'Stalled' | 'Won' | 'Lost' | 'New';

// Pipeline stage types
export type PipelineStage = 'lead' | 'contacted' | 'demo' | 'proposal' | 'won' | 'lost';

// Contact information
export interface Contact {
  id: string;
  name: string;
  company: string;
  status: ContactStatus;
  stage: PipelineStage;
  notes: string;
  email?: string;
  phone?: string;
  value?: number;
  probability?: number;
  createdAt?: Date;
  updatedAt?: Date;
  assignedTo?: string;
  avatar?: string;
}

// Deal information
export interface Deal {
  id: string;
  name: string;
  value: number;
  contactId: string;
  status: ContactStatus;
  stage: PipelineStage;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  closeDate?: Date;
  probability?: number;
}

// Team member information
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark';
  pipelineView: 'kanban' | 'list';
  notifications: boolean;
}