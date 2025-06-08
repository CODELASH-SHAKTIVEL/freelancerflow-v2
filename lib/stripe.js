"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
 apiVersion: "2025-05-28.basil",
});

export async function createCheckoutSession(amount) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ["card"], // Only allow supported payment method types
    line_items: [
      {
        price_data: {
          currency: "usd", // Your product currency
          product_data: {
            name: "FreelancerFlow Subscription",
          },
          unit_amount: Math.round(amount * 100), // Stripe expects amount in cents
        },
        quantity: 1,
      },
    ],
    customer_creation: "always",
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
    client_reference_id: userId,
    metadata: {
      userId,
      amount,
    },
  });

  return redirect(session.url);
}
