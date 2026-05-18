import { getPostBySlug, getAllPosts } from "@/lib/posts";
import PostView from "./PostView";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return { title: 'Post Not Found' }
    }
    return {
        title: `${post.title} | Harshal Singh`,
        description: post.excerpt,
    }
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <PostView post={post} />;
}
