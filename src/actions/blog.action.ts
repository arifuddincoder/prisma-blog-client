"use server";

import { blogService } from "@/services/blog.service";
import { BlogData } from "@/types/blog.data";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
	return await blogService.getBlogPosts();
};

export const createBlogPost = async (data: BlogData) => {
	const res = await blogService.createBlogPost(data);
	updateTag("blogPosts");
	return res;
};
