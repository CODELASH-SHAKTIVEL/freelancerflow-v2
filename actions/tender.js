"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// Helper to get the current logged-in user
async function getCurrentAppUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

// Create a tender (admin or user)
export async function createTender({
  title,
  description,
  rfqDate,
  deadline,
  typeOfWork,
  skillsRequired,
  jobDetails,
  documentsUrl,
}) {
  const user = await getCurrentAppUser();

  return await db.tender.create({
    data: {
      title,
      description,
      rfqDate,
      deadline,
      typeOfWork,
      skillsRequired,
      jobDetails,
      documentsUrl,
      createdById: user.id,
    },
  });
}

// Get all tenders
export async function getAllTenders() {
  return await db.tender.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Get tenders created by the current user
export async function getUserTenders() {
  const user = await getCurrentAppUser();
  return await db.tender.findMany({
    where: { createdById: user.id },
    orderBy: { createdAt: "desc" },
  });
}

// Get tender by ID including bids
export async function getTenderById(id) {
  return await db.tender.findUnique({
    where: { id },
    include: {
      bids: {
        include: {
          bidder: true,
        },
      },
    },
  });
}

// Update a tender (admin or user)
export async function updateTender(tenderId, data) {
  const user = await getCurrentAppUser();

  const tender = await db.tender.findUnique({
    where: { id: tenderId },
  });

  if (!tender || tender.createdById !== user.id) {
    throw new Error("Unauthorized or Tender not found");
  }

  return await db.tender.update({
    where: { id: tenderId },
    data,
  });
}

// Get bids for a tender (admin or user)
export async function getTenderBids(tenderId) {
  const user = await getCurrentAppUser();

  const tender = await db.tender.findUnique({
    where: { id: tenderId },
  });

  if (!tender || tender.createdById !== user.id) {
    throw new Error("Unauthorized or Tender not found");
  }

  return await db.bid.findMany({
    where: { tenderId },
    include: { bidder: true },
    orderBy: { bidDate: "desc" },
  });
}
