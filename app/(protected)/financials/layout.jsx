import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Layout() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>
        <Button
          asChild
          variant="outline"
          className="hidden md:inline-flex"
        >
          <Link href="/transaction/create">
            <span className="text-lg">Add Transaction</span>
          </Link>
        </Button>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}