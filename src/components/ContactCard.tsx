import { BadgeCheck, DollarSign, Mail, Phone, StickyNote } from "lucide-react";
import { StatusBadge } from "./ui/status-badge";
import { Contact } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ContactCard({ 
  contact, 
  onClick,
  isDragging = false
}: { 
  contact: Contact; 
  onClick?: () => void;
  isDragging?: boolean;
}) {
  // Get initials from name for avatar fallback
  const initials = contact.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`contact-card bg-white border-l-4 ${
        contact.status === "Won"
          ? "border-green-500"
          : contact.status === "Lost"
          ? "border-red-500"
          : "border-skyblue"
      } p-4 rounded-md shadow-sm ${isDragging ? 'shadow-md ring-2 ring-skyblue/20' : ''} 
        mb-3 cursor-pointer transition-all group hover:shadow-md relative`}
      tabIndex={0}
      aria-label={`Contact card for ${contact.name}`}
      onClick={onClick}
    >
      <div className="flex items-start mb-3">
        <Avatar className="h-10 w-10 mr-3 border border-gray-200">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-teal text-white">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-semibold text-charcoal truncate mr-2" title={contact.name}>{contact.name}</div>
            <StatusBadge status={contact.status} />
          </div>
          <div className="text-sm text-charcoal/80 truncate" title={contact.company}>{contact.company}</div>
        </div>
      </div>
      
      {contact.value && (
        <div className="flex items-center gap-1 mb-1.5 text-sm font-medium text-emerald-600">
          <DollarSign className="w-3.5 h-3.5" />
          <span>{formatCurrency(contact.value)}</span>
          {contact.probability && contact.probability < 1 && (
            <span className="text-charcoal/60 font-normal"> · {Math.round(contact.probability * 100)}%</span>
          )}
        </div>
      )}
      
      <div className="flex flex-col gap-1 text-xs text-charcoal/70">
        {contact.email && (
          <div className="flex items-center gap-1.5 truncate" title={contact.email}>
            <Mail className="w-3 h-3 text-skyblue/80" />
            <span>{contact.email}</span>
          </div>
        )}
        
        {contact.phone && (
          <div className="flex items-center gap-1.5 truncate" title={contact.phone}>
            <Phone className="w-3 h-3 text-skyblue/80" />
            <span>{contact.phone}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1.5 mt-1">
          <StickyNote className="w-3 h-3 text-skyblue/80 flex-shrink-0" />
          <span className="truncate" title={contact.notes}>{contact.notes || "No notes yet"}</span>
        </div>
      </div>
      
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <BadgeCheck className="w-5 h-5 text-skyblue" />
      </div>
    </motion.div>
  );
}