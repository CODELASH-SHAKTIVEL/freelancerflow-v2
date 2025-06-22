"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { format } from "date-fns";

import { getUserTenders } from "@/actions/tender";

export default function UserTendersPage() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    async function fetchTenders() {
      const res = await getUserTenders();
      setTenders(res);
    }
    fetchTenders();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Tenders</h2>
        <Button asChild>
          <Link href="/tenders/new">Create New Tender</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenders.map((tender) => {
            const isClosed = new Date(tender.deadline) < new Date();
            return (
              <TableRow key={tender.id}>
                <TableCell>{tender.title}</TableCell>
                <TableCell>
                  {tender.deadline ? format(new Date(tender.deadline), "PPP") : "N/A"}
                </TableCell>
                <TableCell>
                  {tender.createdAt ? format(new Date(tender.createdAt), "PPP") : "N/A"}
                </TableCell>
                <TableCell>
                  <span className={isClosed ? "text-red-500" : "text-green-600"}>
                    {isClosed ? "Closed" : "Open"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" asChild variant="outline">
                    <Link href={`/tenders/${tender.id}/view`}>View</Link>
                  </Button>
                  <Button size="sm" asChild variant="secondary">
                    <Link href={`/tenders/${tender.id}/edit`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
