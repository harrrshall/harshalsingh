import Link from "next/link"
import type { Post } from "@/lib/posts"
import BackLink from "./BackLink"

export default function WritingList({ posts }: { posts: Post[] }) {
    return (
        <main className="research-page">
            <article className="research-article">

                <BackLink fallbackHref="/">&larr; back</BackLink>

                <header className="rp-header">
                    <h1 className="rp-title">Writing</h1>
                    <p className="rp-byline">Essays on work, love, philosophy, and future tech</p>
                    <p className="rp-date">{posts.length} essay{posts.length === 1 ? "" : "s"}</p>
                </header>

                <hr className="rp-rule" />

                <section className="rp-section">
                    <ol className="rp-writing-list">
                        {posts.map((post, i) => (
                            <li key={post.slug} className="rp-writing-item">
                                <div className="rp-writing-head">
                                    <span className="rp-writing-num">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <Link
                                        href={`/writing/${post.slug}`}
                                        className="rp-writing-title"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                                <div className="rp-writing-date">
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                {post.excerpt && (
                                    <p className="rp-writing-excerpt">{post.excerpt}</p>
                                )}
                            </li>
                        ))}
                    </ol>
                </section>

            </article>
        </main>
    )
}
