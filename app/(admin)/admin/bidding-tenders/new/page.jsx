"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTender } from "@/actions/tender";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatISO } from "date-fns";
import {
  FileText,
  CalendarDays,
  ClipboardList,
  ClipboardSignature,
  FileUp,
  Code2,
  UserCog,
} from "lucide-react";

export default function NewTenderPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    rfqDate: formatISO(new Date()),
    deadline: "",
    typeOfWork: "",
    skillsRequired: "",
    jobDetails: "",
    documentsUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTender({
        ...form,
        rfqDate: new Date(form.rfqDate),
        deadline: new Date(form.deadline),
      });
      router.push("/admin/bidding-tenders");
    } catch (error) {
      console.error("Failed to create tender", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        <ClipboardList className="inline-block mr-2" size={28} />
        Create New Tender
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardSignature size={20} /> Basic Info
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block">Title</Label>
              <Input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1 block">Type of Work</Label>
              <Input name="typeOfWork" value={form.typeOfWork} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-1 block">Description</Label>
              <Textarea name="description" value={form.description} onChange={handleChange} required />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays size={20} /> Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block">RFQ Date</Label>
              <Input
                type="date"
                name="rfqDate"
                value={form.rfqDate.split("T")[0]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    rfqDate: formatISO(new Date(e.target.value)),
                  }))
                }
              />
            </div>
            <div>
              <Label className="mb-1 block">Deadline</Label>
              <Input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog size={20} /> Skills & Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block">Skills Required</Label>
              <Input
                name="skillsRequired"
                value={form.skillsRequired}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-1 block">Job Details</Label>
              <Textarea
                name="jobDetails"
                value={form.jobDetails}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp size={20} /> Attachments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label className="mb-1 block">Documents URL</Label>
            <Input
              name="documentsUrl"
              value={form.documentsUrl}
              onChange={handleChange}
              placeholder="https://example.com/docs"
            />
          </CardContent>
        </Card>

        <div className="pt-4">
          <Button type="submit" disabled={loading} className="w-full text-base">
            {loading ? "Creating..." : "Create Tender"}
          </Button>
        </div>
      </form>
    </div>
  );
}
