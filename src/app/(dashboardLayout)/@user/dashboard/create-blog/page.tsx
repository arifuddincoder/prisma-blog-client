import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import CreateBlogFromServer from "@/components/modules/user/createBlog/CreateBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.type";

export default async function CreateBlogPage() {
	const { data } = await blogService.getBlogPosts();
	return (
		<div>
			{/* <CreateBlogFromServer /> */}
			<CreateBlogFormClient />
			{data?.data?.map((item: BlogPost) => (
				<h2 key={item.id}>{item.title}</h2>
			))}
		</div>
	);
}
