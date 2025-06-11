import React from "react";
import { ProfileForm } from "../_components/profile-form";

const EditProfilePage = () => {
  return (
    <section className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
      </div>

      <div>
        <ProfileForm mode="edit" />
      </div>
    </section>
  );
};

export default EditProfilePage;
