'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
    Users,
    Calendar,
    FileText,
    FileSearch,
    FolderKanban,
    Layers,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { HeroHeader } from '@/components/main-header';
import {HowItWorksSection} from '@/components/marquee';

const steps = [
  {
    title: "1. Create Your Freelancer Profile",
    desc: "Sign up and set up a professional profile showcasing your services, expertise, and availability. Personalize your dashboard to match your workflow.",
  },
  {
    title: "2. Add Clients and Manage Relationships",
    desc: "Easily onboard clients, track communication history, and centralize contact details — no more scattered spreadsheets or email chains.",
  },
  {
    title: "3. Plan Your Work with the Scheduler",
    desc: "Use the integrated calendar to organize meetings, set task deadlines, and visualize project milestones in one streamlined view.",
  },
  {
    title: "4. Send Bids and Win Projects",
    desc: "Browse tender opportunities, submit competitive proposals, and manage all your bids from one powerful interface.",
  },
  {
    title: "5. Manage Tasks & Team Collaboration",
    desc: "Break projects into tasks, assign responsibilities to team members, and track progress collaboratively using Kanban views or lists.",
  },
  {
    title: "6. Store Files & Share Securely",
    desc: "Upload and organize your project assets, contracts, and resources in structured folders — accessible anytime, anywhere.",
  },
  {
    title: "7. Generate Invoices and Get Paid Fast",
    desc: "Create branded invoices with pre-filled data and send them directly to clients. Track payment status and integrate with Stripe or bank transfers.",
  },
  {
    title: "8. Analyze Your Business Performance",
    desc: "Access dashboards for income, clients, and project health to make informed decisions and scale your freelance business efficiently.",
  },
];


const testimonials = [
    {
        name: "Aarav Shah",
        role: "UI/UX Designer",
        quote:
            "FreelancerFlow helped me manage clients and get paid faster. The invoice generator alone is worth it!",
    },
    {
        name: "Mei Tanaka",
        role: "Web Developer",
        quote:
            "The scheduler and team task tools are 🔥. My team loves it, and we're far more productive.",
    },
    {
        name: "Daniel Smith",
        role: "Project Consultant",
        quote:
            "I no longer need 4 different apps. FreelancerFlow combines everything in one clean dashboard.",
    },
];

const features = [
    {
        icon: Users,
        title: "Client Management",
        desc: "Track contacts, history, and communication in one place.",
    },
    {
        icon: Calendar,
        title: "Scheduler",
        desc: "Plan meetings, deadlines, and milestones effortlessly.",
    },
    {
        icon: FileText,
        title: "Invoice Generator",
        desc: "Create professional invoices in seconds and get paid faster.",
    },
    {
        icon: FileSearch,
        title: "Bids & Tenders",
        desc: "Submit proposals and manage contract opportunities.",
    },
    {
        icon: Layers,
        title: "Team & Task Management",
        desc: "Delegate work, assign roles, and monitor progress.",
    },
    {
        icon: FolderKanban,
        title: "Files & Folders",
        desc: "Centralized document storage and sharing for your team.",
    },
];


const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
};

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
                >
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>

                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { type: 'spring', bounce: 0.3, duration: 2 },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20"
                        >
                            <Image
                                src="/next.svg"
                                alt="background"
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>

                        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />

                        <div className="mx-auto max-w-7xl px-6 text-center sm:mx-auto lg:mr-auto">
                            <AnimatedGroup variants={transitionVariants}>
                                <Link
                                    href="#link"
                                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                                >
                                    <span className="text-foreground text-sm">New: Bids & Team Scheduler</span>
                                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700" />
                                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedGroup>

                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]"
                            >
                                The All-in-One Toolkit for Freelancers & Teams
                            </TextEffect>

                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                            >
                                Manage clients, schedule work, send invoices, win bids, collaborate with teams, and stay organized—all from one dashboard.
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                            >
                                <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                                        <Link href="#get-started">
                                            <span className="text-nowrap">Try FreelancerFlow</span>
                                        </Link>
                                    </Button>
                                </div>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-10.5 rounded-xl px-5"
                                >
                                    <Link href="#demo">
                                        <span className="text-nowrap">See it in action</span>
                                    </Link>
                                </Button>
                            </AnimatedGroup>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}
                        >
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <Image
                                        className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                                        src="/Freelancers-dash.jpg"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                    <Image
                                        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                                        src="/Freelancers-dash.jpg"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>

                <section className="bg-background py-24">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Everything You Need to Run Your Freelance Business
                        </h2>
                        <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
                            From managing clients to closing deals and organizing your projects —
                            FreelancerFlow gives you the tools to stay ahead.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map(({ icon: Icon, title, desc }, i) => (
                                <div
                                    key={i}
                                    className="relative overflow-hidden rounded-2xl border border-border/40 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-lg shadow-xl transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl"
                                >
                                    <div className="p-6">
                                        <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-muted p-3 ring-1 ring-border/10">
                                            <Icon className="size-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                        <p className="text-muted-foreground text-sm">{desc}</p>
                                    </div>
                                    <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <HowItWorksSection/> */}
                <section className="bg-background py-24">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-16">What Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((t, i) => (
                                <Card key={i} className="bg-muted/30">
                                    <CardHeader className="italic text-sm">“{t.quote}”</CardHeader>
                                    <CardFooter className="text-sm font-semibold">
                                        {t.name} <span className="text-muted-foreground"> — {t.role}</span>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="bg-background border-t py-6 text-sm text-muted-foreground text-center bg-muted/50 py-24">
                    {/* subtle background glow, also works in dark mode */}
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-primary/60 to-primary/80 dark:from-zinc-900/30 dark:via-primary/50 dark:to-primary/80 opacity-30 blur-2xl pointer-events-none" />

                    <div className="max-w-2xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to supercharge your freelance workflow?
                        </h2>
                        <p className="text-white/80 dark:text-white/70 mb-8">
                            Join thousands of freelancers using <span className="font-semibold">FreelancerFlow</span> to save time and get paid faster.
                        </p>

                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="text-base px-6 rounded-xl shadow-md hover:shadow-lg transition bg-white text-primary hover:bg-muted dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                        >
                            <Link href="/register">Create Free Account</Link>
                        </Button>
                    </div>
                </section>
                <footer className="bg-background border-t py-6 text-sm text-muted-foreground text-center">
                    <div className="max-w-7xl mx-auto px-4">© {new Date().getFullYear()} FreelancerFlow. All rights reserved.</div>
                </footer>
            </main>
        </>
    );
}
