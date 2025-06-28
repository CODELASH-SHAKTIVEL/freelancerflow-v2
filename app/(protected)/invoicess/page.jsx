"use client";

import { FileText, FilePlus2 } from "lucide-react";
import InvoiceForm from "./_components/InvoiceForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function InvoicePage() {
  return (
    <section className="w-full min-h-screen bg-background text-foreground py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-md border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-xl font-semibold">Create Invoice</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Fill in the invoice details carefully.
                </CardDescription>
              </div>
            </div>
            <FilePlus2 className="h-6 w-6 text-muted-foreground" />
          </CardHeader>

          {/* Form Section */}
          <CardContent>
            <InvoiceForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
