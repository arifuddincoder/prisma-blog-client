"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	HomeIcon,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	projects: [
		{
			name: "User Dashboard",
			url: "/dashboard",
			icon: HomeIcon,
		},
		{
			name: "Admin Dashboard",
			url: "/admin-dashboard",
			icon: HomeIcon,
		},
		{
			name: "Analytics",
			url: "/dashboard/analytics",
			icon: PieChart,
		},
		{
			name: "Write Blog",
			url: "/dashboard/write-blog",
			icon: BookOpen,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			{/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
			<SidebarContent>
				{/* <NavMain items={data.navMain} /> */}
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
