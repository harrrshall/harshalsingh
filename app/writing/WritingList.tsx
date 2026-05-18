import Link from "next/link"
import type { Post } from "@/lib/posts"

export default function WritingList({ posts }: { posts: Post[] }) {
    return (
        <main className="research-page">
            <article className="research-article">

                <Link href="/" className="rp-backlink">&larr; back</Link>

                <header className="rp-header">
                    <h1 className="rp-title">Writing</h1>
                    <p className="rp-byline">Essays on work, love, philosophy, and future tech</p>
                    <p className="rp-date">{posts.length} essay{posts.length === 1 ? "" : "s"}</p>
                </header>

                <hr className="rp-rule" />

                <section className="rp-section">
                    <dl className="rp-dl">
                        {posts.map((post, i) => (
                            <div key={post.slug}>
                                <dt>
                                    <span className="rp-num">
                                        {String(i + 1).padStart(2, "0")}.
                                    </span>
                                    <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                                    <span className="rp-meta">
                                        {" "}&middot;{" "}
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </dt>
                                <dd>{post.excerpt}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

            </article>
        </main>
    )
}
