"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "./_components/profile-card";

const ProfilePage = () => {
  return (
    <section className="p-6 space-y-6">
      {/* Header Row: Title + Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <div className="flex flex-col md:flex-row gap-2">
          <Button asChild variant="secondary">
            <Link href="/profile/create">
              <span className="text-sm font-medium">Create Profile</span>
            </Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/profile/edit">
              <span className="text-sm font-medium">Edit Profile</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div>
        <ProfileCard />
      </div>
    </section>
  );
};

export default ProfilePage;
