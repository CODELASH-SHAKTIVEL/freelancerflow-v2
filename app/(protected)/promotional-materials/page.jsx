"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  FileText,
  Upload,
  Eye,
  Share2,
  Trash,
} from "lucide-react";
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
import {
  createPromotionalMaterial,
  getAllPromotionalMaterials,
  deletePromotionalMaterial,
} from "@/actions/promotional";

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
      
      const payload = {
        name: newMaterial.name || data.original_filename,
        tag: newMaterial.tag || "General",
        type:
          data.resource_type === "image"
            ? "Image"
            : data.resource_type === "video"
            ? "Video"
            : "File",
        previewUrl: data.secure_url,
        date: new Date().toISOString().split("T")[0],
      };

      const res = await createPromotionalMaterial(payload);
      setMaterials((prev) => [...prev, res.data]);
      
      // ✅ Re-fetch after saving
    const updatedMaterials = await getAllPromotionalMaterials();
    setMaterials(updatedMaterials);
    
      setNewMaterial({
        name: "",
        tag: "",
        file: null,
        previewUrl: "",
        type: "",
      });

      alert("Material uploaded successfully!");
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed. Try again.");
    }
  };
  
  useEffect(() => {
    (async () => {
      try {
        const serverMaterials = await getAllPromotionalMaterials();
        if (!serverMaterials || serverMaterials.length === 0) return;
        setMaterials(serverMaterials);
      } catch (error) {
        console.error("Failed to load promotional materials:", error);
      }
    })();
  }, []);

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
      {/* Header */}
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

      {/* Materials List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(materials) &&
          materials.map((material, index) => {
            if (!material || !material.name) return null;
            return (
              <Card
                key={material.id || index}
                className="group hover:shadow-md transition"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    {material.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <Badge variant="outline">{material.tag || "General"}</Badge>
                  <p className="text-xs">
                    Added on: {material.date || "Unknown"}
                  </p>
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
                            .catch((err) =>
                              console.error("Share error", err)
                            );
                        } else {
                          navigator.clipboard.writeText(material.previewUrl);
                          alert("Preview link copied!");
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={async () => {
                        const confirmed = confirm(
                          "Are you sure you want to delete this?"
                        );
                        if (!confirmed) return;
                        try {
                          await deletePromotionalMaterial(material.id);
                          setMaterials((prev) =>
                            prev.filter((m) => m.id !== material.id)
                          );
                          alert("Deleted successfully!");
                        } catch (e) {
                          console.error("Delete error:", e);
                          alert("Failed to delete.");
                        }
                      }}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* Preview Dialog */}
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
              <video src={previewUrl} controls className="w-full rounded" />
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
