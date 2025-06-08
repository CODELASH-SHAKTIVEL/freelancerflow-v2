import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

const page = async ({ }) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    console.log(user);
    if (!user.emailAddresses[0]?.emailAddress) {
        return notFound();
    }

    await db.user.upsert({
        where: {
            email: user.emailAddresses[0].emailAddress ?? "",
        },
        update: {
            imageUrl: user.imageUrl,
            name: user.firstName,
        },
        create: {
            id: userId,
            clerkUserId: userId, // Add this line
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
            name: user.firstName,
        },
    });

    return redirect("/dashboard");
};

export default page;