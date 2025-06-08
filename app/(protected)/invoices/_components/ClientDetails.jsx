import { useContext } from "react";
import { State } from "@/context/stateContext";

export default function ClientDetails() {
  const state = useContext(State);
  const clientName = state?.clientName ?? "";
  const clientAddress = state?.clientAddress ?? "";

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{clientName}</h2>
        <p>{clientAddress}</p>
      </section>
    </>
  );
}