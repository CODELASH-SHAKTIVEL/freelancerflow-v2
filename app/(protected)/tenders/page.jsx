"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { PlusCircle, FileEdit, Eye, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserTenders } from "@/actions/tender";

export default function UserTendersPage() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    async function fetchTenders() {
      const res = await getUserTenders();
      setTenders(res || []);
    }
    fetchTenders();
  }, []);

  return (
    <div className="w-full max-w-screen-2xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">My Tenders</h1>
        </div>

        <Button asChild className="gap-2">
          <Link href="/tenders/new">
            <PlusCircle className="w-4 h-4" />
            Create New Tender
          </Link>
        </Button>
      </div>

      {/* Tenders Table */}
      <Card className="border border-muted bg-background shadow-sm">
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenders.length > 0 ? (
                tenders.map((tender) => {
                  const isClosed = new Date(tender.deadline) < new Date();
                  return (
                    <TableRow key={tender.id}>
                      <TableCell className="font-medium">{tender.title}</TableCell>
                      <TableCell>
                        {tender.deadline
                          ? format(new Date(tender.deadline), "PPP")
                          : "—"}
                      </TableCell>
                      <TableCell>
                        {tender.createdAt
                          ? format(new Date(tender.createdAt), "PPP")
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                            isClosed
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          }`}
                        >
                          {isClosed ? (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Closed
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Open
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/tenders/${tender.id}/view`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/tenders/${tender.id}/edit`}>
                            <FileEdit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No tenders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
