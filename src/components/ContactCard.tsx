import { BadgeCheck, StickyNote } from "lucide-react";

export type Contact = {
  id: string;
  name: string;
  company: string;
  status: string;
  stage: string;
  notes: string;
};

const statusColors: Record<string, string> = {
  "Active": "bg-skyblue text-white",
  "Stalled": "bg-charcoal text-white",
  "Won": "bg-green-500 text-white",
  "Lost": "bg-red-500 text-white",
  "New": "bg-mint text-charcoal border border-skyblue",
};

export function ContactCard({ contact, onClick }: { contact: Contact; onClick?: () => void }) {
  return (
    <div
      className={`contact-card border-l-4 ${
        contact.status === "Won"
          ? "border-green-500"
          : contact.status === "Lost"
          ? "border-red-500"
          : "border-skyblue"
      } group hover:scale-[1.03] focus-within:scale-[1.03] transition-transform duration-150`}
      tabIndex={0}
      aria-label={`Contact card for ${contact.name}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="font-semibold text-lg text-charcoal font-sans">{contact.name}</div>
        <span className={`status-badge ${statusColors[contact.status] || "bg-mint text-charcoal"}`}>{contact.status}</span>
      </div>
      <div className="text-sm text-charcoal/80 mb-2">{contact.company}</div>
      <div className="flex items-center gap-2 text-xs text-charcoal/60">
        <StickyNote className="w-4 h-4" />
        <span className="truncate max-w-[140px]">{contact.notes || "No notes yet"}</span>
      </div>
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <BadgeCheck className="w-5 h-5 text-skyblue" />
      </div>
    </div>
  );
}
