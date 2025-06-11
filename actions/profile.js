"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* ───────────────────── Helpers ───────────────────── */
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

/* ───────────────────── Actions ───────────────────── */

/**
 * Create profile for the current user.
 * Throws if the profile already exists.
 */
export async function createProfile(data) {
  const user = await getCurrentAppUser();

  const existing = await db.profile.findUnique({ where: { userId: user.id } });
  if (existing) throw new Error("Profile already exists. Use updateProfile.");

  const profile = await db.profile.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/profile"); // Adjust if profile is rendered elsewhere
  return { success: true, data: profile };
}

/**
 * Get the current user's profile.
 * Returns `null` if not found.
 */
export async function getProfile() {
  return await getCurrentProfile();
}

/**
 * Update the current user's profile.
 * Throws if no profile exists.
 */
export async function updateProfile(data) {
  const user = await getCurrentAppUser();
  const existing = await getCurrentProfile();

  if (!existing) {
    throw new Error("Profile not found. Use createProfile first.");
  }

  const updated = await db.profile.update({
    where: { id: existing.id },
    data,
  });

  revalidatePath("/profile");
  return { success: true, data: updated };
}

/**
 * Delete the current user's profile.
 * Rarely used, but included for completeness.
 */
export async function deleteProfile() {
  const existing = await getCurrentProfile();
  if (!existing) throw new Error("Profile not found");

  await db.profile.delete({ where: { id: existing.id } });

  revalidatePath("/profile");
  return { success: true };
}

/**
 * Admin: Get all profiles (with linked user).
 * Protect this route if exposing in production.
 */
export async function getAllProfiles() {
  const profiles = await db.profile.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }, // Remove this if only profile data is needed
  });

  return profiles;
}
