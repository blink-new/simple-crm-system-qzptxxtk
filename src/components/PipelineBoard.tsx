import { useState } from "react";
import { ContactCard } from "./ContactCard";
import { pipelineStages, mockContacts } from "@/lib/data";
import { Contact, PipelineStage } from "@/lib/types";
import { Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useDndMonitor, useSensor, useSensors, DndContext, PointerSensor } from "@dnd-kit/core";
import { motion } from "framer-motion";

export default function PipelineBoard() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);

  // Setup DND kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Count contacts and total value per stage
  const stageMetrics = pipelineStages.reduce((acc, stage) => {
    const stageContacts = contacts.filter(c => c.stage === stage.key);
    const totalValue = stageContacts.reduce((sum, c) => sum + (c.value || 0), 0);
    
    return {
      ...acc,
      [stage.key]: {
        count: stageContacts.length,
        value: totalValue
      }
    };
  }, {} as Record<PipelineStage, { count: number; value: number }>);
  
  // Handle card click
  const handleCardClick = (contact: Contact) => {
    setActiveContact(contact);
    setContactDetailsOpen(true);
  };
  
  // Handle drag and drop
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!active || !over || active.id === over.id) return;
    
    const contactId = active.id;
    const newStage = over.id as PipelineStage;
    
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, stage: newStage } 
          : contact
      )
    );
  };
  
  return (
    <>
      {/* Pipeline header */}
      <div className="sticky top-16 z-20 bg-mint/95 backdrop-blur-sm border-b border-teal/10 p-4 shadow-sm">
        <div className="flex justify-between items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold text-charcoal">Sales Pipeline</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All deals</DropdownMenuItem>
                <DropdownMenuItem>My deals</DropdownMenuItem>
                <DropdownMenuItem>Active deals</DropdownMenuItem>
                <DropdownMenuItem>Won deals</DropdownMenuItem>
                <DropdownMenuItem>Lost deals</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button size="sm" className="gap-2 bg-teal hover:bg-teal-dark text-white">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add contact</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main pipeline board */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-1 gap-4 overflow-x-auto pb-8 px-4 md:px-6 min-h-[calc(100vh-160px)]">
          {pipelineStages.map((stage) => (
            <motion.div 
              key={stage.key}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="pipeline-column w-80 min-w-[320px] flex-shrink-0 flex flex-col"
            >
              <div className="font-medium text-charcoal mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`block w-2 h-2 rounded-full ${stage.color}`} />
                  <span>{stage.label}</span>
                  <Badge variant="outline" className="ml-1">
                    {stageMetrics[stage.key as PipelineStage]?.count || 0}
                  </Badge>
                </div>
                {stageMetrics[stage.key as PipelineStage]?.value > 0 && (
                  <span className="text-xs font-normal text-emerald-600">
                    ${stageMetrics[stage.key as PipelineStage]?.value.toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-h-[300px]" id={stage.key}>
                {contacts.filter((c) => c.stage === stage.key).length === 0 ? (
                  <div className="text-charcoal/40 text-sm italic text-center mt-8 border border-dashed border-charcoal/20 rounded-md p-4">
                    No contacts in this stage
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contacts
                      .filter((c) => c.stage === stage.key)
                      .map((contact) => (
                        <ContactCard 
                          key={contact.id} 
                          contact={contact} 
                          onClick={() => handleCardClick(contact)}
                        />
                      ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </DndContext>
      
      {/* Contact details dialog */}
      {activeContact && (
        <Dialog open={contactDetailsOpen} onOpenChange={setContactDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">{activeContact.name}</h3>
                <p className="text-muted-foreground">{activeContact.company}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Email</div>
                  <div>{activeContact.email || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Phone</div>
                  <div>{activeContact.phone || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Status</div>
                  <div>{activeContact.status}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Stage</div>
                  <div>{pipelineStages.find(s => s.key === activeContact.stage)?.label || activeContact.stage}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Notes</div>
                <div className="border rounded-md p-3 bg-gray-50 min-h-[100px]">
                  {activeContact.notes || 'No notes yet.'}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}