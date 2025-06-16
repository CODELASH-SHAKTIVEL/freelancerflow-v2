"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  FileText,
  Trash2,
  Pencil,
  Eye,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { deleteFile, renameFile } from "@/actions/files";
import { toast } from "sonner";

export default function FileCard({ file }) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(file.name);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    setLoading(true);
    try {
      await deleteFile(file.id);
      toast.success("File deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (newName.trim() === "") return;
    setLoading(true);
    try {
      await renameFile(file.id, newName.trim());
      toast.success("Renamed successfully");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Rename failed");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: file.name,
          url: file.url,
        })
        .catch((err) => {
          console.error("Share error", err);
        });
    } else {
      navigator.clipboard.writeText(file.url);
      toast.success("Preview link copied!");
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition cursor-pointer">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2 w-full">
            <FileText className="text-blue-500 w-5 h-5" />
            {editing ? (
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
                className="text-sm py-1 h-8"
              />
            ) : (
              <span className="font-medium truncate">{file.name}</span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {file.type} • {file.size}
          </p>

          <div className="flex gap-2 mt-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowPreview(true)}
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleShare}
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEditing(true)}
              title="Rename"
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              disabled={loading}
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="text-lg font-semibold">Preview</DialogTitle>
          <div className="mt-4">
            {file.url.endsWith(".pdf") ? (
              <iframe
                src={file.url}
                className="w-full h-[500px] rounded border"
                title="PDF Preview"
              />
            ) : file.type.includes("video") ? (
              <video src={file.url} controls className="w-full rounded" />
            ) : (
              <img
                src={file.url}
                alt="Preview"
                className="w-full rounded object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
