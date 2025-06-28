'use client';

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { addCrmFollowUp, markFollowUpDone } from "@/actions/crm";

export default function CrmFollowUps({ leadId, followUps }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    if (!title || !dueDate) return;

    startTransition(async () => {
      try {
        await addCrmFollowUp(leadId, title, dueDate);
        toast.success("Follow-up added");
        setTitle("");
        setDueDate("");
      } catch (err) {
        toast.error("Failed to add follow-up");
      }
    });
  };

  const handleMarkDone = (id) => {
    startTransition(async () => {
      try {
        await markFollowUpDone(id, leadId);
        toast.success("Marked as done");
      } catch (err) {
        toast.error("Failed to update");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CRM Follow-ups</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Follow-up title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button onClick={handleAdd} disabled={isPending}>
            {isPending ? "Adding..." : "Add Follow-up"}
          </Button>
        </div>

        <Separator />

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {followUps.length === 0 && (
            <p className="text-muted-foreground text-sm">No follow-ups yet.</p>
          )}
          {followUps.map((f) => (
            <div
              key={f.id}
              className="border rounded p-3 text-sm flex justify-between items-center bg-muted"
            >
              <div>
                <div className="font-medium">{f.title}</div>
                <div className="text-xs text-muted-foreground">
                  Due: {new Date(f.dueDate).toLocaleDateString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Status: {f.status}
                </div>
              </div>
              {f.status !== "done" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMarkDone(f.id)}
                >
                  Mark Done
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
