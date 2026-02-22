import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";
import { redirect } from "next/navigation";

export default async function dashboardLayout({
	children,
	admin,
	user,
}: {
	children: React.ReactNode;
	admin: React.ReactNode;
	user: React.ReactNode;
}) {
	const { data } = await userService.getSession();

	if (!data) redirect("/login");

	const isAdmin = data.user.role === Roles.admin;

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
					{isAdmin ? admin : user}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
