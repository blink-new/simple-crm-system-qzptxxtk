import { useState } from 'react';
import { Contact, ContactStatus } from '@/lib/types';
import { mockContacts } from '@/lib/data';
import { 
  ArrowDownUp, 
  Filter, 
  Plus, 
  RefreshCw, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/ui/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/utils';
import { ContactDetail } from '@/components/ContactDetail';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState<ContactStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Contact>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Filter contacts by status and search
  const filteredContacts = contacts.filter(contact => {
    // Status filter
    if (filterStatus !== 'All' && contact.status !== filterStatus) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.company.toLowerCase().includes(query) ||
        contact.email?.toLowerCase().includes(query) ||
        contact.notes.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === undefined || bValue === undefined) return 0;
    
    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    // Handle number comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    // Handle date comparison
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc' 
        ? aValue.getTime() - bValue.getTime() 
        : bValue.getTime() - aValue.getTime();
    }
    
    return 0;
  });

  // Toggle sort direction
  const toggleSort = (field: keyof Contact) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Open contact details
  const handleOpenDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setDetailDialogOpen(true);
  };

  // Update contact
  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(currentContacts => 
      currentContacts.map(c => 
        c.id === updatedContact.id ? updatedContact : c
      )
    );
    setSelectedContact(updatedContact);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Contacts</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 w-full md:w-[300px]"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterStatus('All')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Stalled')}>
                  Stalled
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('New')}>
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Won')}>
                  Won
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Lost')}>
                  Lost
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button className="gap-2 bg-teal hover:bg-teal-dark text-white">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Contact</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider w-[40%]">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => toggleSort('name')}
                    >
                      Contact
                      {sortField === 'name' && (
                        <ArrowDownUp className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => toggleSort('status')}
                    >
                      Status
                      {sortField === 'status' && (
                        <ArrowDownUp className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider hidden md:table-cell">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => toggleSort('createdAt')}
                    >
                      Added
                      {sortField === 'createdAt' && (
                        <ArrowDownUp className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                    <SlidersHorizontal className="h-3 w-3 inline-block" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedContacts.map((contact) => {
                  const initials = contact.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase();
                    
                  return (
                    <tr 
                      key={contact.id} 
                      className="border-b border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleOpenDetails(contact)}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback className="bg-teal text-white">{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-charcoal">{contact.name}</div>
                            <div className="text-sm text-charcoal/70">{contact.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={contact.status} />
                      </td>
                      <td className="px-4 py-4 text-sm text-charcoal/70 hidden md:table-cell">
                        {contact.createdAt && formatDate(contact.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                
                {sortedContacts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      No contacts found. 
                      {filterStatus !== 'All' && (
                        <Button variant="link" onClick={() => setFilterStatus('All')}>
                          Clear filters
                        </Button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Contact detail dialog */}
      {selectedContact && (
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="sm:max-w-[900px] p-0">
            <ContactDetail 
              contact={selectedContact} 
              onSave={handleUpdateContact} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}