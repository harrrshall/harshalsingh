import Link from "next/link"
import { calculateProgress, getSectionsWithStatus, getCurrentBook } from "@/lib/physics"

export const metadata = {
    title: "Physics | Harshal Singh",
    description: "Self-study progress log: a multi-year program in physics.",
}

export default function PhysicsPage() {
    const progress = calculateProgress()
    const sections = getSectionsWithStatus()
    const currentBook = getCurrentBook()

    return (
        <main className="research-page">
            <article className="research-article">

                <Link href="/" className="rp-backlink">&larr; back</Link>

                <header className="rp-header">
                    <h1 className="rp-title">Physics</h1>
                    <p className="rp-byline">Self-study progress log</p>
                    <p className="rp-date">Last updated {progress.lastUpdated || "—"}</p>
                </header>

                <section className="rp-abstract">
                    <h2 className="rp-abstract-label">Progress</h2>
                    <p>
                        <strong>{progress.percentage.toFixed(1)}%</strong> through the roadmap
                        ({progress.completedCount} of {progress.totalCount} sections complete).
                        {progress.currentSection ? (
                            <> Currently working on <em>{progress.currentSection}</em>
                                {progress.currentTopic ? <> &mdash; {progress.currentTopic}</> : null}.</>
                        ) : null}
                    </p>
                </section>

                <hr className="rp-rule" />

                {currentBook ? (
                    <section className="rp-section">
                        <h2 className="rp-section-title"><span className="rp-num">1.</span> Currently reading</h2>
                        <p>
                            <strong>{currentBook.title}</strong>
                            {currentBook.authors ? <span className="rp-meta"> &middot; {currentBook.authors}</span> : null}
                            {currentBook.edition ? <span className="rp-meta"> &middot; {currentBook.edition}</span> : null}
                        </p>
                        {currentBook.whyRecommended ? (
                            <p className="rp-meta-line">{currentBook.whyRecommended}</p>
                        ) : null}
                    </section>
                ) : null}

                <hr className="rp-rule" />

                <section className="rp-section">
                    <h2 className="rp-section-title"><span className="rp-num">2.</span> Roadmap</h2>
                    <dl className="rp-dl">
                        {sections.map((s) => (
                            <div key={s.id}>
                                <dt>
                                    <span className="rp-num">{s.id}</span>
                                    {s.title}
                                    <span className="rp-meta">
                                        {" "}&middot; {s.status === "completed"
                                            ? "complete"
                                            : s.status === "current"
                                                ? "in progress"
                                                : "upcoming"}
                                    </span>
                                </dt>
                            </div>
                        ))}
                    </dl>
                </section>

            </article>
        </main>
    )
}
