import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Generates and downloads the invoice as a PDF.
 * @param {object} invoice - Invoice data (used for filename).
 */
export async function generateInvoicePDF(invoice) {
  const element = document.getElementById("invoice-content");
  if (!element) {
    console.error("Invoice content not found for PDF generation.");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    const x = (pageWidth - imgWidth) / 2;
    const y = 20;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save(`Invoice-${invoice.invoiceNumber || "download"}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
