// app/(protected)/leads/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import { getLead } from "@/actions/leads";
import { EditLeadForm } from "./_components/edit-lead-form";
import { FileEdit } from "lucide-react";

export default async function LeadEditPage({ params }) {
  const lead = await getLead(params.id).catch(() => null);
  if (!lead) notFound();

  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <FileEdit className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">
          Edit Lead
        </h1>
      </div>

      {/* Full-width form container */}
      <div className="w-full bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-sm p-4 md:p-6">
        <EditLeadForm lead={lead} />
      </div>
    </section>
  );
}
