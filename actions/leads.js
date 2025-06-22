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
  if (!user) throw new Error("Unauthorized");

  const lead = await db.lead.create({
    data: {
      userId: user.id,

      // Enums & status
      journeyStage: data.journeyStage || "LEAD",
      leadSource: data.leadSource || null,
      referenceForLead: data.referenceForLead || null,
      typeOfLead: data.typeOfLead || null,
      leadDetails: data.leadDetails || null,
      enquiryType: data.enquiryType || null,
      action: data.action || null,
      status: data.status || "NEW_LEAD",

      // Dates
      leadDate: data.leadDate ? new Date(data.leadDate) : null,
      quoteDate: data.quoteDate ? new Date(data.quoteDate) : null,

      // Client Info
      personName: data.personName || null,
      mobileNo: data.mobileNo || null,
      emailId: data.emailId || null,
      capacity: data.capacity || null,
      address: data.address || "Not Provided",
      pinCode: data.pinCode || null,
      state: data.state || null,
      country: data.country || null,
      designation: data.designation || null,
      department: data.department || null,
      clientType: data.clientType || null,

      // Company Info
      companyName: data.companyName || null,
      companyContact: data.companyContact || null,
      companyEmail: data.companyEmail || null,
      companyWebsite: data.companyWebsite || null,
      companyAddress: data.companyAddress || null,
      companyPinCode: data.companyPinCode || null,
      companyState: data.companyState || null,
      companyCountry: data.companyCountry || null,
      companyType: data.companyType || null,
      previouslyWorked: data.previouslyWorked ?? false,
      companyProfession: data.companyProfession || null,

      // Optional Info
      jobMainCategory: data.jobMainCategory || null,
      jobSubCategory: data.jobSubCategory || null,
      leadMessage: data.leadMessage || null,
    },
  });

  revalidatePath("/leads");
  return { success: true, data: lead };
}

export async function getLead(id) {
  const user = await getCurrentAppUser();

  const lead = await db.lead.findUnique({
    where: { id },
  });

  if (!lead || lead.userId !== user.id) throw new Error("Lead not found");
  return lead;
}

export async function updateLead(id, data) {
  const user = await getCurrentAppUser();

  const lead = await getLead(id);

  const {
    userId, id: _, createdAt, updatedAt, // discard immutable fields
    leadDate,
    quoteDate,
    ...safeData
  } = data;

  const updated = await db.lead.update({
    where: { id },
    data: {
      ...safeData,
      leadDate: leadDate === undefined ? lead.leadDate : leadDate ? new Date(leadDate) : null,
      quoteDate: quoteDate === undefined ? lead.quoteDate : quoteDate ? new Date(quoteDate) : null,
    },
  });

  revalidatePath(`/leads/${id}`);
  return { success: true, data: updated };
}

export async function deleteLead(id) {
  const user = await getCurrentAppUser();

  // Ensure lead exists and belongs to the current user
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
