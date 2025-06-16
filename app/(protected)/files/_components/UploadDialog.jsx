"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function UploadDialog({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const response = await uploadToCloudinary(file);
      onUpload?.(response); // send Cloudinary response back
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="default">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload a File</DialogTitle>
        <div className="space-y-4 mt-4">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={handleUpload} disabled={uploading || !file}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
