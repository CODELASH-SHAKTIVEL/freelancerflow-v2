// app/(protected)/leads/create/page.jsx

// "use client";
import React from "react";
import { LeadForm } from "../_components/leads-form"; // path may vary
export default async function CreateLeadPage({ searchParams }) {
  return (
    <div className="max-w-4xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">
           Create Lead
        </h1>
      </div>
      <LeadForm/>
    </div>
  );
}
