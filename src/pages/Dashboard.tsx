import React from 'react';
import { BarChart3, DollarSign, LineChart, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockContacts, mockDeals } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

// Calculate total pipeline value
const totalPipelineValue = mockDeals.reduce((sum, deal) => {
  if (deal.status !== 'Lost') {
    return sum + deal.value;
  }
  return sum;
}, 0);

// Calculate weighted pipeline value
const weightedPipelineValue = mockDeals.reduce((sum, deal) => {
  if (deal.status !== 'Lost') {
    return sum + (deal.value * (deal.probability || 0));
  }
  return sum;
}, 0);

// Count active deals
const activeDealsCount = mockDeals.filter(d => d.status === 'Active').length;

// Count all contacts
const contactsCount = mockContacts.length;

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Last 30 Days</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>
    
      {/* Stats overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Pipeline"
          value={formatCurrency(totalPipelineValue)}
          description="Total potential revenue"
          icon={<DollarSign className="h-6 w-6 text-emerald-500" />}
          trend={10.5}
        />
        
        <StatsCard
          title="Weighted Pipeline"
          value={formatCurrency(weightedPipelineValue)}
          description="Adjusted by probability"
          icon={<BarChart3 className="h-6 w-6 text-amber-500" />}
          trend={4.2}
        />
        
        <StatsCard
          title="Active Deals"
          value={activeDealsCount.toString()}
          description="Deals in progress"
          icon={<TrendingUp className="h-6 w-6 text-skyblue" />}
          trend={-2.4}
        />
        
        <StatsCard
          title="Total Contacts"
          value={contactsCount.toString()}
          description="Contacts in database"
          icon={<Users className="h-6 w-6 text-purple-500" />}
          trend={8.1}
        />
      </div>
      
      {/* Recent activity */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-charcoal mb-4">Recent Activity</h2>
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
          <div className="space-y-4">
            {mockContacts.slice(0, 5).map((contact, index) => (
              <div key={contact.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                  <span className="font-medium text-teal">
                    {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-muted-foreground">{contact.company}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {['New contact added', 'Status changed to ' + contact.status, 'Note added', 'Deal created', 'Email sent'][index]} · {index + 1} hour{index !== 0 ? 's' : ''} ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Pipeline stages */}
      <div>
        <h2 className="text-xl font-bold text-charcoal mb-4">Pipeline Overview</h2>
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
          <div className="space-y-4">
            <div className="relative pt-6">
              <div className="grid grid-cols-6 mb-1">
                <div className="col-span-1 text-xs font-medium text-charcoal/70">Stage</div>
                <div className="col-span-5 text-xs font-medium text-charcoal/70">Distribution</div>
              </div>
              
              {['Lead', 'Contacted', 'Demo', 'Proposal', 'Won'].map((stage, i) => {
                const count = mockContacts.filter(c => c.stage === stage.toLowerCase()).length;
                const percentage = (count / mockContacts.length) * 100;
                
                return (
                  <div key={stage} className="grid grid-cols-6 items-center mb-3">
                    <div className="col-span-1 text-sm font-medium">{stage}</div>
                    <div className="col-span-5">
                      <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            ['bg-skyblue-light', 'bg-blue-400', 'bg-purple-400', 'bg-amber-400', 'bg-green-500'][i]
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>{count} contacts</span>
                        <span>{Math.round(percentage)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <div className={`text-xs font-medium flex items-center gap-1 ${
          trend >= 0 ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {trend >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <LineChart className="h-3 w-3" />
          )}
          {trend >= 0 ? '+' : ''}{trend}% from last month
        </div>
      </CardFooter>
    </Card>
  );
}