"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import { DollarSign, CalendarDays, FileText, Mail, Building2 } from "lucide-react";

export default function InvoiceForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");

  const [items, setItems] = useState([
    { id: 0, name: "", description: "", price: "1.00", quantity: 1 },
  ]);

  useEffect(() => {
    handleCalculateTotal();
  }, [items, taxRate, discountRate]);

  const handleCalculateTotal = () => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += parseFloat(item.price || 0) * parseInt(item.quantity || 0);
    });
    subTotal = parseFloat(subTotal).toFixed(2);
    setSubTotal(subTotal);

    const tax = parseFloat(subTotal * (taxRate / 100)).toFixed(2);
    setTaxAmount(tax);

    const discount = parseFloat(subTotal * (discountRate / 100)).toFixed(2);
    setDiscountAmount(discount);

    const total = (parseFloat(subTotal) - parseFloat(discount) + parseFloat(tax)).toFixed(2);
    setTotal(total);
  };

  const handleAddItem = () => {
    const id = Date.now();
    setItems([...items, { id, name: "", description: "", price: "1.00", quantity: 1 }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, name, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      <Card className="p-6 md:p-10 bg-background text-foreground w-full shadow-md">
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Date:</p>
            <p className="font-medium">{currentDate}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dateOfIssue">Due Date</Label>
            <Input
              id="dateOfIssue"
              type="date"
              value={dateOfIssue}
              onChange={(e) => setDateOfIssue(e.target.value)}
              required
              className="max-w-[150px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="invoiceNumber">Invoice #</Label>
            <Input
              id="invoiceNumber"
              type="number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              min="1"
              required
              className="max-w-[100px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <Label className="mb-2 block">Bill To</Label>
            <Input placeholder="Name" value={billTo} onChange={(e) => setBillTo(e.target.value)} required className="mb-4" />
            <Input type="email" placeholder="Email" value={billToEmail} onChange={(e) => setBillToEmail(e.target.value)} required className="mb-4" />
            <Input placeholder="Address" value={billToAddress} onChange={(e) => setBillToAddress(e.target.value)} required />
          </div>
          <div>
            <Label className="mb-2 block">Bill From</Label>
            <Input placeholder="Name" value={billFrom} onChange={(e) => setBillFrom(e.target.value)} required className="mb-4" />
            <Input type="email" placeholder="Email" value={billFromEmail} onChange={(e) => setBillFromEmail(e.target.value)} required className="mb-4" />
            <Input placeholder="Address" value={billFromAddress} onChange={(e) => setBillFromAddress(e.target.value)} required />
          </div>
        </div>

        <InvoiceItem
          items={items}
          currency={currency}
          onAdd={handleAddItem}
          onRemove={handleRemoveItem}
          onChange={handleItemChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="space-y-4">
            <div>
              <Label htmlFor="currency" className="mb-2 block">Currency</Label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md shadow-sm"
              >
                <option value="$">USD ($)</option>
                <option value="£">GBP (£)</option>
                <option value="¥">JPY (¥)</option>
                <option value="₿">BTC (₿)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="taxRate" className="mb-2 block">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="0.00"
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="discountRate" className="mb-2 block">Discount Rate (%)</Label>
              <Input
                id="discountRate"
                type="number"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
                placeholder="0.00"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground bg-muted p-4 rounded-md">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{currency}{subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({taxRate || 0}%):</span>
              <span>{currency}{taxAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount ({discountRate || 0}%):</span>
              <span>{currency}{discountAmount}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total:</span>
              <span>{currency}{total}</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Label htmlFor="notes" className="mb-2 block">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Thanks for your business!"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <Button type="submit" className="w-full">Review Invoice</Button>
        </div>
      </Card>

      <InvoiceModal
        showModal={isOpen}
        closeModal={() => setIsOpen(false)}
        info={{
          dateOfIssue,
          invoiceNumber,
          billTo,
          billToEmail,
          billToAddress,
          billFrom,
          billFromEmail,
          billFromAddress,
          notes
        }}
        items={items}
        currency={currency}
        subTotal={subTotal}
        taxAmount={taxAmount}
        discountAmount={discountAmount}
        total={total}
      />
    </form>
  );
}
