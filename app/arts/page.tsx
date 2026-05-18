import Link from "next/link"
import { MEDIA } from "@/lib/media"

export const metadata = {
    title: "Arts | Harshal Singh",
    description: "Original music and creative works.",
}

const TRACKS = [
    {
        id: "track-1",
        title: "I loved once it changed my name",
        year: "2024",
        duration: "3:16",
        url: MEDIA.featuredAudio,
    },
]

export default function ArtsPage() {
    return (
        <main className="research-page">
            <article className="research-article">

                <Link href="/" className="rp-backlink">&larr; back</Link>

                <header className="rp-header">
                    <h1 className="rp-title">Arts</h1>
                    <p className="rp-byline">Original music and creative works</p>
                    <p className="rp-date">{TRACKS.length} track{TRACKS.length === 1 ? "" : "s"}</p>
                </header>

                <hr className="rp-rule" />

                <section className="rp-section">
                    <dl className="rp-dl">
                        {TRACKS.map((t, i) => (
                            <div key={t.id} style={{ marginBottom: "1.5rem" }}>
                                <dt>
                                    <span className="rp-num">{String(i + 1).padStart(2, "0")}.</span>
                                    {t.title}
                                    <span className="rp-meta">
                                        {" "}&middot; {t.year} &middot; {t.duration}
                                    </span>
                                </dt>
                                <dd>
                                    <audio
                                        controls
                                        preload="metadata"
                                        src={t.url}
                                        style={{ width: "100%", marginTop: "0.5rem" }}
                                    >
                                        Your browser does not support the audio element.
                                    </audio>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

            </article>
        </main>
    )
}
