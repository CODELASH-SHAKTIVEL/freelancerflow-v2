"use client";

import { useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { State } from "@/context/stateContext";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ClientDetails from "./_components/ClientDetails";
import Dates from "./_components/Dates";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import MainDetails from "./_components/MainDetails";
import Notes from "./_components/Notes";
import Table from "./_components/Table";
import TableForm from "./_components/TableForm";

export default function App() {
    const context = useContext(State);
    if (!context) return null;

    const {
        name,
        setName,
        address,
        setAddress,
        email,
        setEmail,
        phone,
        setPhone,
        bankName,
        setBankName,
        bankAccount,
        setBankAccount,
        website,
        setWebsite,
        clientName,
        setClientName,
        clientAddress,
        setClientAddress,
        invoiceNumber,
        setInvoiceNumber,
        invoiceDate,
        setInvoiceDate,
        dueDate,
        setDueDate,
        notes,
        setNotes,
        componentRef,
    } = context;

    const handlePrint = useReactToPrint({
        // content: () => componentRef.current,
        documentTitle: "invoice",
    });

    return (
        <main className="max-w-7xl mx-auto p-6 xl:grid xl:grid-cols-2 xl:gap-16">

            <section className="space-y-8">
                {/* Your Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col mb-6">
                            <Label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="address" className="mb-2 text-sm font-medium text-gray-700">
                                Address
                            </Label>
                            <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="123 Main St"
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="website" className="mb-2 text-sm font-medium text-gray-700">
                                Website
                            </Label>
                            <Input
                                id="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="yourcompany.com"
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-700">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 1234567890"
                                className="p-3"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Bank Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Bank Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col mb-6">
                            <Label htmlFor="bankName" className="mb-2 text-sm font-medium text-gray-700">
                                Bank Name
                            </Label>
                            <Input
                                id="bankName"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="bankAccount" className="mb-2 text-sm font-medium text-gray-700">
                                Account Number
                            </Label>
                            <Input
                                id="bankAccount"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)}
                                className="p-3"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Client Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Client Information</CardTitle>
                        <CardDescription>Details about your client</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col mb-6">
                            <Label htmlFor="clientName" className="mb-2 text-sm font-medium text-gray-700">
                                Client Name
                            </Label>
                            <Input
                                id="clientName"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="clientAddress" className="mb-2 text-sm font-medium text-gray-700">
                                Client Address
                            </Label>
                            <Input
                                id="clientAddress"
                                value={clientAddress}
                                onChange={(e) => setClientAddress(e.target.value)}
                                className="p-3"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Invoice Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Invoice Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col mb-6">
                            <Label htmlFor="invoiceNumber" className="mb-2 text-sm font-medium text-gray-700">
                                Invoice Number
                            </Label>
                            <Input
                                id="invoiceNumber"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="invoiceDate" className="mb-2 text-sm font-medium text-gray-700">
                                Invoice Date
                            </Label>
                            <Input
                                type="date"
                                id="invoiceDate"
                                value={invoiceDate}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                                className="p-3"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Label htmlFor="dueDate" className="mb-2 text-sm font-medium text-gray-700">
                                Due Date
                            </Label>
                            <Input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="p-3"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Invoice Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Invoice Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TableForm />
                    </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <Label htmlFor="notes" className="mb-2 text-sm font-medium text-gray-700">
                                Additional Notes
                            </Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any additional message for the client..."
                                rows={4}
                                className="p-3"
                            />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* PREVIEW SECTION */}
            <section className="space-y-6 mt-8 xl:mt-0">
                <Card className="p-6 shadow-lg">
                    <div className="flex justify-end mb-6">
                        <Button onClick={handlePrint}>Print / Download</Button>
                    </div>
                    <div ref={componentRef} className="space-y-6">
                        <Header />
                        <MainDetails />
                        <ClientDetails />
                        <Dates />
                        <Table />
                        <Notes />
                        <Footer />
                    </div>
                </Card>
            </section>
        </main>
    );
}
