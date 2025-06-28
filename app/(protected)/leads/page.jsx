import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadsTable } from "./_components/leads-table";
import { Users, PlusCircle } from "lucide-react";

const LeadsPage = () => {
  return (
    <section className="w-full px-4 md:px-6 py-8 space-y-8 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl md:text-3xl font-bold">Leads</h1>
        </div>

        <Button asChild>
          <Link href="/leads/create" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Create Lead</span>
          </Link>
        </Button>
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden">
        <LeadsTable />
      </div>
    </section>
  );
};

export default LeadsPage;
