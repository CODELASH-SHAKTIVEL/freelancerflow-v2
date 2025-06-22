import { notFound } from "next/navigation";
import { getLead } from "@/actions/leads";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

/* ---------- Server Component ---------- */
export default async function LeadViewPage({ params }) {
  const lead = await getLead(params.id).catch(() => null);
  if (!lead) notFound();

  return (
    <section className="flex flex-col gap-8 p-6 max-w-screen-xl mx-auto text-sm text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-bold text-primary dark:text-primary-foreground tracking-tight">
        🧾 Lead Details
      </h1>

      {/* Person / Contact */}
      <LeadSection title="👤 Person & Contact Info">
        <Item label="Name">{lead.personName}</Item>
        <Item label="Mobile">{lead.mobileNo}</Item>
        <Item label="Email">{lead.emailId}</Item>
        <Item label="Capacity">{lead.capacity}</Item>
        <Item label="Address" className="md:col-span-2">{lead.address}</Item>
        <Item label="State/Country">{lead.state}, {lead.country}</Item>
        <Item label="Pin Code">{lead.pinCode}</Item>
        <Item label="Designation">{lead.designation}</Item>
        <Item label="Department">{lead.department}</Item>
        <Item label="Client Type">{lead.clientType}</Item>
      </LeadSection>

      {/* Company Info */}
      <LeadSection title="🏢 Company Info">
        <Item label="Name">{lead.companyName}</Item>
        <Item label="Contact">{lead.companyContact}</Item>
        <Item label="Email">{lead.companyEmail}</Item>
        <Item label="Website">{lead.companyWebsite}</Item>
        <Item label="Type">{lead.companyType}</Item>
        <Item label="Profession">{lead.companyProfession}</Item>
        <Item label="Previously Worked">{lead.previouslyWorked ? "Yes" : "No"}</Item>
        <Item label="Address" className="md:col-span-2">{lead.companyAddress}</Item>
        <Item label="State/Country">{lead.companyState}, {lead.companyCountry}</Item>
        <Item label="Pin Code">{lead.companyPinCode}</Item>
      </LeadSection>

      {/* Lead Source Info */}
      <LeadSection title="📢 Lead Origin">
        <Item label="Source">{lead.leadSource}</Item>
        <Item label="Reference For Lead">{lead.referenceForLead}</Item>
        <Item label="Type of Lead">{lead.typeOfLead}</Item>
        <Item label="Lead Detail">{lead.leadDetails}</Item>
      </LeadSection>

      {/* Project Details */}
      <LeadSection title="📁 Project & Status Info">
        <Item label="Enquiry Type">{lead.enquiryType}</Item>
        <Item label="Project Type">{lead.projectType}</Item>
        <Item label="Action">{lead.action}</Item>
        <Item label="Lead Status">{lead.status}</Item>
        <Item label="Lead Date">
          {lead.leadDate ? new Date(lead.leadDate).toLocaleDateString() : "—"}
        </Item>
        <Item label="Quote Due Date">
          {lead.quoteDate ? new Date(lead.quoteDate).toLocaleDateString() : "—"}
        </Item>
      </LeadSection>

      {/* Completion */}
      <LeadSection title="✅ Completion Details">
        <Item label="Job Main Category">{lead.jobMainCategory}</Item>
        <Item label="Job Sub Category">{lead.jobSubCategory}</Item>
        <Item label="Message" className="md:col-span-2">{lead.leadMessage}</Item>
      </LeadSection>

      {/* Meta */}
      <LeadSection title="🗓️ Meta Info">
        <Item label="Created At">{new Date(lead.createdAt).toLocaleString()}</Item>
        <Item label="Updated At">{new Date(lead.updatedAt).toLocaleString()}</Item>
      </LeadSection>
    </section>
  );
}

/* ---------- Layout Components ---------- */
function LeadSection({ title, children }) {
  return (
    <Card className="border-muted bg-white dark:bg-zinc-900 shadow-sm">
      <CardHeader className="pb-2 border-b border-border">
        <CardTitle className="text-base text-muted-foreground dark:text-zinc-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {children}
      </CardContent>
    </Card>
  );
}

function Item({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col rounded-md p-3 bg-zinc-100 dark:bg-zinc-800 ${className}`}>
      <span className="text-xs text-muted-foreground dark:text-zinc-400">{label}</span>
      <span className="font-medium break-words text-zinc-900 dark:text-white">
        {children || "—"}
      </span>
    </div>
  );
}
