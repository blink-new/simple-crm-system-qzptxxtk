import { useState } from 'react';
import { Contact, PipelineStage } from '@/lib/types';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from './ui/avatar';
import { StatusBadge } from './ui/status-badge';
import { 
  Clock, 
  DollarSign, 
  Mail, 
  MapPin, 
  Phone, 
  Share2, 
  StickyNote, 
} from 'lucide-react';
import { Button } from './ui/button';
import { pipelineStages } from '@/lib/data';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Textarea } from './ui/textarea';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ContactDetailProps {
  contact: Contact;
  onSave?: (updatedContact: Contact) => void;
}

export function ContactDetail({ contact, onSave }: ContactDetailProps) {
  const [editMode, setEditMode] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact>(contact);

  // Derived values
  const initials = contact.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  // Handle field changes
  const handleChange = (field: keyof Contact, value: any) => {
    setCurrentContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save changes
  const handleSave = () => {
    if (onSave) {
      onSave(currentContact);
    }
    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {/* Contact header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-dark/5 via-mint to-teal-dark/5">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="bg-teal text-white text-xl">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-charcoal truncate">
                {contact.name}
              </h1>
              <StatusBadge status={contact.status} />
            </div>
            
            <div className="text-charcoal/80 text-lg font-medium">{contact.company}</div>
            
            <div className="flex items-center gap-3 text-sm text-charcoal/70">
              {contact.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-skyblue/80" />
                  <span>{contact.email}</span>
                </div>
              )}
              
              {contact.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-skyblue/80" />
                  <span>{contact.phone}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 self-start">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="icon" size-sm>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="w-full">
        <div className="border-b border-gray-200">
          <TabsList className="p-0 h-auto bg-transparent border-b-0">
            <TabsTrigger 
              value="details" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-skyblue data-[state=active]:rounded-none data-[state=active]:shadow-none py-3 px-6"
            >
              Details
            </TabsTrigger>
            <TabsTrigger 
              value="notes" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-skyblue data-[state=active]:rounded-none data-[state=active]:shadow-none py-3 px-6"
            >
              Notes
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-skyblue data-[state=active]:rounded-none data-[state=active]:shadow-none py-3 px-6"
            >
              Activity
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="details" className="p-0 mt-0">
          <div className="grid md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2 space-y-6">
              {/* Contact details section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Contact Information</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => editMode ? handleSave() : setEditMode(true)}
                    >
                      {editMode ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1 text-charcoal/70">Stage</div>
                    {editMode ? (
                      <Select 
                        value={currentContact.stage}
                        onValueChange={(value) => handleChange('stage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {pipelineStages.map((stage) => (
                            <SelectItem key={stage.key} value={stage.key}>
                              {stage.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div>{pipelineStages.find(s => s.key === contact.stage)?.label}</div>
                    )}
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1 text-charcoal/70">Status</div>
                    {editMode ? (
                      <Select 
                        value={currentContact.status}
                        onValueChange={(value) => handleChange('status', value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Stalled">Stalled</SelectItem>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Won">Won</SelectItem>
                          <SelectItem value="Lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <StatusBadge status={contact.status} />
                    )}
                  </div>
                  
                  {contact.value !== undefined && (
                    <div>
                      <div className="text-sm font-medium mb-1 text-charcoal/70">Deal Value</div>
                      <div className="flex items-center gap-2 text-emerald-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(contact.value)}
                      </div>
                    </div>
                  )}
                  
                  {contact.probability !== undefined && (
                    <div>
                      <div className="text-sm font-medium mb-1 text-charcoal/70">Probability</div>
                      <div>{Math.round(contact.probability * 100)}%</div>
                    </div>
                  )}
                  
                  {contact.createdAt && (
                    <div>
                      <div className="text-sm font-medium mb-1 text-charcoal/70">Created</div>
                      <div className="flex items-center gap-2 text-charcoal/80">
                        <Clock className="w-4 h-4" />
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>
                  )}
                  
                  {contact.updatedAt && (
                    <div>
                      <div className="text-sm font-medium mb-1 text-charcoal/70">Last Updated</div>
                      <div className="flex items-center gap-2 text-charcoal/80">
                        <Clock className="w-4 h-4" />
                        {formatDate(contact.updatedAt)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              {/* Quick actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="p-0 mt-0">
          <div className="p-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Notes</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => editMode ? handleSave() : setEditMode(true)}
                  >
                    {editMode ? 'Save' : 'Edit'}
                  </Button>
                </div>
                <CardDescription>
                  Add notes and important details about this contact
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    value={currentContact.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                    className="min-h-[200px]"
                    placeholder="Add notes about this contact..."
                  />
                ) : (
                  <div className="bg-gray-50 border rounded-md p-4 min-h-[200px]">
                    <div className="flex gap-2 mb-2">
                      <StickyNote className="w-4 h-4 text-skyblue/80" />
                      <span className="font-medium">Contact Notes</span>
                    </div>
                    <p className="whitespace-pre-line">
                      {contact.notes || 'No notes yet. Click Edit to add notes.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="p-0 mt-0">
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Recent activity for this contact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 pb-4 border-b border-gray-100">
                      <div className="w-9 h-9 rounded-full bg-mint flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-teal" />
                      </div>
                      <div>
                        <div className="font-medium">Email sent</div>
                        <div className="text-sm text-muted-foreground">
                          Follow-up about the proposal
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {i} day{i > 1 ? 's' : ''} ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}