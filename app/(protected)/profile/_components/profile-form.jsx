"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProfile,
  updateProfile,
  getProfile,
  getAllProfessions,
  getAllTools,
} from "@/actions/profile";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown } from "lucide-react";

// Schema aligned to latest Prisma model
const profileSchema = z.object({
  name: z.string().min(1),
  primaryMobileNo: z.string().min(10),
  personalEmail: z.string().email(),
  address: z.string().min(1),
  pinCode: z.string().min(4),
  state: z.string().min(1),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: z.coerce.date(),

  xInstitution: z.string().optional(),
  xBoard: z.string().optional(),
  xPassingYear: z.coerce.number().optional(),

  xiiInstitution: z.string().optional(),
  xiiBoard: z.string().optional(),
  xiiPassingYear: z.coerce.number().optional(),

  formalDegree: z.string().optional(),
  formalInstitution: z.string().optional(),
  formalUniversity: z.string().optional(),
  formalPassingYear: z.coerce.number().optional(),

  professionalCourse: z.string().optional(),
  professionalInstitution: z.string().optional(),
  professionalUniversity: z.string().optional(),
  professionalPassingYear: z.coerce.number().optional(),

  totalExperienceYears: z.coerce.number().optional(),
  companies: z.string().optional(),
  jobDescriptions: z.string().optional(),
  freelancingWorks: z.string().optional(),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "FREELANCE"]).optional(),

  professionId: z.string().optional(),
  toolIds: z.array(z.string()).optional(),

  website: z.string().optional(),
  workEmail: z.string().optional(),

  // File arrays will be handled separately
});

export const ProfileForm = ({ mode = "create" }) => {
  const router = useRouter();
  const [professions, setProfessions] = useState([]);
  const [tools, setTools] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: "MALE",
    },
  });

  const selectedToolIds = watch("toolIds") || [];

  useEffect(() => {
    async function loadMeta() {
      const [prof, toolList] = await Promise.all([getAllProfessions(), getAllTools()]);
      setProfessions(prof);
      setTools(toolList);
    }

    loadMeta();

    if (mode === "edit") {
      getProfile().then((profile) => {
        if (profile) {
          reset({
            ...profile,
            professionId: profile.profession?.id,
            toolIds: profile.professionalTools?.map((t) => t.id),
            dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined,
          });
        }
      });
    }
  }, [mode, reset]);

  const onSubmit = async (values) => {
    try {
      if (mode === "create") {
        await createProfile(values);
        toast.success("Profile created successfully");
      } else {
        await updateProfile(values);
        toast.success("Profile updated successfully");
      }
      router.push("/profile");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input {...register("name")} placeholder="Full Name" />
        <Input {...register("primaryMobileNo")} placeholder="Primary Mobile No" />
        <Input {...register("personalEmail")} placeholder="Personal Email" />
        <Input {...register("workEmail")} placeholder="Work Email (optional)" />
        <Input {...register("website")} placeholder="Website (optional)" />
        <Input {...register("address")} placeholder="Address" />
        <Input {...register("pinCode")} placeholder="Pin Code" />
        <Input {...register("state")} placeholder="State" />
        
        <div>
          <Label>Gender</Label>
          <Select onValueChange={(val) => setValue("gender", val)} defaultValue="MALE">
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input type="date" {...register("dateOfBirth")} placeholder="Date of Birth" />
      </div>

      {/* Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input {...register("xInstitution")} placeholder="10th Institution" />
        <Input {...register("xBoard")} placeholder="10th Board" />
        <Input {...register("xPassingYear")} placeholder="10th Passing Year" type="number" />

        <Input {...register("xiiInstitution")} placeholder="12th Institution" />
        <Input {...register("xiiBoard")} placeholder="12th Board" />
        <Input {...register("xiiPassingYear")} placeholder="12th Passing Year" type="number" />

        <Input {...register("formalDegree")} placeholder="Formal Degree" />
        <Input {...register("formalInstitution")} placeholder="Formal Institution" />
        <Input {...register("formalUniversity")} placeholder="Formal University" />
        <Input {...register("formalPassingYear")} placeholder="Formal Passing Year" type="number" />

        <Input {...register("professionalCourse")} placeholder="Professional Course" />
        <Input {...register("professionalInstitution")} placeholder="Professional Institution" />
        <Input {...register("professionalUniversity")} placeholder="Professional University" />
        <Input {...register("professionalPassingYear")} placeholder="Professional Passing Year" type="number" />
      </div>

      {/* Profession (Dropdown) */}
      <div>
        <Label>Profession</Label>
        <Select onValueChange={(val) => setValue("professionId", val)} defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="Select Profession" />
          </SelectTrigger>
          <SelectContent>
            {professions.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

{/* Tools Multi-select Dropdown with Search */}
<div className="space-y-2">
  <Label>Professional Tools</Label>

  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        className="w-full justify-between"
      >
        {selectedToolIds.length > 0
          ? `${selectedToolIds.length} selected`
          : "Select tools..."}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent className="w-[300px] p-0">
      <Command>
        <CommandInput placeholder="Search tools..." />
        <CommandList>
          {tools.map((tool) => {
            const isSelected = selectedToolIds.includes(tool.id);
            return (
              <CommandItem
                key={tool.id}
                onSelect={() => {
                  const newSelected = isSelected
                    ? selectedToolIds.filter((id) => id !== tool.id)
                    : [...selectedToolIds, tool.id];
                  setValue("toolIds", newSelected);
                }}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="form-checkbox"
                  />
                  <span>{tool.name}</span>
                </div>
              </CommandItem>
            );
          })}
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

  {/* Display selected tool names */}
  {selectedToolIds.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedToolIds.map((id) => {
        const tool = tools.find((t) => t.id === id);
        return (
          <Badge key={id} variant="secondary" className="flex items-center gap-1">
            {tool?.name}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() =>
                setValue(
                  "toolIds",
                  selectedToolIds.filter((tid) => tid !== id)
                )
              }
            />
          </Badge>
        );
      })}
    </div>
  )}
</div>

      {/* Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input {...register("totalExperienceYears")} placeholder="Total Experience (Years)" type="number" />
        <Input {...register("companies")} placeholder="Companies (CSV)" />
        <Input {...register("freelancingWorks")} placeholder="Freelancing Works" />

        <div>
          <Label>Employment Type</Label>
          <Select onValueChange={(val) => setValue("employmentType", val)} defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select Employment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="PART_TIME">Part Time</SelectItem>
              <SelectItem value="FREELANCE">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Job Descriptions</Label>
        <Textarea {...register("jobDescriptions")} placeholder="Describe roles and responsibilities..." />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {mode === "create" ? "Create Profile" : "Update Profile"}
      </Button>
    </form>
  );
};
