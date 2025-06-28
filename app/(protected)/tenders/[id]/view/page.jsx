"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { getTenderById } from "@/actions/tender";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  Loader2,
  FileText,
  ListOrdered,
  FileDown,
  Info,
} from "lucide-react";

export default function TenderDetailPage() {
  const params = useParams();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTender() {
      const res = await getTenderById(params.id);
      setTender(res);
      setLoading(false);
    }
    if (params.id) fetchTender();
  }, [params.id]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-10">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!tender) {
    return <p className="p-6 text-muted-foreground">Tender not found.</p>;
  }

  const isClosed = new Date(tender.deadline) < new Date();

  return (
    <section className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Page Title */}
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">{tender.title}</h1>
      </div>

      {/* Tender Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Info className="w-4 h-4" />
            Tender Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div><strong>Description:</strong> {tender.description}</div>
          <div><strong>Type of Work:</strong> {tender.typeOfWork}</div>
          <div><strong>Skills Required:</strong> {tender.skillsRequired}</div>
          <div><strong>Job Details:</strong> {tender.jobDetails}</div>
          <div>
            <strong>RFQ Date:</strong>{" "}
            {format(new Date(tender.rfqDate), "PPP")}
          </div>
          <div>
            <strong>Deadline:</strong>{" "}
            {format(new Date(tender.deadline), "PPP")}{" "}
            {isClosed && (
              <Badge variant="destructive" className="ml-2">Closed</Badge>
            )}
          </div>
          {tender.documentsUrl && (
            <div className="col-span-2">
              <a
                href={tender.documentsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 underline hover:opacity-90"
              >
                <FileDown className="w-4 h-4 mr-1" />
                Download Document
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submitted Bids */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ListOrdered className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Submitted Bids
          </h2>
        </div>

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
                  <TableCell>
                    <Badge variant="outline">{bid.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(bid.bidDate), "PPP p")}
                  </TableCell>
                  <TableCell>
                    {bid.pitchDeckUrl ? (
                      <a
                        href={bid.pitchDeckUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline hover:opacity-90"
                      >
                        View PDF
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
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
    </section>
  );
}
