import { useContext } from "react";
import { State } from "@/context/stateContext";

export default function MainDetails() {
  const state = useContext(State);

  return (
    <>
      <section className="flex flex-col items-end justify-end">
        <h2 className="font-bold text-3xl uppercase mb-1">{state?.name ?? ""}</h2>
        <p>{state?.address ?? ""}</p>
      </section>
    </>
  );
}