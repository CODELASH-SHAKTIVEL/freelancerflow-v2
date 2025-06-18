import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  User,
  Gavel,
  ListChecks,
} from "lucide-react"; // Lucide icons

// Updated nav data with icons
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Profiles",
          url: "/admin/profiles",
          icon: <User className="w-5 h-5 mr-2" />,
        },
        {
          title: "Bidding & Tenders",
          url: "/admin/bidding-tenders",
          icon: <Gavel className="w-5 h-5 mr-2" />,
        },
        {
          title: "Dropdowns",
          url: "/admin/dropdowns",
          icon: <ListChecks className="w-5 h-5 mr-2" />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-primary">
            FreelancerFlow
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-base font-semibold text-muted-foreground px-2 mb-1">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center text-base font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
                      >
                        {item.icon}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
