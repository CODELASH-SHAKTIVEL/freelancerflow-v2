import { notFound } from "next/navigation";
import { getLead } from "@/actions/leads";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

/* ---------- server component: fetch once, then render UI ---------- */
export default async function LeadViewPage({
  params,
}) {
  const lead = await getLead(params.id).catch(() => null);
  if (!lead) notFound();

  return (
    <section className="flex flex-col gap-6 p-6 overflow-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold text-foreground">
        Lead&nbsp;Details
      </h1>

      {/* ① Person / Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Person &amp; Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
          <Item label="Person">{lead.personName}</Item>
          <Item label="Mobile">{lead.mobileNo}</Item>
          <Item label="Email">{lead.emailId}</Item>
          <Item label="Capacity">{lead.capacity}</Item>
          <Item label="Address" className="md:col-span-2">
            {lead.address}
          </Item>
          <Item label="Location">
            {lead.state}, {lead.country}
          </Item>
          <Item label="Pin Code">{lead.pinCode}</Item>
          <Item label="Department">{lead.department}</Item>
          <Item label="Designation">{lead.designation || "—"}</Item>
          <Item label="Client Type">{lead.clientType}</Item>
        </CardContent>
      </Card>

      {/* ② Company */}
      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
          <Item label="Name">{lead.companyName}</Item>
          <Item label="Contact">{lead.companyContact}</Item>
          <Item label="Email">{lead.companyEmail}</Item>
          <Item label="Website">{lead.companyWebsite}</Item>
          <Item label="Type">{lead.companyType}</Item>
          <Item label="Profession">{lead.companyProfession}</Item>
          <Item label="Previously Worked">
            {lead.previouslyWorked ? "Yes" : "No"}
          </Item>
          <Item label="Address" className="md:col-span-2">
            {lead.companyAddress}
          </Item>
          <Item label="Location">
            {lead.companyState}, {lead.companyCountry}
          </Item>
          <Item label="Pin Code">{lead.companyPinCode}</Item>
        </CardContent>
      </Card>

      {/* ③ Project & Status */}
      <Card>
        <CardHeader>
          <CardTitle>Project &amp; Lead Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
          <Item label="Lead Type">{lead.leadType}</Item>
          <Item label="Enquiry Type">{lead.enquiryType}</Item>
          <Item label="Project Type">{lead.projectType}</Item>
          <Item label="Action">{lead.action}</Item>
          <Item label="Status">{lead.status}</Item>
          <Item label="Lead Date">
            {lead.leadDate
              ? new Date(lead.leadDate).toLocaleDateString()
              : "—"}
          </Item>
          <Item label="Quote Date">
            {lead.quoteDate
              ? new Date(lead.quoteDate).toLocaleDateString()
              : "—"}
          </Item>
          <Item label="Job Main">{lead.jobMainCategory}</Item>
          <Item label="Job Sub">{lead.jobSubCategory}</Item>
          <Item label="Message" className="md:col-span-2">
            {lead.leadMessage}
          </Item>
          <Item label="Created">
            {new Date(lead.createdAt).toLocaleString()}
          </Item>
          <Item label="Updated">
            {new Date(lead.updatedAt).toLocaleString()}
          </Item>
        </CardContent>
      </Card>
    </section>
  );
}

/* ---------- small helper component for clean rows ----------------- */
function Item({
  label,
  children,
  className = "",
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium break-words">{children}</span>
    </div>
  );
}