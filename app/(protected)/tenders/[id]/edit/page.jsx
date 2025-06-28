"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatISO } from "date-fns";
import {
  FileEdit,
  CalendarDays,
  FileText,
  Settings2,
  BadgeCheck,
  Loader2,
  Upload,
} from "lucide-react";

import { getTenderById, updateTender } from "@/actions/tender";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EditTenderPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTender() {
      const data = await getTenderById(id);
      if (data) {
        setForm({
          title: data.title,
          description: data.description,
          rfqDate: formatISO(new Date(data.rfqDate)),
          deadline: formatISO(new Date(data.deadline)),
          typeOfWork: data.typeOfWork,
          skillsRequired: data.skillsRequired,
          jobDetails: data.jobDetails,
          documentsUrl: data.documentsUrl || "",
        });
      }
    }
    fetchTender();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTender(id, {
        ...form,
        rfqDate: new Date(form.rfqDate),
        deadline: new Date(form.deadline),
      });
      router.push("/tenders");
    } catch (error) {
      console.error("Failed to update tender", error);
    } finally {
      setLoading(false);
    }
  };

  if (!form) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <section className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-2">
        <FileEdit className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Edit Tender</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-lg text-muted-foreground">Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
            </div>
          </CardContent>
        </Card>

        {/* Timeline Details */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-lg text-muted-foreground">Timeline</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="rfqDate">RFQ Date</Label>
              <Input
                type="date"
                id="rfqDate"
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
            <div className="space-y-1.5">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                type="date"
                id="deadline"
                name="deadline"
                value={form.deadline.split("T")[0]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    deadline: formatISO(new Date(e.target.value)),
                  }))
                }
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Requirements */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-lg text-muted-foreground">Job Requirements</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="typeOfWork">Type of Work</Label>
              <Input id="typeOfWork" name="typeOfWork" value={form.typeOfWork} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="skillsRequired">Skills Required</Label>
              <Input id="skillsRequired" name="skillsRequired" value={form.skillsRequired} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="jobDetails">Job Details</Label>
              <Textarea id="jobDetails" name="jobDetails" value={form.jobDetails} onChange={handleChange} required />
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Upload className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-lg text-muted-foreground">Attachments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="documentsUrl">Document URL</Label>
              <Input id="documentsUrl" name="documentsUrl" value={form.documentsUrl} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="w-48">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Update Tender
              </span>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
