// app/actions/crm.js
"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/* ───────────────────────── helpers ───────────────────────── */
async function getCurrentAppUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId } });
  if (!user) throw new Error("User not found");

  return user;
}

/* ───────────────────────── NOTES ───────────────────────── */
export async function addCrmNote(leadId, content) {
  const user = await getCurrentAppUser();

  const lead = await db.lead.findUnique({ where: { id: leadId } });
  if (!lead || lead.userId !== user.id) throw new Error("Lead not found or access denied");

  await db.crmNote.create({
    data: {
      leadId,
      content,
    },
  });

  revalidatePath(`/crm/${leadId}`);
}

// app/actions/crm.js (continue in the same file)

export async function addCrmFollowUp(leadId, title, dueDate) {
  const user = await getCurrentAppUser();

  const lead = await db.lead.findUnique({ where: { id: leadId } });
  if (!lead || lead.userId !== user.id) throw new Error("Lead not found or access denied");

  await db.crmFollowUp.create({
    data: {
      leadId,
      title,
      dueDate: new Date(dueDate),
    },
  });

  revalidatePath(`/crm/${leadId}`);
}

export async function markFollowUpDone(followUpId, leadId) {
  const user = await getCurrentAppUser();

  const followUp = await db.crmFollowUp.findUnique({ where: { id: followUpId } });
  if (!followUp) throw new Error("Follow-up not found");

  const lead = await db.lead.findUnique({ where: { id: followUp.leadId } });
  if (!lead || lead.userId !== user.id) throw new Error("Access denied");

  await db.crmFollowUp.update({
    where: { id: followUpId },
    data: { status: "done" },
  });

  revalidatePath(`/crm/${leadId}`);
}

// app/actions/crm.js (continue below previous actions)

export async function addCrmTag(leadId, name) {
  const user = await getCurrentAppUser();

  const lead = await db.lead.findUnique({ where: { id: leadId } });
  if (!lead || lead.userId !== user.id) throw new Error("Lead not found or access denied");

  await db.crmTag.create({
    data: {
      leadId,
      name,
    },
  });

  revalidatePath(`/crm/${leadId}`);
}

export async function deleteCrmTag(tagId, leadId) {
  const user = await getCurrentAppUser();

  const tag = await db.crmTag.findUnique({ where: { id: tagId } });
  if (!tag) throw new Error("Tag not found");

  const lead = await db.lead.findUnique({ where: { id: tag.leadId } });
  if (!lead || lead.userId !== user.id) throw new Error("Access denied");

  await db.crmTag.delete({ where: { id: tagId } });

  revalidatePath(`/crm/${leadId}`);
}

// app/actions/crm.js (add at the bottom)

export async function updateCrmStatus(leadId, newValue) {
  const user = await getCurrentAppUser();

  const lead = await db.lead.findUnique({ where: { id: leadId } });
  if (!lead || lead.userId !== user.id) throw new Error("Lead not found or access denied");

  const existing = await db.crmStatus.findUnique({ where: { leadId } });

  if (existing) {
    await db.crmStatus.update({
      where: { leadId },
      data: { value: newValue },
    });
  } else {
    await db.crmStatus.create({
      data: {
        leadId,
        value: newValue,
      },
    });
  }

  revalidatePath(`/crm/${leadId}`);
}
