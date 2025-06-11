"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfile, updateProfile, getProfile } from "@/actions/profile";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// ──────────────────────────────────────────────────────────────
// Schema Definition
const profileSchema = z.object({
  primaryMobileNo: z.string().min(10, "Mobile number is required"),
  personalEmail: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  pinCode: z.string().min(4, "Pin code is required"),
  state: z.string().min(1, "State is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: z.coerce.date(),

  // Education
  xInstitution: z.string().optional(),
  xiiInstitution: z.string().optional(),
  formalDegree: z.string().optional(),

  // Skills
  figmaCertified: z.boolean().optional(),
  reactJsCertified: z.boolean().optional(),

  // Work
  totalExperienceYears: z.coerce.number().optional(),
  companies: z.string().optional(),
  jobDescriptions: z.string().optional(),
  freelancingWorks: z.string().optional(),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "FREELANCE"]).optional(),
});

// ──────────────────────────────────────────────────────────────
// Component
export const ProfileForm = ({ mode = "create" }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: "MALE",
      figmaCertified: false,
      reactJsCertified: false,
    },
  });

  useEffect(() => {
    if (mode === "edit") {
      getProfile().then((profile) => {
        if (profile) {
          reset({
            ...profile,
            dateOfBirth: profile.dateOfBirth
              ? new Date(profile.dateOfBirth)
              : undefined,
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
        <Input label="Primary Mobile No" {...register("primaryMobileNo")} error={errors.primaryMobileNo?.message} />
        <Input label="Personal Email" {...register("personalEmail")} error={errors.personalEmail?.message} />
        <Input label="Address" {...register("address")} error={errors.address?.message} />
        <Input label="Pin Code" {...register("pinCode")} error={errors.pinCode?.message} />
        <Input label="State" {...register("state")} error={errors.state?.message} />
        <select {...register("gender")} className="input">
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <Input type="date" label="Date of Birth" {...register("dateOfBirth")} error={errors.dateOfBirth?.message} />
      </div>

      {/* Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="10th Institution" {...register("xInstitution")} />
        <Input label="12th Institution" {...register("xiiInstitution")} />
        <Input label="Formal Degree" {...register("formalDegree")} />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Skills</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("figmaCertified")} />
            Figma Certified
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("reactJsCertified")} />
            ReactJS Certified
          </label>
        </div>
      </div>

      {/* Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Total Experience (Years)" type="number" {...register("totalExperienceYears")} />
        <Input label="Companies (CSV)" {...register("companies")} />
        <Input label="Freelancing Works" {...register("freelancingWorks")} />
        <select {...register("employmentType")} className="input">
          <option value="">Select Employment Type</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="FREELANCE">Freelance</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Job Descriptions</label>
        <textarea {...register("jobDescriptions")} className="input w-full min-h-[100px]" />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {mode === "create" ? "Create Profile" : "Update Profile"}
      </Button>
    </form>
  );
};
