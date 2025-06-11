"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateLead } from "@/actions/leads";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export function EditLeadForm({ lead }) {
  const router = useRouter();
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: { ...lead },
  });

  const [saving, setSaving] = useState(false);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateLead(lead.id, {
        ...data,
        leadDate: data.leadDate ? new Date(data.leadDate).toISOString() : null,
        quoteDate: data.quoteDate ? new Date(data.quoteDate).toISOString() : null,
      });
      toast.success("Lead updated");
      router.push(`/leads`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Person Name" {...register("personName")} />
        <Input placeholder="Mobile Number" {...register("mobileNo")} />
        <Input placeholder="Email ID" {...register("emailId")} />
        <Input placeholder="Capacity" {...register("capacity")} />
        <Input placeholder="Address" {...register("address")} />
        <Input placeholder="Pin Code" {...register("pinCode")} />
        <Input placeholder="State" {...register("state")} />
        <Input placeholder="Country" {...register("country")} />
        <Input placeholder="Designation" {...register("designation")} />
        <Input placeholder="Department" {...register("department")} />
        <Input placeholder="Client Type" {...register("clientType")} />
      </div>

      <h2 className="font-semibold text-lg pt-4">Company Details</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Company Name" {...register("companyName")} />
        <Input placeholder="Company Contact" {...register("companyContact")} />
        <Input placeholder="Company Email" {...register("companyEmail")} />
        <Input placeholder="Company Website" {...register("companyWebsite")} />
        <Input placeholder="Company Address" {...register("companyAddress")} />
        <Input placeholder="Company Pin Code" {...register("companyPinCode")} />
        <Input placeholder="Company State" {...register("companyState")} />
        <Input placeholder="Company Country" {...register("companyCountry")} />
        <Input placeholder="Company Type" {...register("companyType")} />
        <Input placeholder="Company Profession" {...register("companyProfession")} />
        <Select
          onValueChange={(v) => setValue("previouslyWorked", v === "true")}
          defaultValue={lead.previouslyWorked ? "true" : "false"}
        >
          <SelectTrigger><SelectValue placeholder="Previously Worked" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h2 className="font-semibold text-lg pt-4">Project & Lead Info</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Project Type" {...register("projectType")} />
        <Input type="date" {...register("leadDate")} />
        <Input type="date" {...register("quoteDate")} />
        <Input placeholder="Job Main Category" {...register("jobMainCategory")} />
        <Input placeholder="Job Sub Category" {...register("jobSubCategory")} />
        <Input placeholder="Lead Type" {...register("leadType")} />
        <Input placeholder="Enquiry Type" {...register("enquiryType")} />
        <Input placeholder="Action" {...register("action")} />
        <Input placeholder="Status" {...register("status")} />
      </div>

      <Textarea
        placeholder="Lead Message / Notes"
        {...register("leadMessage")}
        className="min-h-[100px]"
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-1/2"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" className="w-1/2" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
