"use client";

import * as React from "react";
import {
  Store,
  Gamepad2,
  MessageCircle,
  Users,
  GraduationCap,
  Bot,
  Wand2,
  Handshake,
  MapPin,
  Trophy,
  DollarSign,
  Building,
  TrendingUp,
  Lightbulb,
  BarChart3,
  FileCheck,
  Home,
  Briefcase,
  Target,
  GalleryVerticalEnd,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Features organized by user journey and ease of use
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
          icon: Target,
        },
      ],
    },
    {
      title: "Business Setup",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Idea Generator",
          url: "/business-setup/idea-generator",
          icon: Lightbulb,
        },
        {
          title: "Design Generator",
          url: "/business-setup/design-generator",
          icon: Wand2,
        },
        {
          title: "Pricing Predictor",
          url: "/business-setup/pricing-predictor",
          icon: BarChart3,
        },
        {
          title: "Store Builder",
          url: "/business-setup/store-builder",
          icon: Store,
        },
      ],
    },

    {
      title: "Community",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Partner Matching",
          url: "/community/partner-matching",
          icon: Handshake,
        },
        {
          title: "Events",
          url: "/community/events",
          icon: MapPin,
        },
        {
          title: "Leaderboard",
          url: "/community/leaderboard",
          icon: Trophy,
        },
      ],
    },
    {
      title: "Growth & Funding",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Investor Hub",
          url: "/growth-funding/investors",
          icon: Building,
        },
        {
          title: "Schemes",
          url: "/growth-funding/schemes",
          icon: FileCheck,
        },
        {
          title: "Success Score",
          url: "/growth-funding/success-score",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "Learning Hub",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Gamified Courses",
          url: "/learning/courses",
          icon: Gamepad2,
        },
        {
          title: "AI Mentor",
          url: "/learning/ai-mentor",
          icon: Bot,
        },
        {
          title: "Community",
          url: "/learing/community",
          icon: MessageCircle,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">SheCan</span>
                  <span className="">Empowering Women</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="bg-main text-foreground"
                >
                  <h1 className="font-medium">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </h1>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`hover:bg-main/80 transition-colors text-foreground duration-200 ${
                              isActive ? "bg-main/80" : ""
                            }`}
                          >
                            <Link
                              href={subItem.url}
                              className="flex items-center gap-2"
                            >
                              {subItem.icon && (
                                <subItem.icon className="size-4" />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-foreground/70">Theme</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
