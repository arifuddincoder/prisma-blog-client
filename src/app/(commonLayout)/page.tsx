import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";

export default async function Home() {
	const { data } = await blogService.getBlogPosts();
	console.log(data);
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}
