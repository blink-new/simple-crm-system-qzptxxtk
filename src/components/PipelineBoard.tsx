import { ContactCard, Contact } from "./ContactCard";

const stages = [
  { key: "lead", label: "Lead" },
  { key: "contacted", label: "Contacted" },
  { key: "demo", label: "Demo" },
  { key: "proposal", label: "Proposal" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

const mockContacts: Contact[] = [
  { id: "1", name: "Jane Doe", company: "Acme Corp", status: "Active", stage: "lead", notes: "Follow up next week." },
  { id: "2", name: "John Smith", company: "Globex", status: "Stalled", stage: "contacted", notes: "Waiting for reply." },
  { id: "3", name: "Alice Lee", company: "Initech", status: "New", stage: "demo", notes: "Demo scheduled for Friday." },
  { id: "4", name: "Bob Brown", company: "Umbrella", status: "Won", stage: "won", notes: "Closed successfully!" },
  { id: "5", name: "Carol White", company: "Soylent", status: "Lost", stage: "lost", notes: "Went with competitor." },
  { id: "6", name: "Eve Black", company: "Hooli", status: "Active", stage: "proposal", notes: "Proposal sent, awaiting feedback." },
];

export default function PipelineBoard() {
  return (
    <div className="flex flex-1 gap-4 overflow-x-auto pt-20 pb-6 px-4 md:px-8">
      {stages.map((stage) => (
        <div key={stage.key} className="pipeline-column w-72 min-w-[260px] flex-shrink-0 flex flex-col">
          <div className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
            <span className="block w-2 h-2 rounded-full bg-skyblue animate-pulse" />
            {stage.label}
          </div>
          <div className="flex-1">
            {mockContacts.filter((c) => c.stage === stage.key).length === 0 ? (
              <div className="text-charcoal/40 text-sm italic mt-8 text-center">No contacts</div>
            ) : (
              mockContacts
                .filter((c) => c.stage === stage.key)
                .map((contact) => <ContactCard key={contact.id} contact={contact} />)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
