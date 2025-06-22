"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconUsers,
  IconCurrencyDollar,
  IconCalendarTime,
} from "@tabler/icons-react"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
// import { SidebarOptInForm } from "@/components/sidebar-opt-in-form"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Icon } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon:IconDashboard,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: IconListDetails,
    },
    {
      title: "Leads",
      url: "/leads",
      icon: IconUsers,
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: IconFolder,
    },
    {
      title: "Financials",
      url: "/financials",
      icon: IconCurrencyDollar,
    },
    {
      title: "Scheduler",
      url: "/scheduler",
      icon: IconCalendarTime,
    },
    {
      title: "Promotional materials",
      url: "/promotional-materials",
      icon: IconFileAi,
    },
    {
      title: "Files & documents",
      url: "/files",
      icon: IconFileWord,
    },
    {
      title: "Bids",
      url: "/bidding-tenders",
      icon: IconFileDescription,
    },
    {
      title: "Tenders",
      url: "/tenders",
      icon: IconFileDescription,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: IconCurrencyDollar,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "My Organization",
      url: "/onboarding",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">FreelancerFlow Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          {/* <SidebarOptInForm /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
