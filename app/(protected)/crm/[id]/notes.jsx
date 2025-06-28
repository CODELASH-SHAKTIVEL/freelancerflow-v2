'use client';

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { addCrmNote } from "@/actions/crm";

export default function CrmNotes({ leadId, notes }) {
  const [newNote, setNewNote] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    startTransition(async () => {
      try {
        await addCrmNote(leadId, newNote);
        toast.success("Note added");
        setNewNote("");
      } catch (err) {
        toast.error("Failed to add note");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CRM Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Add a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button onClick={handleAddNote} disabled={isPending}>
            {isPending ? "Adding..." : "Add Note"}
          </Button>
        </div>
        <Separator />
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {notes.length === 0 && <p className="text-muted-foreground text-sm">No notes yet.</p>}
          {notes.map((note) => (
            <div
              key={note.id}
              className="border rounded p-2 text-sm bg-muted text-muted-foreground"
            >
              <div>{note.content}</div>
              <div className="text-xs text-right mt-1">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
