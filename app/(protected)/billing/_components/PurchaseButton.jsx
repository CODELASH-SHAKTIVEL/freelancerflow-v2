"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/lib/stripe"; // adjust path if needed
import { Button } from "@/components/ui/button";

export function PurchaseButton({ amount, children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          createCheckoutSession(amount);
        });
      }}
      disabled={isPending}
      className="w-full mt-6 rounded-full"
    >
      {isPending ? "Redirecting..." : children}
    </Button>
  );
}