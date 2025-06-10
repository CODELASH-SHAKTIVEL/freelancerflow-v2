// app/actions/leads.js
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
export async function createLead(data) {
  const user = await getCurrentAppUser();

  const lead = await db.lead.create({
    data: {
      ...data,
      userId: user.id,        // ✅ satisfies the required relation
      status: data.status ?? "LEAD",
    },
  });

  revalidatePath("/leads");
  return { success: true, data: lead };
}

export async function getLead(id) {
  const user = await getCurrentAppUser();

  const lead = await db.lead.findUnique({
    where: { id, userId: user.id },
  });

  if (!lead) throw new Error("Lead not found");
  return lead;
}

export async function updateLead(id, data) {
  const user = await getCurrentAppUser();

  // Make sure the lead belongs to this user
  await getLead(id);

  const updated = await db.lead.update({
    where: { id },
    data,
  });

  revalidatePath(`/leads/${id}`);
  return { success: true, data: updated };
}

export async function deleteLead(id) {
  const user = await getCurrentAppUser();

  // Make sure the lead belongs to this user
  await getLead(id);

  await db.lead.delete({ where: { id } });

  revalidatePath("/leads");
  return { success: true };
}

export async function getAllLeads() {
  const user = await getCurrentAppUser();

  const leads = await db.lead.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return leads;
}