// app/crm/[id]/page.jsx
import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  User,
  Building2,
  Mail,
  Phone,
  ArrowLeft,
  StickyNote,
  CalendarCheck,
  Tag,
  Workflow,
} from "lucide-react";

// Subcomponents
import CrmNotes from "./notes";
import CrmFollowUps from "./followups";
import CrmTags from "./tags";
import CrmStatus from "./status";

export default async function CrmLeadPage({ params }) {
  const leadId = params.id;

  const lead = await db.lead.findUnique({
    where: { id: leadId },
    include: {
      crmNotes: true,
      crmFollowUps: true,
      crmTags: true,
      crmStatus: true,
    },
  });

  if (!lead) return notFound();

  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Workflow className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">
            CRM for: {lead.personName || lead.companyName || "Unnamed Lead"}
          </h1>
        </div>

        <Button variant="outline" asChild>
          <Link href="/crm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Leads
          </Link>
        </Button>
      </div>

      {/* Lead Info */}
      <Card className="border border-border bg-background shadow-sm">
        <CardHeader className="pb-2 border-b border-border">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-muted-foreground">
            <User className="h-5 w-5" />
            Lead Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Info label="Person" icon={<User className="h-4 w-4" />}>
            {lead.personName || "—"}
          </Info>
          <Info label="Email" icon={<Mail className="h-4 w-4" />}>
            {lead.emailId || "—"}
          </Info>
          <Info label="Company" icon={<Building2 className="h-4 w-4" />}>
            {lead.companyName || "—"}
          </Info>
          <Info label="Mobile" icon={<Phone className="h-4 w-4" />}>
            {lead.mobileNo || "—"}
          </Info>
        </CardContent>
      </Card>

      {/* Divider */}
      <Separator />

      {/* CRM Feature Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border bg-background shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
              <StickyNote className="h-5 w-5" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CrmNotes leadId={lead.id} notes={lead.crmNotes} />
          </CardContent>
        </Card>

        <Card className="border border-border bg-background shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
              <CalendarCheck className="h-5 w-5" />
              Follow Ups
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CrmFollowUps leadId={lead.id} followUps={lead.crmFollowUps} />
          </CardContent>
        </Card>

        <Card className="border border-border bg-background shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
              <Tag className="h-5 w-5" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CrmTags leadId={lead.id} tags={lead.crmTags} />
          </CardContent>
        </Card>

        <Card className="border border-border bg-background shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
              <Workflow className="h-5 w-5" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CrmStatus leadId={lead.id} status={lead.crmStatus?.value || null} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ---------- Utility Display Component ---------- */
function Info({ label, icon, children }) {
  return (
    <div className="flex flex-col bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3">
      <span className="flex items-center text-xs text-muted-foreground mb-1 gap-1">
        {icon}
        {label}
      </span>
      <span className="text-sm font-medium text-foreground dark:text-white">
        {children}
      </span>
    </div>
  );
}
