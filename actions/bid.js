"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// Helper to get current user
async function getCurrentAppUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

// Submit a bid (user)
export async function submitBid({ tenderId, bidAmount, pitchDeckUrl }) {
  const user = await getCurrentAppUser();

  return await db.bid.create({
    data: {
      tenderId,
      bidderId: user.id,
      bidAmount,
      pitchDeckUrl,
      status: "SUBMITTED",
    },
  });
}

// Get all bids submitted by the current user
export async function getUserBids() {
  const user = await getCurrentAppUser();

  return await db.bid.findMany({
    where: { bidderId: user.id },
    include: { tender: true },
    orderBy: { bidDate: "desc" },
  });
}

// Admin updates bid status (accept/reject/etc.)
export async function updateBidStatus({ bidId, status, reasonNotBidding }) {
  const user = await getCurrentAppUser();

  const bid = await db.bid.findUnique({
    where: { id: bidId },
    include: { tender: true },
  });

  if (!bid || bid.tender.createdById !== user.id) {
    throw new Error("Unauthorized or Bid not found");
  }

  return await db.bid.update({
    where: { id: bidId },
    data: {
      status,
      reasonNotBidding,
    },
  });
}
