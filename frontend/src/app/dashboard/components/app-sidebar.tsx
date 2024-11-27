"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
// import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./nav-switcher"
import { useAuth } from "@/hooks/auth"


// This is sample data.
const data = {

  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Gratuit",
    },
  ],
  navMain: [
    {
      title: "Espace de travail",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Historique",
          url: "#",
        },
        {
          title: "Favoris",
          url: "#",
        },
        {
          title: "Paramètres",
          url: "#",
        },
      ],
    },
    {
      title: "Modèles",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorateur",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Premiers pas",
          url: "#",
        },
        {
          title: "Tutoriels",
          url: "#",
        },
        {
          title: "Notes de version",
          url: "#",
        },
      ],
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Général",
          url: "#",
        },
        {
          title: "Équipe",
          url: "#",
        },
        {
          title: "Facturation",
          url: "#",
        },
        {
          title: "Limites",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design & Ingénierie",
      url: "#",
      icon: Frame,
    },
    {
      name: "Ventes & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Voyages",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
