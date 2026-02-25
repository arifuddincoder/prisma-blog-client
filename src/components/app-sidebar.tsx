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
import { Route } from "@/types/routes.type";
import { Roles } from "@/constants/roles";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "",
	},
};

export const adminRoutes = [
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
];

export const userRoutes = [
	{
		name: "User Dashboard",
		url: "/dashboard",
		icon: HomeIcon,
	},
	{
		name: "Create Blog",
		url: "/dashboard/create-blog",
		icon: BookOpen,
	},
];

export function AppSidebar({ user, ...props }: { user: { role: string } & React.ComponentProps<typeof Sidebar> }) {
	let routes: Route[] = [];

	switch (user.role) {
		case Roles.admin:
			routes = adminRoutes;
			break;
		case Roles.user:
			routes = userRoutes;
			break;
		default:
			routes = [];
			break;
	}

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<NavProjects projects={routes} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
