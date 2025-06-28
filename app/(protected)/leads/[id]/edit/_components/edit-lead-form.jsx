"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, User, Building2, FileEdit, Info, CheckCircle2 } from "lucide-react";
import { updateLead } from "@/actions/leads";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EditLeadForm({ lead }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...lead,
      leadDate: lead.leadDate ? new Date(lead.leadDate).toISOString().split("T")[0] : "",
      quoteDate: lead.quoteDate ? new Date(lead.quoteDate).toISOString().split("T")[0] : "",
    },
  });

  const [saving, setSaving] = useState(false);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateLead(lead.id, {
        ...data,
        previouslyWorked: data.previouslyWorked === "true" || data.previouslyWorked === true,
        leadDate: data.leadDate ? new Date(data.leadDate).toISOString() : null,
        quoteDate: data.quoteDate ? new Date(data.quoteDate).toISOString() : null,
      });
      toast.success("Lead updated");
      router.push("/leads");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 p-6 md:p-10 max-w-screen-xl mx-auto"
    >
      {/* Contact Person Section */}
      <Section title="Contact Person Info" icon={<User className="h-5 w-5" />}> 
        <InputGrid>
          <StyledInput label="Person Name" {...register("personName")} />
          <StyledInput label="Mobile No" {...register("mobileNo")} />
          <StyledInput label="Email ID" {...register("emailId")} />
          <StyledInput label="Capacity" {...register("capacity")} />
          <StyledInput label="Address" {...register("address")} />
          <StyledInput label="Pin Code" {...register("pinCode")} />
          <StyledInput label="State" {...register("state")} />
          <StyledInput label="Country" {...register("country")} />
          <StyledInput label="Designation" {...register("designation")} />
          <StyledInput label="Department" {...register("department")} />
          <StyledInput label="Client Type" {...register("clientType")} />
        </InputGrid>
      </Section>

      {/* Company Info Section */}
      <Section title="Company Info" icon={<Building2 className="h-5 w-5" />}> 
        <InputGrid>
          <StyledInput label="Company Name" {...register("companyName")} />
          <StyledInput label="Company Contact" {...register("companyContact")} />
          <StyledInput label="Company Email" {...register("companyEmail")} />
          <StyledInput label="Company Website" {...register("companyWebsite")} />
          <StyledInput label="Company Address" {...register("companyAddress")} />
          <StyledInput label="Company Pin Code" {...register("companyPinCode")} />
          <StyledInput label="Company State" {...register("companyState")} />
          <StyledInput label="Company Country" {...register("companyCountry")} />
          <StyledInput label="Company Type" {...register("companyType")} />
          <StyledInput label="Company Profession" {...register("companyProfession")} />
          <StyledInput label="Previously Worked" {...register("previouslyWorked")} />
        </InputGrid>
      </Section>

      {/* Lead Details Section */}
      <Section title="Lead Details" icon={<FileEdit className="h-5 w-5" />}> 
        <InputGrid>
          <StyledInput label="Lead Source" {...register("leadSource")} />
          <StyledInput label="Reference For Lead" {...register("referenceForLead")} />
          <StyledInput label="Type Of Lead" {...register("typeOfLead")} />
          <StyledInput label="Lead Details" {...register("leadDetails")} />
          <StyledInput label="Enquiry Type" {...register("enquiryType")} />
          <StyledInput label="Action" {...register("action")} />
          <StyledInput label="Status" {...register("status")} />
          <StyledInput type="date" label="Lead Date" {...register("leadDate")} />
          <StyledInput type="date" label="Quote Date" {...register("quoteDate")} />
        </InputGrid>
      </Section>

      {/* Project Info Section */}
      <Section title="Project Info" icon={<Info className="h-5 w-5" />}> 
        <InputGrid>
          <StyledInput label="Job Main Category" {...register("jobMainCategory")} />
          <StyledInput label="Job Sub Category" {...register("jobSubCategory")} />
        </InputGrid>
        <div className="pt-4">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200 block mb-1">
            Lead Message / Notes
          </label>
          <Textarea
            {...register("leadMessage")}
            className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 min-h-[100px]"
          />
        </div>
      </Section>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <Button type="button" variant="outline" className="w-1/2" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="w-1/2" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

/* ────────── Components ────────── */
function StyledInput({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200 block mb-1">{label}</label>
      <Input
        {...props}
        className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600"
      />
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm">
      <CardHeader className="pb-2 border-b border-border flex flex-row items-center gap-2">
        {icon}
        <CardTitle className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">{children}</CardContent>
    </Card>
  );
}

function InputGrid({ children }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}
