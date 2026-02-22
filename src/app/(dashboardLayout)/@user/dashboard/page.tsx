import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const { data } = await userService.getSession();

	if (!data) redirect("/login");

	const isAdmin = data.user.role === Roles.admin;

	if (isAdmin) redirect("/admin-dashboard");

	// user landing
	return <div>User Dashboard</div>;
}
