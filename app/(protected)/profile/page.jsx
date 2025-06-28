"use client";

import React from "react";
import Link from "next/link";
import { ProfileCard } from "./_components/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User, PencilLine, PlusCircle } from "lucide-react";

const ProfilePage = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 space-y-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/profile/create">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Profile
            </Link>
          </Button>
          <Button asChild>
            <Link href="/profile/edit">
              <PencilLine className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Content Card */}
      <Card className="border border-muted bg-background shadow-sm w-full">
        <div className="p-6">
          <ProfileCard />
        </div>
      </Card>
    </section>
  );
};

export default ProfilePage;
