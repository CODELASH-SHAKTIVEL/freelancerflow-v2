"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { getTenderById } from "@/actions/tender";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TenderDetailPage() {
  const params = useParams();
  const [tender, setTender] = useState(null);

  useEffect(() => {
    async function fetchTender() {
      const res = await getTenderById(params.id);
      setTender(res);
    }
    if (params.id) fetchTender();
  }, [params.id]);

  if (!tender) return <p className="p-6">Loading...</p>;

  const isClosed = new Date(tender.deadline) < new Date();

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{tender.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Description:</strong> {tender.description}</p>
          <p><strong>Type of Work:</strong> {tender.typeOfWork}</p>
          <p><strong>Skills Required:</strong> {tender.skillsRequired}</p>
          <p><strong>Job Details:</strong> {tender.jobDetails}</p>
          <p><strong>RFQ Date:</strong> {format(new Date(tender.rfqDate), "PPP")}</p>
          <p><strong>Deadline:</strong> {format(new Date(tender.deadline), "PPP")} {isClosed && <Badge variant="destructive">Closed</Badge>}</p>
          {tender.documentsUrl && (
            <p>
              <a
                href={tender.documentsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download Document
              </a>
            </p>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2">Submitted Bids</h2>
        {tender.bids?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bidder</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Pitch Deck</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tender.bids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>{bid.bidder?.name || "Anonymous"}</TableCell>
                  <TableCell>₹{bid.bidAmount.toLocaleString("en-IN")}</TableCell>
                  <TableCell><Badge variant="outline">{bid.status}</Badge></TableCell>
                  <TableCell>{format(new Date(bid.bidDate), "PPP p")}</TableCell>
                  <TableCell>
                    {bid.pitchDeckUrl && (
                      <a
                        href={bid.pitchDeckUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View PDF
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">No bids submitted yet.</p>
        )}
      </div>
    </div>
  );
}
