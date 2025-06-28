"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
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
import useFetch from "@/hooks/use-fetch";
import { projectSchema } from "@/lib/validators";
import { createProject } from "@/actions/projects";
import { BarLoader } from "react-spinners";
import OrgSwitcher from "@/components/org-switcher";
import {
  FileText,
  Hash,
  AlignLeft,
  CalendarClock,
  Timer,
  ClipboardList,
  Zap,
  Activity,
} from "lucide-react";

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = (data) => {
    if (!isAdmin) return alert("Only organization admins can create projects");
    createProjectFn(data);
  };

  useEffect(() => {
    if (project) router.push(`/project/${project.id}`);
  }, [project]);

  if (!isOrgLoaded || !isUserLoaded) return null;

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl font-semibold text-destructive">
          Only Admins can create projects
        </span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">Create New Project</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card rounded-xl shadow-md p-6 space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <FileText size={18} /> Project Name
          </Label>
          <Input {...register("name")} placeholder="Enter project name" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="key" className="flex items-center gap-2">
            <Hash size={18} /> Project Key
          </Label>
          <Input {...register("key")} placeholder="e.g., RCYT" />
          {errors.key && <p className="text-red-500 text-sm">{errors.key.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2">
            <AlignLeft size={18} /> Description
          </Label>
          <Textarea {...register("description")} placeholder="Brief project description" rows={4} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Timer size={18} /> Duration (days)
            </Label>
            <Input type="number" {...register("duration")} placeholder="Estimated duration" />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="flex items-center gap-2">
              <CalendarClock size={18} /> Deadline
            </Label>
            <Input type="date" {...register("deadline")} />
            {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectScope" className="flex items-center gap-2">
            <ClipboardList size={18} /> Project Scope
          </Label>
          <Textarea
            {...register("projectScope")}
            placeholder="Define the overall scope of the project"
            rows={3}
          />
          {errors.projectScope && <p className="text-red-500 text-sm">{errors.projectScope.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority" className="flex items-center gap-2">
              <Zap size={18} /> Priority
            </Label>
            <Select onValueChange={(val) => setValue("priority", val)} defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="flex items-center gap-2">
              <Activity size={18} /> Status
            </Label>
            <Select onValueChange={(val) => setValue("status", val)} defaultValue="active">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
        </div>

        <div className="pt-4">
          {loading && <BarLoader width="100%" color="#3b82f6" />}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
      </form>
    </div>
  );
}
