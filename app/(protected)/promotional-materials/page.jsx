"use client";

import { useState } from "react";
import { Plus, FileText, Upload, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DialogDescription } from "@radix-ui/react-dialog";
import { uploadToCloudinary } from "@/lib/cloudinary";


export default function PromotionalMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [newMaterial, setNewMaterial] = useState({
    name: "",
    tag: "",
    file: null,
    previewUrl: "",
    type: "",
  });

 const addMaterial = async () => {
  if (!newMaterial.file) return;

  try {
    const data = await uploadToCloudinary(newMaterial.file);

    setMaterials((prev) => [
      ...prev,
      {
        name: newMaterial.name || data.original_filename,
        tag: newMaterial.tag,
        type: data.resource_type === "image" ? "Image" : data.resource_type === "video" ? "Video" : "File",
        previewUrl: data.secure_url,
        date: new Date().toISOString().split("T")[0],
      },
    ]);

    setNewMaterial({
      name: "",
      tag: "",
      file: null,
      previewUrl: "",
      type: "",
    });

    console.log("Upload successful:", data);
    alert("Material uploaded successfully!");
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Upload failed. Try again.");
  }
};

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const inferredType = file.type.startsWith("image/")
        ? "Image"
        : file.type.startsWith("video/")
        ? "Video"
        : file.type === "application/pdf"
        ? "PDF"
        : "File";

      setNewMaterial((prev) => ({
        ...prev,
        name: file.name,
        file,
        previewUrl: url,
        type: inferredType,
      }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Promotional Materials</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Material</DialogTitle>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="file">File Upload</Label>
                <Input id="file" type="file" onChange={handleFileChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tag">Category Tag</Label>
                <Input
                  id="tag"
                  placeholder="e.g. Pitch, Portfolio, Testimonial"
                  value={newMaterial.tag}
                  onChange={(e) =>
                    setNewMaterial((prev) => ({
                      ...prev,
                      tag: e.target.value,
                    }))
                  }
                />
              </div>

              <Button onClick={addMaterial}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {materials.map((material, index) => (
          <Card key={index} className="group hover:shadow-md transition">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-muted-foreground" />
                {material.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <Badge variant="outline">{material.tag}</Badge>
              <p className="text-xs">Added on: {material.date}</p>
              <div className="flex gap-2 mt-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setPreviewUrl(material.previewUrl);
                    setShowPreview(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: material.name,
                          url: material.previewUrl,
                        })
                        .catch((err) => console.error("Share error", err));
                    } else {
                      navigator.clipboard.writeText(material.previewUrl);
                      alert("Preview link copied!");
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogContent className="max-w-3xl">
    <DialogTitle className="text-lg font-semibold">Preview</DialogTitle>
    <div className="mt-4">
      {previewUrl.endsWith(".pdf") ? (
        <iframe
          src={previewUrl}
          className="w-full h-[500px] rounded border"
          title="PDF Preview"
        />
      ) : previewUrl.includes("video") ? (
        <video
          src={previewUrl}
          controls
          className="w-full rounded"
        />
      ) : (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full rounded object-contain"
        />
      )}
    </div>
  </DialogContent>
</Dialog>
    </div>
  );
}
