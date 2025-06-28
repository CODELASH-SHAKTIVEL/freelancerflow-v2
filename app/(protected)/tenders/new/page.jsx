"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatISO } from "date-fns";
import { createTender } from "@/actions/tender";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClipboardList, CalendarPlus, Info, FileText } from "lucide-react";

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
      router.push("/tenders");
    } catch (error) {
      console.error("Failed to create tender", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">📄 Create New Tender</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <ClipboardList className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <FormField label="Title" name="title" value={form.title} onChange={handleChange} />
            <FormField label="Type of Work" name="typeOfWork" value={form.typeOfWork} onChange={handleChange} />
          </CardContent>
        </Card>

        {/* Dates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <CalendarPlus className="w-5 h-5" />
              Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <FormField
              label="RFQ Date"
              name="rfqDate"
              type="date"
              value={form.rfqDate.split("T")[0]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, rfqDate: formatISO(new Date(e.target.value)) }))
              }
            />
            <FormField
              label="Deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        {/* Skills and Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Info className="w-5 h-5" />
              Project Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Skills Required"
              name="skillsRequired"
              value={form.skillsRequired}
              onChange={handleChange}
            />
            <FormField
              label="Job Details"
              name="jobDetails"
              isTextarea
              value={form.jobDetails}
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <FileText className="w-5 h-5" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              label="Documents (URL)"
              name="documentsUrl"
              value={form.documentsUrl}
              onChange={handleChange}
            />
            <FormField
              label="Description"
              name="description"
              isTextarea
              value={form.description}
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Tender"}
          </Button>
        </div>
      </form>
    </section>
  );
}

/* ---------------- Reusable Form Field ---------------- */
function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  isTextarea = false,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm text-foreground">
        {label}
      </Label>
      {isTextarea ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-background text-foreground"
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="bg-background text-foreground"
        />
      )}
    </div>
  );
}
