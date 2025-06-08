"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Folder, FileText, Plus, Upload } from "lucide-react";



export default function FilesPage() {
  const [folders, setFolders] = useState([
    { name: "Lead Generation" },
    { name: "Quotations" },
    { name: "Bills" },
    { name: "Project Docs" },
  ]);

  const [files, setFiles] = useState([
    { name: "ClientList.xlsx", type: "Excel", size: "120 KB" },
    { name: "Invoice_June.pdf", type: "PDF", size: "98 KB" },
    { name: "Proposal_SiteRevamp.pdf", type: "PDF", size: "150 KB" },
  ]);

  const [newFolderName, setNewFolderName] = useState("");

  const addFolder = () => {
    if (!newFolderName) return;
    setFolders((prev) => [...prev, { name: newFolderName }]);
    setNewFolderName("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Files & Folders</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create New Folder</DialogTitle>
              <div className="space-y-4 mt-4">
                <Label htmlFor="folder-name">Folder Name</Label>
                <Input
                  id="folder-name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g. Contracts"
                />
                <Button onClick={addFolder}>Create</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button size="sm" variant="default">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Folder Section */}
      <div>
        <h3 className="text-lg font-medium mb-3">Folders</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {folders.map((folder, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4 flex items-center space-x-3">
                <Folder className="text-yellow-500 w-6 h-6" />
                <span className="truncate">{folder.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Files Section */}
      <div>
        <h3 className="text-lg font-medium mb-3">Recent Files</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, i) => (
            <Card key={i} className="hover:shadow-md transition cursor-pointer">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-500 w-5 h-5" />
                  <span className="font-medium truncate">{file.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{file.type} • {file.size}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
