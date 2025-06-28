import { z } from "zod";

// Enums based on your schema
const ProjectPriorityEnum = z.enum(["low", "medium", "high", "urgent"]);
const ProjectStatusEnum = z.enum(["active", "completed", "on_hold", "cancelled"]);

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be 100 characters or less"),
  key: z
    .string()
    .min(2, "Project key must be at least 2 characters")
    .max(10, "Project key must be 10 characters or less")
    .toUpperCase(),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  duration: z.coerce.number().min(1, "Must be at least 1 day").optional(),
  deadline: z
    .preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date())
    .optional(),
  projectScope: z
    .string()
    .max(1000, "Project scope must be 1000 characters or less")
    .optional(),
  priority: ProjectPriorityEnum.default("medium"),
  status: ProjectStatusEnum.default("active"),
});

export const sprintSchema = z.object({
  name: z.string().min(1, "Sprint name is required"),
  startDate: z.date(),
  endDate: z.date(),
});

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assigneeId: z.string(),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});
