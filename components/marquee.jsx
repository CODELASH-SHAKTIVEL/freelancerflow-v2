'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

const steps = [
  { title: "Create Your Freelancer Profile", desc: "Set up a professional profile..." },
  { title: "Manage Clients in One Place", desc: "Track communication and manage contacts..." },
  { title: "Plan Projects with Scheduler", desc: "Schedule meetings, tasks, and milestones..." },
  { title: "Send Bids & Win Projects", desc: "Submit proposals and manage contracts..." },
  { title: "Track Tasks & Collaborate", desc: "Assign tasks and track progress with your team..." },
  { title: "Store Files & Documents", desc: "Upload and organize your project files..." },
  { title: "Generate Invoices & Get Paid", desc: "Create and track branded invoices easily..." },
  { title: "Analyze Business Performance", desc: "View KPIs and insights from dashboards..." },
];

export function HowItWorksSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollX = 0;
    let frameId;

    const animateScroll = () => {
      scrollX += 0.5;
      el.scrollLeft = scrollX;
      if (scrollX >= el.scrollWidth / 2) {
        scrollX = 0;
      }
      frameId = requestAnimationFrame(animateScroll);
    };

    frameId = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative bg-muted/50 py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
          All the tools you need to run your freelance business — in one unified workspace.
        </p>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {[...steps, ...steps].map((step, i) => (
            <Card
              key={i}
              className="min-w-[300px] max-w-sm flex-shrink-0 group border-muted hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <CardHeader>
                <div className="text-4xl font-bold text-primary group-hover:scale-110 transition duration-300">
                  {(i % steps.length) + 1}
                </div>
                <CardTitle className="mt-2 text-lg group-hover:text-primary transition-colors">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
