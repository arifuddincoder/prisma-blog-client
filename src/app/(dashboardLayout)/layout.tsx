import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function DashboardLayout({
	children,
	admin,
	user: userSlot,
}: {
	children: React.ReactNode;
	admin: React.ReactNode;
	user: React.ReactNode;
}) {
	const { data } = await userService.getSession();
	const userInfo = data.user;
	if (!data) redirect("/login");

	const isAdmin = data.user.role === Roles.admin;

	return (
		<SidebarProvider>
			{/* ✅ session user পাঠাচ্ছি */}
			<AppSidebar user={userInfo} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<h1>Dashboard</h1>
						{/* <Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb> */}
					</div>
				</header>

				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
					{/* ✅ slot render */}
					{isAdmin ? admin : userSlot}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
