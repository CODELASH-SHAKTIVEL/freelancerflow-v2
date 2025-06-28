'use client';

import { useState, useTransition } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import { addCrmTag, deleteCrmTag } from "@/actions/crm";

export default function CrmTags({ leadId, tags }) {
  const [tagInput, setTagInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAddTag = () => {
    if (!tagInput.trim()) return;

    startTransition(async () => {
      try {
        await addCrmTag(leadId, tagInput.trim());
        toast.success("Tag added");
        setTagInput("");
      } catch {
        toast.error("Failed to add tag");
      }
    });
  };

  const handleDeleteTag = (id) => {
    startTransition(async () => {
      try {
        await deleteCrmTag(id, leadId);
        toast.success("Tag removed");
      } catch {
        toast.error("Failed to remove tag");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CRM Tags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter tag name"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <Button onClick={handleAddTag} disabled={isPending}>
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.length === 0 && (
            <p className="text-sm text-muted-foreground">No tags yet.</p>
          )}
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {tag.name}
              <button
                className="ml-1 text-xs"
                onClick={() => handleDeleteTag(tag.id)}
                aria-label="Remove tag"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
