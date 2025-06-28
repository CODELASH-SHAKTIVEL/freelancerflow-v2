"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Info, Upload, IndianRupee, FileText, FileCheck2 } from "lucide-react";

import { getAllTenders } from "@/actions/tender";
import { getUserBids, submitBid } from "@/actions/bid";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function UserBidsPage() {
  const [tenders, setTenders] = useState([]);
  const [bids, setBids] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const [infoTender, setInfoTender] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [pitchDeck, setPitchDeck] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const allTenders = await getAllTenders();
      const userBids = await getUserBids();
      setTenders(allTenders);
      setBids(userBids);
    }
    fetchData();
  }, []);

  const hasBid = (tenderId) => bids.some((bid) => bid.tenderId === tenderId);

  const handleSubmit = async () => {
    if (!pitchDeck || !bidAmount || !selectedTender) return;
    setSubmitting(true);
    try {
      await submitBid({
        tenderId: selectedTender.id,
        bidAmount: parseFloat(bidAmount),
        pitchDeckUrl: pitchDeck,
      });

      const updated = await getUserBids();
      setBids(updated);

      setSelectedTender(null);
      setBidAmount("");
      setPitchDeck(null);
    } catch (error) {
      console.error("Bid submission failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-2">
        <FileCheck2 className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Available Tenders</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenders.map((tender) => {
            const isSubmitted = hasBid(tender.id);
            const isPastDeadline =
              tender?.deadline && new Date(tender.deadline) < new Date();

            return (
              <TableRow key={tender.id}>
                <TableCell className="font-medium">{tender.title}</TableCell>
                <TableCell>
                  {tender?.deadline
                    ? format(new Date(tender.deadline), "PPP")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge variant={isPastDeadline ? "destructive" : "default"}>
                    {isPastDeadline ? "Closed" : "Open"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  {/* Info Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setInfoTender(tender)}
                      >
                        <Info className="w-4 h-4 mr-1" /> Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>{infoTender?.title}</DialogTitle>
                      <div className="space-y-3 mt-4 text-sm">
                        <p><strong>Description:</strong> {infoTender?.description || "N/A"}</p>
                        <p><strong>Type of Work:</strong> {infoTender?.typeOfWork || "N/A"}</p>
                        <p><strong>Skills Required:</strong> {infoTender?.skillsRequired || "N/A"}</p>
                        <p><strong>Job Details:</strong> {infoTender?.jobDetails || "N/A"}</p>
                        <p>
                          <strong>RFQ Date:</strong>{" "}
                          {infoTender?.rfqDate
                            ? format(new Date(infoTender.rfqDate), "PPP")
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Deadline:</strong>{" "}
                          {infoTender?.deadline
                            ? format(new Date(infoTender.deadline), "PPP")
                            : "N/A"}
                        </p>
                        {infoTender?.documentsUrl && (
                          <p>
                            <a
                              href={infoTender.documentsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Download Document
                            </a>
                          </p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Submit Bid Button */}
                  {!isSubmitted && !isPastDeadline && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedTender(tender);
                            setBidAmount("");
                            setPitchDeck(null);
                          }}
                        >
                          <IndianRupee className="w-4 h-4 mr-1" /> Submit Bid
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Submit Bid for {tender.title}</DialogTitle>
                        <div className="space-y-4 mt-4">
                          <div className="space-y-1.5">
                            <Label>Pitch Deck (PDF)</Label>
                            <Input
                              type="file"
                              accept=".pdf"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUploading(true);
                                try {
                                  const data = await uploadToCloudinary(file);
                                  setPitchDeck(data.secure_url);
                                } catch (err) {
                                  console.error("Upload failed", err);
                                } finally {
                                  setUploading(false);
                                }
                              }}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label>Bid Amount (INR)</Label>
                            <Input
                              type="number"
                              value={bidAmount}
                              onChange={(e) => setBidAmount(e.target.value)}
                              placeholder="Enter your bid amount"
                            />
                          </div>
                          <Button
                            onClick={handleSubmit}
                            disabled={!bidAmount || !pitchDeck || submitting}
                          >
                            {submitting ? "Submitting..." : "Submit Bid"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {isSubmitted && <Badge variant="outline">Submitted</Badge>}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
