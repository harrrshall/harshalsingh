import { getAllPosts } from "@/lib/posts";
import WritingList from "./WritingList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Writing | Harshal Singh",
    description: "Thoughts, essays, and experiments.",
};

export default function WritingPage() {
    const posts = getAllPosts();
    return <WritingList posts={posts} />;
}
