"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTenders } from "@/actions/tender";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function AdminTendersPage() {
  const [tenders, setTenders] = useState(null);

  useEffect(() => {
    async function fetchTenders() {
      const result = await getAllTenders();
      setTenders(result);
    }
    fetchTenders();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Tenders</h2>
        <Link href="/admin/bidding-tenders/new">
          <Button>Create Tender</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!tenders ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : tenders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No tenders found.
                  </TableCell>
                </TableRow>
              ) : (
                tenders.map((tender) => {
                  const isPastDeadline = new Date(tender.deadline) < new Date();
                  return (
                    <TableRow key={tender.id}>
                      <TableCell className="font-medium">{tender.title}</TableCell>
                      <TableCell>{format(new Date(tender.deadline), "PPP")}</TableCell>
                      <TableCell>{tender.typeOfWork}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isPastDeadline ? "text-red-500" : "text-green-600"
                          )}
                        >
                          {isPastDeadline ? "Closed" : "Open"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link href={`/admin/bidding-tenders/${tender.id}/edit`}>
                          <Button variant="outline" size="sm">Edit</Button>
                        </Link>
                        <Link href={`/admin/bidding-tenders/${tender.id}/bids`}>
                          <Button variant="secondary" size="sm">View Bids</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
