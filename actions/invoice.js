// app/actions/invoice.js
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
export async function createInvoice(data) {
  const user = await getCurrentAppUser();
  console.log("Creating invoice for user:", user.id);
  console.log("Invoice data:", data);
 const invoice = await db.invoice.create({
   data: {
      invoiceNumber: data.invoiceNumber,
      projectId: data.projectId,
      jobId: data.jobId,
      clientId: data.clientId,
      clientName: data.clientName,
      clientCompany: data.clientCompany,
      freelancer: data.freelancer,
      dateOfInvoice: new Date(data.dateOfInvoice),
      payableByDate: new Date(data.payableByDate),
      jobDetails: data.jobDetails, // jobDetails must contain gst & discount inside each job item if needed
      terms: data.terms,
      total: data.total,
      modeOfPayment: data.modeOfPayment,
      typeOfPayment: data.typeOfPayment,
      userId: user.id,
    },
  });

  revalidatePath("/invoice");
  return { success: true, data: invoice };
}

export async function getInvoice(id) {
  const user = await getCurrentAppUser();

  const invoice = await db.invoice.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!invoice) throw new Error("Invoice not found");
  return invoice;
}

export async function updateInvoice(id, data) {
  const user = await getCurrentAppUser();

  // Make sure the invoice belongs to this user
  await getInvoice(id);

  const updated = await db.invoice.update({
    where: { id },
    data,
  });

  return { success: true, data: updated };
}

export async function deleteInvoice(id) {
  const user = await getCurrentAppUser();

  // Make sure the invoice belongs to this user
  await getInvoice(id);

  await db.invoice.delete({
    where: { id },
  });

  revalidatePath("/invoices");
  return { success: true };
}

export async function getAllInvoices() {
  const user = await getCurrentAppUser();

  const invoices = await db.invoice.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return invoices;
}
