"use client";

import { useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

function InvoicePreviewContent({ info, items, currency, subTotal, taxAmmount, discountAmmount, total }) {
  return (
    <div className="bg-white text-black p-6 space-y-6 rounded text-sm w-full">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-xl">{info.billFrom || "John Uberbacher"}</h2>
          <p className="text-gray-600 text-sm">Invoice #: {info.invoiceNumber || "N/A"}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-600">Amount Due</p>
          <h3 className="text-xl font-bold">{currency} {total}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <h4 className="font-semibold">Billed to:</h4>
          <p>{info.billTo}</p>
          <p>{info.billToAddress}</p>
          <p>{info.billToEmail}</p>
        </div>
        <div>
          <h4 className="font-semibold">Billed from:</h4>
          <p>{info.billFrom}</p>
          <p>{info.billFromAddress}</p>
          <p>{info.billFromEmail}</p>
        </div>
        <div>
          <h4 className="font-semibold">Date of Issue:</h4>
          <p>{info.dateOfIssue}</p>
        </div>
      </div>

      <table className="w-full border-t border-b text-left">
        <thead>
          <tr>
            <th className="py-2">Qty</th>
            <th>Description</th>
            <th className="text-right">Price</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="py-1">{item.quantity}</td>
              <td>{item.name} - {item.description}</td>
              <td className="text-right">{currency} {item.price}</td>
              <td className="text-right">{currency} {(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right space-y-1">
        <p>Subtotal: {currency} {subTotal}</p>
        {parseFloat(taxAmmount) !== 0.0 && <p>Tax: {currency} {taxAmmount}</p>}
        {parseFloat(discountAmmount) !== 0.0 && <p>Discount: {currency} {discountAmmount}</p>}
        <h4 className="font-bold mt-2">Total: {currency} {total}</h4>
      </div>

      {info.notes && (
        <div className="bg-gray-100 p-2 rounded text-sm mt-4">
          {info.notes}
        </div>
      )}
    </div>
  );
}

export default function InvoiceModal({ showModal, closeModal, info, items, currency, subTotal, taxAmmount, discountAmmount, total }) {
  const captureRef = useRef(null);

  const handleGeneratePDF = async () => {
    if (!captureRef.current) return;

    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#ffffff", // white background for dark mode compatibility
        useCORS: true,
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl w-full">
        <DialogTitle>Invoice Preview</DialogTitle>

        <div ref={captureRef}>
          <InvoicePreviewContent
            info={info}
            items={items}
            currency={currency}
            subTotal={subTotal}
            taxAmmount={taxAmmount}
            discountAmmount={discountAmmount}
            total={total}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleGeneratePDF} className="w-full sm:w-1/2">
            <BiPaperPlane className="mr-2 w-4 h-4" />
            Send Invoice
          </Button>
          <Button variant="outline" onClick={handleGeneratePDF} className="w-full sm:w-1/2">
            <BiCloudDownload className="mr-2 w-4 h-4" />
            Download Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
