"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createLead } from "@/actions/leads";
import { Loader2, User, Building2, Phone, Mail, MapPin, Briefcase, Info, Calendar, ClipboardCheck, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

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
      className="w-full px-4 md:px-6 py-8 space-y-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-md rounded-xl"
    >
      {/* Contact Person Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <User className="h-5 w-5" />
          Contact Person Details
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input placeholder="Person Name" {...register("personName")} />
          <Input placeholder="Mobile No" {...register("mobileNo")} />
          <Input placeholder="Email" {...register("emailId")} />
          <Input placeholder="Address" {...register("address")} />
          <Input placeholder="Pin Code" {...register("pinCode")} />
          <Input placeholder="State" {...register("state")} />
          <Input placeholder="Country" {...register("country")} />
          <Input placeholder="Designation" {...register("designation")} />
          <Input placeholder="Department" {...register("department")} />
          <Input placeholder="Client Type" {...register("clientType")} />
        </div>
      </div>

      {/* Company Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <Building2 className="h-5 w-5" />
          Company Details
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <label className="flex items-center space-x-2 text-sm text-zinc-800 dark:text-zinc-200 mt-2 col-span-full">
            <input type="checkbox" {...register("previouslyWorked")} className="accent-primary" />
            <span>Previously worked with us</span>
          </label>
        </div>
      </div>

      {/* Lead Details Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <ClipboardCheck className="h-5 w-5" />
          Lead Details
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select onValueChange={(v) => setValue("capacity", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Capacity" />
            </SelectTrigger>
            <SelectContent>
              {CAPACITIES.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setValue("leadSource", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Lead Source" />
            </SelectTrigger>
            <SelectContent>
              {LEAD_SOURCES.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setValue("referenceForLead", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Reference for Lead" />
            </SelectTrigger>
            <SelectContent>
              {REFERENCE_FOR_LEADS.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setValue("typeOfLead", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Type of Lead" />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OF_LEADS.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setValue("leadDetails", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Lead Details" />
            </SelectTrigger>
            <SelectContent>
              {LEAD_DETAILS.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setValue("enquiryType", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Enquiry Type" />
            </SelectTrigger>
            <SelectContent>
              {ENQUIRY_TYPES.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setValue("action", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              {ACTIONS.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setValue("status", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="date" {...register("leadDate")} />
          <Input type="date" {...register("quoteDate")} />
          <Input placeholder="Job Main Category" {...register("jobMainCategory")} />
          <Input placeholder="Job Sub Category" {...register("jobSubCategory")} />
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <Info className="h-5 w-5" />
          Notes
        </h2>
        <Textarea
          placeholder="Lead Message / Notes"
          {...register("leadMessage")}
          className="min-h-[96px]"
        />
      </div>

      {/* Submit Section */}
      <div className="flex flex-col md:flex-row gap-4 pt-6">
        <Button type="button" variant="outline" onClick={() => reset()} className="w-full md:w-1/2">
          Reset
        </Button>
        <Button type="submit" className="w-full md:w-1/2" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Lead"}
        </Button>
      </div>
    </form>
  );
}
 
