"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload, Eye, Share2 } from "lucide-react";

import {getFilesByFolder, uploadFileToFolder } from "@/actions/files";
import { uploadToCloudinary } from "@/lib/cloudinary";

import FileCard from "../_components/FileCard";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function FolderDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const [uploadData, setUploadData] = useState({
    file: null,
    previewUrl: "",
    name: "",
    type: "",
    size: "",
  });

  useEffect(() => {
    (async () => {
      const data = await getFilesByFolder(id);
      console.log("Fetched folder data in id format:", data);
      if (!data) return router.push("/files");
      setFolder(data);
      setFiles(data.files);
    })();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const inferredType = file.type.startsWith("image/")
      ? "Image"
      : file.type.startsWith("video/")
      ? "Video"
      : file.type === "application/pdf"
      ? "PDF"
      : "File";

    setUploadData({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      type: inferredType,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    });
  };

  const handleUpload = async () => {
    if (!uploadData.file || !folder) return;

    try {
      const uploaded = await uploadToCloudinary(uploadData.file);

      const newFilePayload = {
        name: uploadData.name || uploaded.original_filename,
        url: uploaded.secure_url,
        type:
          uploaded.resource_type === "image"
            ? "Image"
            : uploaded.resource_type === "video"
            ? "Video"
            : uploaded.format || "File",
        size: `${(uploaded.bytes / 1024).toFixed(1)} KB`,
        folderId: folder.id,
      };

      const newFile = await uploadFileToFolder(newFilePayload);
      setFiles((prev) => [newFile, ...prev]);

      setUploadData({
        file: null,
        previewUrl: "",
        name: "",
        type: "",
        size: "",
      });
      setUploadDialogOpen(false);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Folder: {folder?.name}</h2>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" /> Upload File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Upload a File</DialogTitle>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="file">Choose File</Label>
                <Input id="file" type="file" onChange={handleFileChange} />
              </div>
              {uploadData.previewUrl && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  {uploadData.type === "Image" ? (
                    <img
                      src={uploadData.previewUrl}
                      alt="Preview"
                      className="w-full max-h-60 object-contain rounded border"
                    />
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      {uploadData.name}
                    </p>
                  )}
                </div>
              )}
              <Button onClick={handleUpload} disabled={!uploadData.file}>
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
