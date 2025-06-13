"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PenBox, LayoutDashboard } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // adjust path if needed
import UserMenu from "@/components/user-menu";   // adjust path if needed
import UserLoading from "@/components/user-loading"; // adjust path if needed
// import { checkUser } from "@/lib/checkUser"; // keep this if you need to run it elsewhere

const Header = () => {
  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            <Image
              src="/logo2.png"
              alt="Zscrum Logo"
              width={200}
              height={56}
              className="h-10 w-auto object-contain"
            />
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="secondary" className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Go to Dashboard</span>
            </Button>
          </Link>

          <Link href="/project/create">
            <Button variant="destructive" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>

      <UserLoading />
    </header>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto mt-5 px-4">
      <Header />
      <main className="mt-6">{children}</main>
    </div>
  );
};

export default Layout;
