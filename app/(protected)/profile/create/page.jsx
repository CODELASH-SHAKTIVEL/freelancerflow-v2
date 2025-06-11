"use client";

import React from "react";
import { ProfileForm } from "../_components/profile-form";

const CreateProfilePage = () => {
  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Fill out your details to get started.
        </p>
      </div>

      {/* Form */}
      <div>
        <ProfileForm mode="create" />
      </div>
    </section>
  );
};

export default CreateProfilePage;
