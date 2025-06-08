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


export default function PromotionalMaterialsPage() {
  const [materials, setMaterials] = useState([
    { name: "Portfolio.pdf", type: "PDF", tag: "Portfolio", date: "2024-06-01" },
    { name: "CaseStudy_Acme.pdf", type: "PDF", tag: "Case Study", date: "2024-05-28" },
    { name: "WebsiteDesign.png", type: "Image", tag: "Design", date: "2024-05-20" },
    { name: "IntroVideo.mp4", type: "Video", tag: "Intro", date: "2024-05-19" },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    name: "",
    type: "PDF",
    tag: "",
  });

  const addMaterial = () => {
    if (!newMaterial.name) return;
    setMaterials((prev) => [
      ...prev,
      { ...newMaterial, type: newMaterial.type , date: new Date().toISOString().split("T")[0] },
    ]);
    setNewMaterial({ name: "", type: "PDF", tag: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Promotional Materials</h2>
        <div className="flex gap-2">
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
                  <Label htmlFor="name">File Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. ProjectDeck.pdf"
                    value={newMaterial.name}
                    onChange={(e) =>
                      setNewMaterial((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
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

          <Button size="sm" variant="default">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
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
                <Button size="icon" variant="ghost">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
