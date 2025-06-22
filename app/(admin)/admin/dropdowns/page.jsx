"use client";

import React, { useEffect, useState } from "react";
import {
  getAllProfessions,
  createProfession,
  updateProfession,
  deleteProfession,
  getAllTools,
  createTool,
  updateTool,
  deleteTool,
} from "@/actions/profile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Pencil, PlusCircle, Save } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function DropdownsPage() {
  const [professions, setProfessions] = useState([]);
  const [tools, setTools] = useState([]);
  const [newProfession, setNewProfession] = useState("");
  const [newTool, setNewTool] = useState("");
  const [editingProfessionId, setEditingProfessionId] = useState(null);
  const [editingToolId, setEditingToolId] = useState(null);
  const [professionPage, setProfessionPage] = useState(1);
  const [toolPage, setToolPage] = useState(1);

  const fetchData = async () => {
    const prof = await getAllProfessions();
    const tool = await getAllTools();
    setProfessions(prof);
    setTools(tool);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (type) => {
    try {
      if (type === "profession" && newProfession) {
        await createProfession({ name: newProfession });
        toast.success("Profession added");
        setNewProfession("");
      }
      if (type === "tool" && newTool) {
        await createTool({ name: newTool });
        toast.success("Tool added");
        setNewTool("");
      }
      fetchData();
    } catch (e) {
      toast.error("Failed to add");
    }
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === "profession") await deleteProfession(id);
      if (type === "tool") await deleteTool(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = async (type, id, name) => {
    try {
      if (type === "profession") await updateProfession(id, { name });
      if (type === "tool") await updateTool(id, { name });
      toast.success("Updated successfully");
      setEditingProfessionId(null);
      setEditingToolId(null);
      fetchData();
    } catch {
      toast.error("Failed to update");
    }
  };

  const paginatedProfessions = professions.slice(
    (professionPage - 1) * ITEMS_PER_PAGE,
    professionPage * ITEMS_PER_PAGE
  );
  const paginatedTools = tools.slice(
    (toolPage - 1) * ITEMS_PER_PAGE,
    toolPage * ITEMS_PER_PAGE
  );

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profiles Dropdowns Controller</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Professions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Professions
              <div className="flex gap-2">
                <Input
                  placeholder="New Profession"
                  value={newProfession}
                  onChange={(e) => setNewProfession(e.target.value)}
                />
                <Button onClick={() => handleCreate("profession")}>Add</Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {paginatedProfessions.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border p-2 rounded-md"
                >
                  {editingProfessionId === item.id ? (
                    <input
                      value={item.name}
                      onChange={(e) => {
                        const updated = professions.map((p) =>
                          p.id === item.id ? { ...p, name: e.target.value } : p
                        );
                        setProfessions(updated);
                      }}
                      className="w-full mr-2"
                    />
                  ) : (
                    <span>{item.name}</span>
                  )}

                  <div className="flex gap-2">
                    {editingProfessionId === item.id ? (
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleEdit("profession", item.id, item.name)}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setEditingProfessionId(item.id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete("profession", item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                disabled={professionPage === 1}
                onClick={() => setProfessionPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="ghost"
                disabled={professionPage * ITEMS_PER_PAGE >= professions.length}
                onClick={() => setProfessionPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Tools
              <div className="flex gap-2">
                <Input
                  placeholder="New Tool"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                />
                <Button onClick={() => handleCreate("tool")}>Add</Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {paginatedTools.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border p-2 rounded-md"
                >
                  {editingToolId === item.id ? (
                    <input
                      value={item.name}
                      onChange={(e) => {
                        const updated = tools.map((t) =>
                          t.id === item.id ? { ...t, name: e.target.value } : t
                        );
                        setTools(updated);
                      }}
                      className="w-full mr-2"
                    />
                  ) : (
                    <span>{item.name}</span>
                  )}

                  <div className="flex gap-2">
                    {editingToolId === item.id ? (
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleEdit("tool", item.id, item.name)}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setEditingToolId(item.id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete("tool", item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                disabled={toolPage === 1}
                onClick={() => setToolPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="ghost"
                disabled={toolPage * ITEMS_PER_PAGE >= tools.length}
                onClick={() => setToolPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
