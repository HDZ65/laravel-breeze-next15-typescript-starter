"use client"

import { useAuth } from "@/hooks/auth"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./nav-switcher"
import { data } from "../data-dashboard"

/**
 * Barre latérale principale du dashboard
 * @param {React.ComponentProps<typeof Sidebar>} props - Les propriétés du composant
 * @returns {JSX.Element} La barre latérale
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth({ middleware: 'auth' })

  if (!user) return null

  return (
    <Sidebar 
      collapsible="icon" 
      {...props}
      role="navigation"
      aria-label="Navigation principale"
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
