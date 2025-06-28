"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getAllUsersWithProfiles } from "@/actions/admin.profile";
import { Download, User, Phone, BadgeCheck, GraduationCap, BookText } from "lucide-react";
import jsPDF from "jspdf";

export default function AdminProfilePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getAllUsersWithProfiles({ search });
      setUsers(result);
    })();
  }, [search]);

  const handleDownloadPDF = (profile) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("User Profile", 20, 20);

    const sections = {
      "Contact Info": {
        Name: profile.user?.name,
        Email: profile.user?.email,
        "Primary Mobile": profile.primaryMobileNo,
        "Secondary Mobile": profile.secondaryMobileNo,
        "Personal Email": profile.personalEmail,
        "Work Email": profile.workEmail,
        Website: profile.website,
        Address: profile.address,
        State: profile.state,
        "Pin Code": profile.pinCode,
      },
      "Basic Details": {
        Gender: profile.gender,
        "Date of Birth": new Date(profile.dateOfBirth).toLocaleDateString(),
        Profession: profile.profession?.name,
        Experience: profile.totalExperienceYears ? `${profile.totalExperienceYears} yrs` : "-",
        "Employment Type": profile.employmentType,
        Companies: profile.companies,
        "Freelancing Works": profile.freelancingWorks,
        "Job Description": profile.jobDescriptions,
      },
      "Education": {
        "10th Institution": profile.xInstitution,
        "10th Board": profile.xBoard,
        "10th Passing Year": profile.xPassingYear,
        "12th Institution": profile.xiiInstitution,
        "12th Board": profile.xiiBoard,
        "12th Passing Year": profile.xiiPassingYear,
        "Formal Degree": profile.formalDegree,
        "Formal Institution": profile.formalInstitution,
        "Formal University": profile.formalUniversity,
        "Formal Passing Year": profile.formalPassingYear,
        "Professional Course": profile.professionalCourse,
        "Professional Institution": profile.professionalInstitution,
        "Professional University": profile.professionalUniversity,
        "Professional Passing Year": profile.professionalPassingYear,
      },
      Certifications: {
        "Figma Certified": profile.figmaCertified ? "Yes" : "No",
        "React Certified": profile.reactJsCertified ? "Yes" : "No",
      },
    };

    let y = 30;
    Object.entries(sections).forEach(([section, fields]) => {
      doc.setFontSize(14);
      doc.text(section, 20, y);
      y += 8;
      doc.setFontSize(12);
      Object.entries(fields).forEach(([label, value]) => {
        doc.text(`${label}: ${value || "-"}`, 25, y);
        y += 7;
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });
      y += 5;
    });

    doc.save(`${profile.user?.name || "profile"}.pdf`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">User Profiles</h2>
        <p className="text-muted-foreground">
          Manage user records and view detailed profile information.
        </p>
      </div>

      <div className="flex items-center max-w-md">
        <Input
          placeholder="Search name, email or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="overflow-x-auto">
        <CardContent className="p-0">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name || "-"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.profile?.primaryMobileNo || "-"}</TableCell>
                    <TableCell>{user.profile?.state || "-"}</TableCell>
                    <TableCell>
                      {user.profile?.totalExperienceYears
                        ? `${user.profile.totalExperienceYears} yrs`
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setSelectedProfile({ ...user.profile, user })}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl flex items-center gap-2">
                              <User className="w-5 h-5" /> Profile Details
                            </DialogTitle>
                          </DialogHeader>

                          <ProfileSections profile={selectedProfile} />

                          <div className="pt-4">
                            <Button
                              variant="outline"
                              onClick={() => handleDownloadPDF(selectedProfile)}
                              className="w-full"
                            >
                              <Download className="w-4 h-4 mr-2" /> Download Profile as PDF
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <p className="text-sm text-muted-foreground">
      <span className="font-medium text-foreground">{label}:</span>{" "}
      {value || "-"}
    </p>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4 space-y-2">
        {children}
      </div>
    </div>
  );
}

function ProfileSections({ profile }) {
  if (!profile) return null;
  return (
    <>
      <Section title="Contact Information" icon={<Phone className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Detail label="Name" value={profile.user?.name} />
          <Detail label="Email" value={profile.user?.email} />
          <Detail label="Primary Mobile" value={profile.primaryMobileNo} />
          <Detail label="Secondary Mobile" value={profile.secondaryMobileNo} />
          <Detail label="Personal Email" value={profile.personalEmail} />
          <Detail label="Work Email" value={profile.workEmail} />
          <Detail label="Website" value={profile.website} />
          <Detail label="Address" value={profile.address} />
          <Detail label="State" value={profile.state} />
          <Detail label="Pin Code" value={profile.pinCode} />
        </div>
      </Section>

      <Section title="Basic Details" icon={<BadgeCheck className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Detail label="Gender" value={profile.gender} />
          <Detail label="Date of Birth" value={new Date(profile.dateOfBirth).toLocaleDateString()} />
          <Detail label="Profession" value={profile.profession?.name} />
          <Detail label="Experience" value={profile.totalExperienceYears ? `${profile.totalExperienceYears} yrs` : "-"} />
          <Detail label="Employment Type" value={profile.employmentType} />
          <Detail label="Companies" value={profile.companies} />
          <Detail label="Freelancing Works" value={profile.freelancingWorks} />
          <Detail label="Job Description" value={profile.jobDescriptions} />
        </div>
      </Section>

      <Section title="Education" icon={<GraduationCap className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Detail label="10th Institution" value={profile.xInstitution} />
          <Detail label="10th Board" value={profile.xBoard} />
          <Detail label="10th Passing Year" value={profile.xPassingYear} />
          <Detail label="12th Institution" value={profile.xiiInstitution} />
          <Detail label="12th Board" value={profile.xiiBoard} />
          <Detail label="12th Passing Year" value={profile.xiiPassingYear} />
          <Detail label="Formal Degree" value={profile.formalDegree} />
          <Detail label="Formal Institution" value={profile.formalInstitution} />
          <Detail label="Formal University" value={profile.formalUniversity} />
          <Detail label="Formal Passing Year" value={profile.formalPassingYear} />
          <Detail label="Professional Course" value={profile.professionalCourse} />
          <Detail label="Professional Institution" value={profile.professionalInstitution} />
          <Detail label="Professional University" value={profile.professionalUniversity} />
          <Detail label="Professional Passing Year" value={profile.professionalPassingYear} />
        </div>
      </Section>

      <Section title="Certifications" icon={<BookText className="w-4 h-4" />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Detail label="Figma Certified" value={profile.figmaCertified ? "Yes" : "No"} />
          <Detail label="React Certified" value={profile.reactJsCertified ? "Yes" : "No"} />
        </div>
      </Section>
    </>
  );
}
