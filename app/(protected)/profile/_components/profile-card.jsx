"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "@/actions/profile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Phone, Mail, Globe, MapPin, Landmark, GraduationCap, User, Calendar, Wrench, Briefcase, FileText, Hammer, Laptop2, Paperclip } from "lucide-react";

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
    name,
    primaryMobileNo,
    secondaryMobileNo,
    personalEmail,
    workEmail,
    website,
    address,
    pinCode,
    state,
    gender,
    dateOfBirth,
    xInstitution,
    xBoard,
    xPassingYear,
    xiiInstitution,
    xiiBoard,
    xiiPassingYear,
    formalDegree,
    formalInstitution,
    formalUniversity,
    formalPassingYear,
    professionalCourse,
    professionalInstitution,
    professionalUniversity,
    professionalPassingYear,
    totalExperienceYears,
    companies,
    jobDescriptions,
    freelancingWorks,
    employmentType,
    profession,
    professionalTools,
    resumes,
    cvs,
    portfolios,
    presentations,
    proposals,
    rateCards,
    catalogues,
    banners,
    visitingCards,
    certificatesOfAppreciation,
    awards,
    experienceCertificates,
    internshipCertificates,
  } = profile;

  const renderAttachments = (title, files) => {
    if (!files || files.length === 0) return null;
    return (
      <div className="space-y-1">
        <h4 className="text-base font-semibold text-primary flex items-center gap-2">
          <Paperclip className="w-4 h-4" /> {title}
        </h4>
        <ul className="list-disc list-inside text-sm pl-4">
          {files.map((file, i) => (
            <li key={i}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {file.name || `Attachment ${i + 1}`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border shadow-lg">
      <CardHeader className="bg-gradient-to-r from-muted to-primary text-foreground dark:from-muted dark:to-primary dark:text-foreground rounded-t-md">
  <CardTitle className="flex items-center gap-3 text-xl">
    <User className="w-6 h-6 text-inherit" /> {name}
  </CardTitle>
</CardHeader>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Landmark className="w-5 h-5 text-primary" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {primaryMobileNo}</li>
            {secondaryMobileNo && <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {secondaryMobileNo}</li>}
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {personalEmail}</li>
            {workEmail && <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {workEmail}</li>}
            {website && <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> {website}</li>}
            <li className="flex items-center gap-2 col-span-2"><MapPin className="w-4 h-4" /> {address}, {state} - {pinCode}</li>
            <li className="flex items-center gap-2"><User className="w-4 h-4" /> {gender}</li>
            <li className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : "-"}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="w-5 h-5 text-primary" /> Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li><strong>10th:</strong> {xInstitution} ({xBoard}, {xPassingYear})</li>
            <li><strong>12th:</strong> {xiiInstitution} ({xiiBoard}, {xiiPassingYear})</li>
            <li><strong>Formal:</strong> {formalDegree} at {formalInstitution} ({formalUniversity}, {formalPassingYear})</li>
            <li><strong>Professional:</strong> {professionalCourse} at {professionalInstitution} ({professionalUniversity}, {professionalPassingYear})</li>
          </ul>
        </CardContent>
      </Card>

      {/* Profession */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hammer className="w-5 h-5 text-primary" /> Profession & Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4" /> <strong>Profession:</strong> {profession?.name ?? "-"}
          </p>
          <div className="flex flex-wrap gap-2">
            {professionalTools?.length > 0 ? (
              professionalTools.map((tool) => (
                <Badge key={tool.id} variant="secondary" className="text-xs">
                  <Wrench className="w-3 h-3 mr-1" /> {tool.name}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">No tools listed</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Laptop2 className="w-5 h-5 text-primary" /> Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li><strong>Total Experience:</strong> {totalExperienceYears ?? "-"} years</li>
            <li><strong>Employment Type:</strong> {employmentType ?? "-"}</li>
            <li><strong>Companies:</strong> {companies ?? "-"}</li>
            <li><strong>Freelancing Works:</strong> {freelancingWorks ?? "-"}</li>
            <li className="md:col-span-2"><strong>Job Descriptions:</strong><br />{jobDescriptions ?? "-"}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Attachments */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" /> Attachments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderAttachments("Resumes", resumes)}
            {renderAttachments("CVs", cvs)}
            {renderAttachments("Portfolios", portfolios)}
            {renderAttachments("Presentations", presentations)}
            {renderAttachments("Proposals", proposals)}
            {renderAttachments("Rate Cards", rateCards)}
            {renderAttachments("Catalogues", catalogues)}
            {renderAttachments("Banners", banners)}
            {renderAttachments("Visiting Cards", visitingCards)}
            {renderAttachments("Certificates of Appreciation", certificatesOfAppreciation)}
            {renderAttachments("Awards & Recognitions", awards)}
            {renderAttachments("Experience Certificates", experienceCertificates)}
            {renderAttachments("Internship Certificates", internshipCertificates)}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};
