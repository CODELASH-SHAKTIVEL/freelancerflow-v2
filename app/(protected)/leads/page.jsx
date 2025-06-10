// app/(protected)/leads/page.tsx

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadsTable } from "./_components/leads-table";

const LeadsPage = () => {
  return (
    <section className="p-6 space-y-6">
      {/* Header Row: Title + Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Leads</h1>
        <Button asChild variant="default">
          <Link href="/leads/create">
            <span className="text-sm font-medium">+ Create Lead</span>
          </Link>
        </Button>
      </div>

      {/* Leads Table */}
      <div>
        <LeadsTable />
      </div>
    </section>
  );
};

export default LeadsPage;
