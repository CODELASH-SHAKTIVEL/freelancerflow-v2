"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* ───────────────────────── helpers ───────────────────────── */
async function getCurrentAppUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId } });
  if (!user) throw new Error("User not found");

  return user;
}

async function getCurrentProfile() {
  const user = await getCurrentAppUser();
  return db.profile.findUnique({ where: { userId: user.id } });
}

/* ───────────────────── Profile Actions ───────────────────── */

/**
 * Create profile for the current user.
 */
export async function createProfile(data) {
  const user = await getCurrentAppUser();

  const existing = await db.profile.findUnique({ where: { userId: user.id } });
  if (existing) throw new Error("Profile already exists. Use updateProfile.");

  const profile = await db.profile.create({
    data: {
      ...data,
      userId: user.id,
      professionalTools: data.toolIds
        ? {
            connect: data.toolIds.map((id) => ({ id })),
          }
        : undefined,
      profession: data.professionId
        ? {
            connect: { id: data.professionId },
          }
        : undefined,
    },
  });

  revalidatePath("/profile");
  return { success: true, data: profile };
}

/**
 * Get the current user's profile.
 */
export async function getProfile() {
  const user = await getCurrentAppUser();
  return db.profile.findUnique({
    where: { userId: user.id },
    include: {
      user: true,
      profession: true,
      professionalTools: true,
    },
  });
}

/**
 * Update the current user's profile.
 */
export async function updateProfile(data) {
  const user = await getCurrentAppUser();
  const existing = await getCurrentProfile();
  if (!existing) throw new Error("Profile not found. Use createProfile first.");

  const {
    professionId,
    toolIds,
    ...rest
  } = data;

  const updated = await db.profile.update({
    where: { id: existing.id },
    data: {
      ...rest,
      profession: professionId
        ? { connect: { id: professionId } }
        : undefined,
      professionalTools: toolIds
        ? {
            set: toolIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  revalidatePath("/profile");
  return { success: true, data: updated };
}

/**
 * Delete the current user's profile.
 */
export async function deleteProfile() {
  const existing = await getCurrentProfile();
  if (!existing) throw new Error("Profile not found");

  await db.profile.delete({ where: { id: existing.id } });

  revalidatePath("/profile");
  return { success: true };
}

/**
 * Admin: Get all profiles.
 */
export async function getAllProfiles() {
  const profiles = await db.profile.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      profession: true,
      professionalTools: true,
    },
  });

  return profiles;
}

/* ───────────────────── Profession (Admin) ───────────────────── */

/**
 * Admin: Get all professions for dropdown.
 */
export async function getAllProfessions() {
  return db.profession.findMany({
    orderBy: { name: "asc" },
  });
}

/**
 * Admin: Create new profession.
 */
export async function createProfession(data) {
  return db.profession.create({
    data,
  });
}

/**
 * Admin: Delete a profession.
 */
export async function deleteProfession(id) {
  return db.profession.delete({
    where: { id },
  });
}

/* ───────────────────── Tools (Admin) ───────────────────── */

/**
 * Admin: Get all tools for dropdown.
 */
export async function getAllTools() {
  return db.tool.findMany({
    orderBy: { name: "asc" },
  });
}

/**
 * Admin: Create a new tool.
 */
export async function createTool(data) {
  return db.tool.create({
    data,
  });
}

/**
 * Admin: Delete a tool.
 */
export async function deleteTool(id) {
  return db.tool.delete({
    where: { id },
  });
}

export async function updateProfession(id, data) {
  if (!data?.name || typeof data.name !== "string") {
    throw new Error("Invalid profession name.");
  }

  return await db.profession.update({
    where: { id },
    data,
  });
}

export async function updateTool(id, data) {
  if (!data?.name || typeof data.name !== "string") {
    throw new Error("Invalid tool name.");
  }

  return await db.professionalTool.update({
    where: { id },
    data,
  });
}