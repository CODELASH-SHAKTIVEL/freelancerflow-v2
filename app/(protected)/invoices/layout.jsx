// app/invoice/layout.tsx
import React from "react";
import StateContext from "@/context/stateContext"; // adjust the path as needed

export default function InvoiceLayout({ children }) {
  return (
    <StateContext>
      {children}
    </StateContext>
  );
}
