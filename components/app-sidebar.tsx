"use client";

import * as React from "react";
import {
  Archive,
  Banknote,
  BookOpen,
  Bot,
  Command,
  Frame,
  HandCoins,
  House,
  LayoutGrid,
  LifeBuoy,
  Map,
  PieChart,
  ScrollText,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Navigation } from "./navigation";
import Image from "next/image";

const navigations = [
  {
    name: "Dashboard",
    url: "/dashboard/",
    icon: House,
  },
  {
    name: "Produk",
    url: "/dashboard/products",
    icon: LayoutGrid,
  },
  {
    name: "Inventori",
    url: "/dashboard/inventory",
    icon: Archive,
  },
  {
    name: "Pembelian",
    url: "/dashboard/purchase",
    icon: HandCoins,
  },
  {
    name: "Penjualan",
    url: "/dashboard/sales",
    icon: Banknote,
  },
  {
    name: "Histori Transaksi",
    url: "/dashboard/transactions",
    icon: ScrollText,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="aspect-square size-5"
                  />
                  {/* <Command className="size-4" /> */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Antam Manager</span>
                  <span className="truncate text-xs">
                    Inventory Management System
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Navigation navigations={navigations} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
