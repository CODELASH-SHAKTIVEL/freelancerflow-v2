/* ------------------------------------------------------------------
   Lead Edit Page
   – Loads the lead on the server with getLead()
   – Renders a client component (EditLeadForm) so the user can edit
   – Calls updateLead() on submit, then routes back to the lead view
-------------------------------------------------------------------*/

import { notFound, redirect } from "next/navigation";
import { getLead, updateLead } from "@/actions/leads";
import { EditLeadForm } from "./_components/edit-lead-form";

// ➊ Server component: fetch the lead, hand it to the form
export default async function LeadEditPage({
  params,
}) {
  const lead = await getLead(params.id).catch(() => null);
  console.log("Lead Edit Page", lead);
  if (!lead) notFound();

  return (
    /* Sidebar / header already provided by dashboard layout */
    <section className="flex flex-col gap-6 p-6 overflow-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold text-foreground">Edit Lead</h1>

      <div className="rounded-xl border border-border bg-background shadow-sm">
        {/* Client form below */}
        <EditLeadForm lead={lead} />
      </div>
    </section>
  );
}
