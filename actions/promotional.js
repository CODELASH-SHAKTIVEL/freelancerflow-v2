"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* ──────────────────────────────── */
/* 🔐 Get Current App User Helper   */
/* ──────────────────────────────── */
async function getCurrentAppUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

/* ──────────────────────────────── */
/* 📦 Create Material               */
/* ──────────────────────────────── */
export async function createPromotionalMaterial(data) {
  const user = await getCurrentAppUser();
  console.log("Creating promotional material for user:", user.id);
  console.log("Material data:", data);
  const material = await db.promotionalMaterial.create({
    data: {
      name: data.name,
      tag: data.tag,
      type: data.type,
      previewUrl: data.previewUrl,
      date: data.date,
      userId: user.id,
    },
  });

  revalidatePath("/promotional-materials");
  return material;
}

/* ──────────────────────────────── */
/* 📄 Get All Materials             */
/* ──────────────────────────────── */
export async function getAllPromotionalMaterials() {
  const user = await getCurrentAppUser();

  return db.promotionalMaterial.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

/* ──────────────────────────────── */
/* ❌ Delete Material               */
/* ──────────────────────────────── */
export async function deletePromotionalMaterial(id) {
  const user = await getCurrentAppUser();

  const material = await db.promotionalMaterial.findUnique({
    where: { id },
  });

  if (!material || material.userId !== user.id) {
    throw new Error("Unauthorized or material not found");
  }

  await db.promotionalMaterial.delete({
    where: { id },
  });

  revalidatePath("/promotional-materials");
  return { success: true };
}
