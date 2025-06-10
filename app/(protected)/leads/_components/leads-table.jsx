// app/(protected)/leads/_components/leads-table.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { Loader2, Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllLeads, deleteLead } from "@/actions/leads"; // <- make sure these exist

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* ──────────────────────────────────────────────────────────── */



export function LeadsTable() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null); // track deleting row

  /* fetch all leads once */
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

  /* delete handler */
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

  /* skeleton while loading */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Table className="rounded-xl border border-border shadow-sm">
      <TableHeader>
        <TableRow>
          <TableHead>Person</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="hidden md:table-cell">Lead&nbsp;Type</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden lg:table-cell">Lead&nbsp;Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{lead.personName}</TableCell>
            <TableCell>{lead.companyName}</TableCell>
            <TableCell className="hidden md:table-cell capitalize">
              {lead.leadType}
            </TableCell>
            <TableCell className="hidden md:table-cell capitalize">
              {lead.status}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {lead.leadDate
                ? new Date(lead.leadDate).toLocaleDateString()
                : "—"}
            </TableCell>

            {/* ───────── Action buttons ───────── */}
            <TableCell className="flex gap-1 justify-end">
              <Button
                size="icon"
                variant="outline"
                onClick={() => router.push(`/leads/${lead.id}`)}
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
  );
}
