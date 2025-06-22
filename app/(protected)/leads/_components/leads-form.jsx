"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createLead } from "@/actions/leads";
import { Loader2 } from "lucide-react";

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

// ENUMS from schema
const CAPACITIES = ["PERSONAL", "OFFICIAL"];
const LEAD_SOURCES = ["FACEBOOK", "INSTAGRAM", "LINKEDIN", "GMB", "WEBSITE", "REPEAT", "REFERENCE"];
const REFERENCE_FOR_LEADS = ["CAMPAIGN", "BLOG", "POST", "OFFER", "SCHEMES", "DISCOUNTS", "EXHIBITIONS", "DISCOUNT_COUPON"];
const TYPE_OF_LEADS = ["JOB", "MARKETING", "VENDOR", "DIGITAL_MARKETING", "JOB_ENQUIRY", "BUSINESS_ENQUIRY", "CORE_SERVICES_RELEVANT", "CORE_SERVICES_IRRELEVANT"];
const LEAD_DETAILS = ["WARM", "HOT", "COLD"];
const ENQUIRY_TYPES = ["NEW", "REPEAT"];
const ACTIONS = ["QUOTE", "NOT_QUOTE", "FOLLOWUP"];
const STATUSES = ["NEW_LEAD", "FOLLOWUP", "CLOSED", "LAPSED", "SUSPENDED", "POSTPONED"];

const StyledInput = (props) => (
  <Input
    {...props}
    className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-gray-300 dark:border-zinc-700"
  />
);

const StyledSelect = ({ options, placeholder, onChange }) => (
  <Select onValueChange={onChange}>
    <SelectTrigger className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      {options.map((v) => (
        <SelectItem key={v} value={v}>
          {v}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export function LeadForm() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await createLead({
        ...data,
        address: data.address || "Not Provided",
        previouslyWorked: !!data.previouslyWorked,
        leadDate: data.leadDate ? new Date(data.leadDate) : null,
        quoteDate: data.quoteDate ? new Date(data.quoteDate) : null,
      });

      if (response?.success) {
        toast.success("Lead created successfully");
        reset();
      } else {
        toast.error("Failed to create lead");
      }
    } catch (error) {
      toast.error(error.message || "Error creating lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto p-6 space-y-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-md rounded-xl"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <StyledInput placeholder="Person Name" {...register("personName")} />
        <StyledInput placeholder="Mobile No" {...register("mobileNo")} />
        <StyledInput placeholder="Email" {...register("emailId")} />
        <StyledInput placeholder="Address" {...register("address")} />
        <StyledInput placeholder="Pin Code" {...register("pinCode")} />
        <StyledInput placeholder="State" {...register("state")} />
        <StyledInput placeholder="Country" {...register("country")} />
        <StyledInput placeholder="Designation" {...register("designation")} />
        <StyledInput placeholder="Department" {...register("department")} />
        <StyledSelect options={CAPACITIES} placeholder="Capacity" onChange={(v) => setValue("capacity", v)} />
        <StyledInput placeholder="Client Type" {...register("clientType")} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <StyledInput placeholder="Company Name" {...register("companyName")} />
        <StyledInput placeholder="Company Contact" {...register("companyContact")} />
        <StyledInput placeholder="Company Email" {...register("companyEmail")} />
        <StyledInput placeholder="Company Website" {...register("companyWebsite")} />
        <StyledInput placeholder="Company Address" {...register("companyAddress")} />
        <StyledInput placeholder="Company Pin Code" {...register("companyPinCode")} />
        <StyledInput placeholder="Company State" {...register("companyState")} />
        <StyledInput placeholder="Company Country" {...register("companyCountry")} />
        <StyledInput placeholder="Company Type" {...register("companyType")} />
        <StyledInput placeholder="Company Profession" {...register("companyProfession")} />
        <label className="flex items-center space-x-2 text-sm text-zinc-800 dark:text-zinc-200 mt-2">
          <input type="checkbox" {...register("previouslyWorked")} />
          <span>Previously worked with us</span>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <StyledSelect options={LEAD_SOURCES} placeholder="Lead Source" onChange={(v) => setValue("leadSource", v)} />
        <StyledSelect options={REFERENCE_FOR_LEADS} placeholder="Reference For Lead" onChange={(v) => setValue("referenceForLead", v)} />
        <StyledSelect options={TYPE_OF_LEADS} placeholder="Type of Lead" onChange={(v) => setValue("typeOfLead", v)} />
        <StyledSelect options={LEAD_DETAILS} placeholder="Lead Details" onChange={(v) => setValue("leadDetails", v)} />
        <StyledSelect options={ENQUIRY_TYPES} placeholder="Enquiry Type" onChange={(v) => setValue("enquiryType", v)} />
        <StyledSelect options={ACTIONS} placeholder="Action" onChange={(v) => setValue("action", v)} />
        <StyledSelect options={STATUSES} placeholder="Status" onChange={(v) => setValue("status", v)} />
        <StyledInput type="date" {...register("leadDate")} />
        <StyledInput type="date" {...register("quoteDate")} />
        <StyledInput placeholder="Job Main Category" {...register("jobMainCategory")} />
        <StyledInput placeholder="Job Sub Category" {...register("jobSubCategory")} />
      </div>

      <Textarea
        placeholder="Lead Message / Notes"
        {...register("leadMessage")}
        className="min-h-[96px] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-gray-300 dark:border-zinc-700"
      />

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={() => reset()} className="w-1/2">
          Reset
        </Button>
        <Button type="submit" className="w-1/2" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Lead"}
        </Button>
      </div>
    </form>
  );
}
