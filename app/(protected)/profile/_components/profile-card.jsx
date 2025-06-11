"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "@/actions/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-muted-foreground text-center">
        No profile found. Please create your profile.
      </div>
    );
  }

  const {
    primaryMobileNo,
    secondaryMobileNo,
    personalEmail,
    workEmail,
    address,
    pinCode,
    state,
    gender,
    dateOfBirth,
    xInstitution,
    xiiInstitution,
    formalDegree,
    professionalCourse,
    figmaCertified,
    reactJsCertified,
    totalExperienceYears,
    companies,
    jobDescriptions,
    freelancingWorks,
    employmentType,
  } = profile;

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        {/* Personal Info */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Primary Mobile:</strong> {primaryMobileNo}</li>
            {secondaryMobileNo && <li><strong>Secondary Mobile:</strong> {secondaryMobileNo}</li>}
            <li><strong>Personal Email:</strong> {personalEmail}</li>
            {workEmail && <li><strong>Work Email:</strong> {workEmail}</li>}
            <li><strong>Address:</strong> {address}, {state} - {pinCode}</li>
            <li><strong>Gender:</strong> {gender}</li>
           <li><strong>Date of Birth:</strong> {dateOfBirth ? new Date(dateOfBirth).toISOString().split("T")[0] : "-"}</li>
          </ul>
        </section>

        {/* Education Info */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>10th:</strong> {xInstitution}</li>
            <li><strong>12th:</strong> {xiiInstitution}</li>
            <li><strong>Formal Degree:</strong> {formalDegree}</li>
            <li><strong>Professional Course:</strong> {professionalCourse}</li>
          </ul>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Certifications</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Figma Certified:</strong> {figmaCertified ? "Yes" : "No"}</li>
            <li><strong>ReactJS Certified:</strong> {reactJsCertified ? "Yes" : "No"}</li>
          </ul>
        </section>

        {/* Work Info */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Total Experience:</strong> {totalExperienceYears ?? "-"} years</li>
            <li><strong>Employment Type:</strong> {employmentType ?? "-"}</li>
            <li><strong>Companies:</strong> {companies ?? "-"}</li>
            <li><strong>Freelancing:</strong> {freelancingWorks ?? "-"}</li>
            <li><strong>Job Descriptions:</strong> {jobDescriptions ?? "-"}</li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
};
