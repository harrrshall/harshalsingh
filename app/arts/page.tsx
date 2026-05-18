import Link from "next/link"
import { MEDIA } from "@/lib/media"
import { LyricsPlayer } from "@/components/lyrics-player"
import { LYRICS_BY_TRACK } from "@/content/lyrics"

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

                {TRACKS.map((t, i) => {
                    const lyrics = LYRICS_BY_TRACK[t.id] ?? []
                    return (
                        <section className="rp-section" key={t.id}>
                            <h2 className="rp-section-title">
                                <span className="rp-num">{String(i + 1).padStart(2, "0")}.</span>
                                {t.title}
                            </h2>
                            <p className="rp-meta-line">{t.year} &middot; {t.duration}</p>
                            <LyricsPlayer src={t.url} lyrics={lyrics} />
                        </section>
                    )
                })}

            </article>
        </main>
    )
}
