// app/(protected)/leads/_components/quick-lead-form.jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { createLead } from "@/actions/leads";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* --------------------------------------------------------------------
   Quick Lead Form – now includes Quote, Progress & Completion fields
---------------------------------------------------------------------*/

const JOURNEY_STAGES   = ["LEAD", "QUOTE", "PROGRESS", "COMPLETION"];
const CAPACITIES       = ["PERSONAL", "OFFICIAL"];

const LEAD_TYPES       = ["warm", "hot", "cold"];
const ENQUIRY_TYPES    = ["Direct", "Reference", "Sub Contract", "Freelancing"];
const ACTIONS          = ["quote", "not quote", "followup"];

export function QuickLeadForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      /* original */
      journeyStage : "LEAD",
      personName   : "",
      mobileNo     : "",
      emailId      : "",
      capacity     : "PERSONAL",
      address      : "",
      pinCode      : "",
      state        : "",
      country      : "",
      designation  : "",
      department   : "",
      clientType   : "",

      /* Quote Stage */
      companyName        : "",
      companyContact     : "",
      companyEmail       : "",
      companyWebsite     : "",
      companyAddress     : "",
      companyPinCode     : "",
      companyState       : "",
      companyCountry     : "",
      companyType        : "",
      previouslyWorked   : false,
      companyProfession  : "",

      /* Progress Stage */
      leadType    : "",
      enquiryType : "",
      projectType : "",
      leadDate    : "",
      quoteDate   : "",
      action      : "",

      /* Completion Stage */
      jobMainCategory : "",
      jobSubCategory  : "",
      leadMessage     : "",

      /* Status */
      status : "",
    },
  });

  const [loading, setLoading] = useState(false);

  // Save directly to DB via server action
  const onSubmit = async (data) => {
    setLoading(true);
    try {
     const res = await createLead({
      ...data,
      leadDate: data.leadDate ? new Date(data.leadDate).toISOString() : null,
      quoteDate: data.quoteDate ? new Date(data.quoteDate).toISOString() : null,
    });
      if (res.success) {
        toast.success("Lead created");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto space-y-8 p-6 rounded-xl bg-background shadow-sm border border-border"
    >
      {/* ────────────────── Journey Stage ────────────────── */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Journey Stage</label>
        <Select
          onValueChange={(v) => setValue("journeyStage", v)}
          defaultValue={getValues("journeyStage")}
        >
          <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
          <SelectContent>
            {JOURNEY_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* ────────────────── Person Info ────────────────── */}
      <div className="grid gap-4 md:grid-cols-3">
        <Input placeholder="Name"      {...register("personName")} />
        <Input placeholder="Mobile No" {...register("mobileNo")}  />
        <Input placeholder="Email"     {...register("emailId")}   />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Select
            onValueChange={(v) => setValue("capacity", v)}
            defaultValue={getValues("capacity")}
          >
            <SelectTrigger><SelectValue placeholder="Capacity" /></SelectTrigger>
            <SelectContent>
              {CAPACITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Input placeholder="Client Type" {...register("clientType")} />
      </div>

      <Input placeholder="Address" {...register("address")} />

      <div className="grid gap-4 md:grid-cols-3">
        <Input placeholder="Pin Code" {...register("pinCode")} />
        <Input placeholder="State"    {...register("state")}   />
        <Input placeholder="Country"  {...register("country")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Designation" {...register("designation")} />
        <Input placeholder="Department"  {...register("department")}  />
      </div>

      {/* ╔═══════════════ Quote Stage ═══════════════╗ */}
      <h3 className="font-semibold text-lg pt-2">Quote Stage</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Company Name"    {...register("companyName")}   />
        <Input placeholder="Company Contact" {...register("companyContact")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Company Email"    {...register("companyEmail")}   />
        <Input placeholder="Company Website"  {...register("companyWebsite")} />
      </div>

      <Input placeholder="Company Address" {...register("companyAddress")} />

      <div className="grid gap-4 md:grid-cols-3">
        <Input placeholder="Company Pin Code" {...register("companyPinCode")} />
        <Input placeholder="Company State"    {...register("companyState")}   />
        <Input placeholder="Company Country"  {...register("companyCountry")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Company Type"       {...register("companyType")} />
        <Input placeholder="Company Profession" {...register("companyProfession")} />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("previouslyWorked")} />
        Previously worked with us
      </label>

      {/* ╔═══════════════ Progress Stage ═══════════════╗ */}
      <h3 className="font-semibold text-lg pt-4">Progress Stage</h3>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Select
            onValueChange={(v) => setValue("leadType", v)}
            defaultValue=""
          >
            <SelectTrigger><SelectValue placeholder="Lead Type" /></SelectTrigger>
            <SelectContent>
              {LEAD_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            onValueChange={(v) => setValue("enquiryType", v)}
            defaultValue=""
          >
            <SelectTrigger><SelectValue placeholder="Enquiry Type" /></SelectTrigger>
            <SelectContent>
              {ENQUIRY_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Input placeholder="Project Type" {...register("projectType")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input type="date" placeholder="Lead Date"  {...register("leadDate")}  />
        <Input type="date" placeholder="Quote Date" {...register("quoteDate")} />
      </div>

      <div>
        <Select
          onValueChange={(v) => setValue("action", v)}
          defaultValue=""
        >
          <SelectTrigger><SelectValue placeholder="Action" /></SelectTrigger>
          <SelectContent>
            {ACTIONS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* ╔═══════════════ Completion Stage ═══════════════╗ */}
      <h3 className="font-semibold text-lg pt-4">Completion Stage</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Job Main Category" {...register("jobMainCategory")} />
        <Input placeholder="Job Sub Category"  {...register("jobSubCategory")}  />
      </div>

      <Input
        placeholder="Lead Message / Notes"
        {...register("leadMessage")}
        className="min-h-[96px]"
      />

      {/* Status */}
      <Input placeholder="Status" {...register("status")} />

      {/* ────────────────── Actions ────────────────── */}
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
