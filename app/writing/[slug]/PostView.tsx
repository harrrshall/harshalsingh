'use client'

import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import type { Post } from "@/lib/posts"
import BackLink from "../BackLink"

export default function PostView({ post }: { post: Post }) {
    return (
        <main className="research-page">
            <article className="research-article">

                <BackLink fallbackHref="/writing">&larr; back to writing</BackLink>

                <header className="rp-header">
                    <p className="rp-date">
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <h1 className="rp-title">{post.title}</h1>
                    {post.excerpt ? <p className="rp-byline">{post.excerpt}</p> : null}
                </header>

                <hr className="rp-rule" />

                <div className="rp-post-body">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                <hr className="rp-rule" />

                <footer className="rp-footer">
                    <p>
                        <Link href="/writing" className="rp-arrow-link">&larr; back to writing</Link>
                        {" "}&middot;{" "}
                        <Link href="/" className="rp-arrow-link">home</Link>
                    </p>
                </footer>

            </article>
        </main>
    )
}
