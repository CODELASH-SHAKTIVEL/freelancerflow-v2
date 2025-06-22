// app/actions/receipt.js
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

/* ───────────────────────── actions ───────────────────────── */
export async function createReceipt(data) {
  const user = await getCurrentAppUser();

  const receipt = await db.receipt.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/receipts");
  return { success: true, data: receipt };
}

export async function getReceipt(id) {
  const user = await getCurrentAppUser();

  const receipt = await db.receipt.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!receipt) throw new Error("Receipt not found");
  return receipt;
}

export async function updateReceipt(id, data) {
  const user = await getCurrentAppUser();

  // Ensure the receipt belongs to the current user
  await getReceipt(id);

  const updated = await db.receipt.update({
    where: { id },
    data,
  });

  revalidatePath(`/receipts/${id}`);
  return { success: true, data: updated };
}

export async function deleteReceipt(id) {
  const user = await getCurrentAppUser();

  // Ensure the receipt belongs to the current user
  await getReceipt(id);

  await db.receipt.delete({
    where: { id },
  });

  revalidatePath("/receipts");
  return { success: true };
}

export async function getAllReceipts() {
  const user = await getCurrentAppUser();

  const receipts = await db.receipt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return receipts;
}
