"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTender } from "@/actions/tender";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatISO } from "date-fns";

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
      router.push("/admin/bidding-tenders"); // go back to tender list
    } catch (error) {
      console.error("Failed to create tender", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Create New Tender</h2>
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
          <Input type="date" name="rfqDate" value={form.rfqDate.split("T")[0]} onChange={(e) =>
            setForm((prev) => ({ ...prev, rfqDate: formatISO(new Date(e.target.value)) }))
          } />
        </div>
        <div>
          <Label>Deadline</Label>
          <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} required />
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
          {loading ? "Creating..." : "Create Tender"}
        </Button>
      </form>
    </div>
  );
}
