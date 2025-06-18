"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTenderById, updateTender } from "@/actions/tender";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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
      router.push("/admin/bidding-tenders");
    } catch (error) {
      console.error("Failed to update tender", error);
    } finally {
      setLoading(false);
    }
  };

  if (!form) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Edit Tender</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div>
          <Label>RFQ Date</Label>
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
          <Label>Deadline</Label>
          <Input
            type="date"
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
        <div>
          <Label>Type of Work</Label>
          <Input name="typeOfWork" value={form.typeOfWork} onChange={handleChange} required />
        </div>
        <div>
          <Label>Skills Required</Label>
          <Input name="skillsRequired" value={form.skillsRequired} onChange={handleChange} required />
        </div>
        <div>
          <Label>Job Details</Label>
          <Textarea name="jobDetails" value={form.jobDetails} onChange={handleChange} required />
        </div>
        <div>
          <Label>Documents (URL)</Label>
          <Input name="documentsUrl" value={form.documentsUrl} onChange={handleChange} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Tender"}
        </Button>
      </form>
    </div>
  );
}
