"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";


const dummyTenders = [
  {
    id: "1",
    title: "Social Media Campaign for SaaS Product",
    description: "Run a 3-month Twitter + LinkedIn campaign with paid ads.",
    deadline: "2025-06-10",
    postedOn: "2025-06-01",
  },
  {
    id: "2",
    title: "UI/UX Redesign for E-commerce",
    description: "Redesign web and mobile versions of an online store.",
    deadline: "2025-06-14",
    postedOn: "2025-06-03",
  },
];

export default function BiddingTendersPage() {
  const [selectedTender, setSelectedTender] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [pitchFile, setPitchFile] = useState(null);

  const handleBidSubmit = () => {
    // Placeholder for actual submit logic
    console.log({
      tenderId: selectedTender?.id,
      price: bidPrice,
      pitch: pitchFile,
    });
    setSelectedTender(null);
    setBidPrice("");
    setPitchFile(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Bidding & Tenders</h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Posted On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyTenders.map((tender) => (
              <TableRow key={tender.id}>
                <TableCell className="font-medium">{tender.title}</TableCell>
                <TableCell className="max-w-sm truncate text-muted-foreground">
                  {tender.description}
                </TableCell>
                <TableCell>{tender.deadline}</TableCell>
                <TableCell>{tender.postedOn}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => setSelectedTender(tender)}
                      >
                        Submit Bid
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Submit Bid</DialogTitle>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Pitch Deck (PDF)</Label>
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                              setPitchFile(e.target.files?.[0] ?? null)
                            }
                          />
                        </div>
                        <div>
                          <Label>Bid Price (INR)</Label>
                          <Input
                            type="number"
                            placeholder="Enter your bid amount"
                            value={bidPrice}
                            onChange={(e) => setBidPrice(e.target.value)}
                          />
                        </div>
                        <Button
                          onClick={handleBidSubmit}
                          disabled={!bidPrice || !pitchFile}
                        >
                          <UploadCloud className="w-4 h-4 mr-2" />
                          Submit Bid
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
