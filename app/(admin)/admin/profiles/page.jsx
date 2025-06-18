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
import { Download } from "lucide-react";
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

    const fields = {
      Name: profile.user?.name,
      Email: profile.user?.email,
      "Primary Mobile": profile.primaryMobileNo,
      State: profile.state,
      Experience: profile.totalExperienceYears
        ? `${profile.totalExperienceYears} yrs`
        : "-",
      "Employment Type": profile.employmentType ?? "-",
    };

    let y = 40;
    Object.entries(fields).forEach(([label, value]) => {
      doc.text(`${label}: ${value}`, 20, y);
      y += 10;
    });

    doc.save(`${profile.user?.name || "profile"}.pdf`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">User Profiles</h2>
        <p className="text-muted-foreground">
          Manage user records and view detailed profile information.
        </p>
      </div>

      {/* Search input */}
      <div className="flex items-center max-w-md">
        <Input
          placeholder="Search name, email or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
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
                            onClick={() =>
                              setSelectedProfile({ ...user.profile, user })
                            }
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Profile Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 text-sm">
                            <Detail label="Name" value={selectedProfile?.user?.name} />
                            <Detail label="Email" value={selectedProfile?.user?.email} />
                            <Detail
                              label="Primary Mobile"
                              value={selectedProfile?.primaryMobileNo}
                            />
                            <Detail
                              label="Secondary Mobile"
                              value={selectedProfile?.secondaryMobileNo}
                            />
                            <Detail
                              label="Personal Email"
                              value={selectedProfile?.personalEmail}
                            />
                            <Detail
                              label="Work Email"
                              value={selectedProfile?.workEmail}
                            />
                            <Detail
                              label="Address"
                              value={selectedProfile?.address}
                            />
                            <Detail label="State" value={selectedProfile?.state} />
                            <Detail label="Gender" value={selectedProfile?.gender} />
                            <Detail
                              label="Experience"
                              value={
                                selectedProfile?.totalExperienceYears
                                  ? `${selectedProfile.totalExperienceYears} yrs`
                                  : "-"
                              }
                            />
                            <Detail
                              label="Employment Type"
                              value={selectedProfile?.employmentType}
                            />
                            <Detail
                              label="Companies"
                              value={selectedProfile?.companies}
                            />
                            <Detail
                              label="Freelancing"
                              value={selectedProfile?.freelancingWorks}
                            />
                            <Detail
                              label="Figma Certified"
                              value={selectedProfile?.figmaCertified ? "Yes" : "No"}
                            />
                            <Detail
                              label="React Certified"
                              value={selectedProfile?.reactJsCertified ? "Yes" : "No"}
                            />
                            <Button
                              variant="outline"
                              className="mt-4"
                              onClick={() => handleDownloadPDF(selectedProfile)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
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

// 🔹 Small helper component for cleaner detail rendering
function Detail({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value || "-"}
    </p>
  );
}
