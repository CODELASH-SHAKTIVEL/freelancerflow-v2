// app/crm/page.jsx

import Link from "next/link";
import { getAllLeads } from "@/actions/leads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Users,
  Factory,
  Mail,
  CircleDot,
  CalendarClock,
  ArrowRightSquare,
  Ban,
} from "lucide-react";

export default async function CRMPage() {
  const leads = await getAllLeads();

  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">
          CRM Leads
        </h1>
      </div>

      {/* Card containing table */}
      <Card className="w-full border border-border bg-background shadow-sm">
        <CardContent className="overflow-x-auto px-0 ">
          {leads.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Ban className="mx-auto mb-2 h-6 w-6" />
              No leads found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">
                    <Users className="inline h-4 w-4 mr-1" />
                    Person
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    <Factory className="inline h-4 w-4 mr-1" />
                    Company
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    <CircleDot className="inline h-4 w-4 mr-1" />
                    Lead Source
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    <ArrowRightSquare className="inline h-4 w-4 mr-1" />
                    Stage
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    <CalendarClock className="inline h-4 w-4 mr-1" />
                    Created
                  </TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.personName || "—"}</TableCell>
                    <TableCell>{lead.companyName || "—"}</TableCell>
                    <TableCell>{lead.emailId || "—"}</TableCell>
                    <TableCell>{lead.leadSource || "—"}</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {lead.journeyStage || "LEAD"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/crm/${lead.id}`}>Manage</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
