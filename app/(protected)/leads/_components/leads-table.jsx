"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllLeads, deleteLead } from "@/actions/leads";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // <-- Add this for visual indicators

/* ──────────────────────────────────────────────────────────── */

function formatValue(value) {
  return value ? value.replace(/_/g, " ").toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase()) : "—";
}

export function LeadsTable() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  // Fetch leads
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllLeads();
        setLeads(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Handle deletion
  const handleDelete = async (id) => {
    setBusyId(id);
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lead deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="min-w-[160px]">Person</TableHead>
            <TableHead className="min-w-[160px]">Company</TableHead>
            <TableHead className="hidden md:table-cell">Lead Type</TableHead>
            <TableHead className="hidden md:table-cell">Lead Details</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.personName}</TableCell>
              <TableCell>{lead.companyName || "—"}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{formatValue(lead.typeOfLead)}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary">{formatValue(lead.leadDetails)}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant={
                    lead.status === "NEW_LEAD"
                      ? "default"
                      : lead.status === "FOLLOWUP"
                      ? "secondary"
                      : lead.status === "CLOSED"
                      ? "success"
                      : lead.status === "LAPSED"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {formatValue(lead.status)}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {lead.leadDate
                  ? new Date(lead.leadDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </TableCell>

              {/* Actions */}
              <TableCell className="flex gap-1 justify-end">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => router.push(`/leads/${lead.id}/view`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => router.push(`/leads/${lead.id}/edit`)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  disabled={busyId === lead.id}
                  onClick={() => handleDelete(lead.id)}
                >
                  {busyId === lead.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
