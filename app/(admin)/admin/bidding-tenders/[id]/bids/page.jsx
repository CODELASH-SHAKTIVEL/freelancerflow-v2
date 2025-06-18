"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTenderBids } from "@/actions/tender";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function TenderBidsPage() {
  const { id } = useParams();
  const [bids, setBids] = useState(null);

  useEffect(() => {
    async function fetchBids() {
      try {
        const result = await getTenderBids(id);
        setBids(result);
      } catch (err) {
        console.error("Error loading bids", err);
      }
    }

    fetchBids();
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Bids for Tender</h2>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bidder</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Amount (INR)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pitch Deck</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!bids ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : bids.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No bids submitted yet.
                  </TableCell>
                </TableRow>
              ) : (
                bids.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell className="font-medium">{bid.bidder?.name || "Unknown"}</TableCell>
                    <TableCell>{format(new Date(bid.bidDate), "PPP")}</TableCell>
                    <TableCell>{bid.bidAmount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          bid.status === "SUBMITTED"
                            ? "secondary"
                            : bid.status === "ACCEPTED"
                            ? "success"
                            : bid.status === "REJECTED"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {bid.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {bid.pitchDeckUrl ? (
                        <a
                          href={bid.pitchDeckUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          View PDF
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">No file</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
