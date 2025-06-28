'use client';

import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateCrmStatus } from "@/actions/crm";

export default function CrmStatus({ leadId, status }) {
  const [value, setValue] = useState(status?.value || "");
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    if (!value.trim()) return;

    startTransition(async () => {
      try {
        await updateCrmStatus(leadId, value.trim());
        toast.success("Status updated");
      } catch {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CRM Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="e.g., To Contact, In Progress, Closed"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={handleUpdate} disabled={isPending}>
          {isPending ? "Updating..." : "Update Status"}
        </Button>
      </CardContent>
    </Card>
  );
}
