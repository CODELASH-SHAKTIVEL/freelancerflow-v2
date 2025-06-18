"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";


async function getCurrentAppUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId } });
  if (!user) throw new Error("User not found");

  return user;
}

export const getAllUsersWithProfiles = async ({
  search,
}) => {
  try {
      const user = await getCurrentAppUser();
      if (!user) {
        throw new Error("Unauthorized");
      }
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            {
              profile: {
                personalEmail: { contains: search, mode: "insensitive" },
              },
            },
          ],
        }
      : {};
  
    return await db.user.findMany({
      where,
      include: {
        profile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching users with profiles:", error);
    throw new Error("Failed to fetch users");
  }
};
