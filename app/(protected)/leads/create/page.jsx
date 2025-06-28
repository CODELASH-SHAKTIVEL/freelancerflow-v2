// app/(protected)/leads/create/page.tsx

import React from "react";
import { LeadForm } from "../_components/leads-form";
import { FilePlus2 } from "lucide-react";

export default function CreateLeadPage() {
  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* Page Header with Icon */}
      <div className="flex items-center gap-3">
        <FilePlus2 className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">
          Create Lead
        </h1>
      </div>

      {/* Full-width form */}
      <div className="w-full bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-sm p-4 md:p-6">
        <LeadForm />
      </div>
    </section>
  );
}
