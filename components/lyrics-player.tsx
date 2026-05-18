'use client'

import { useEffect, useRef, useState } from 'react'
import type { LyricLine } from '@/lib/lrc'

interface Props {
    src: string
    lyrics: LyricLine[]
}

function findCurrentLineIdx(lines: LyricLine[], t: number): number {
    let lo = 0, hi = lines.length - 1, ans = -1
    while (lo <= hi) {
        const mid = (lo + hi) >> 1
        if (lines[mid].time <= t) { ans = mid; lo = mid + 1 } else { hi = mid - 1 }
    }
    return ans
}

export function LyricsPlayer({ src, lyrics }: Props) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRefs = useRef<(HTMLDivElement | null)[]>([])
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const currentIdx = findCurrentLineIdx(lyrics, currentTime)

    // Smooth time updates via requestAnimationFrame while playing.
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        let raf = 0
        const tick = () => {
            setCurrentTime(audio.currentTime)
            raf = requestAnimationFrame(tick)
        }
        const onPlay = () => { setIsPlaying(true); raf = requestAnimationFrame(tick) }
        const onPause = () => { setIsPlaying(false); cancelAnimationFrame(raf); setCurrentTime(audio.currentTime) }
        const onSeek = () => setCurrentTime(audio.currentTime)
        audio.addEventListener('play', onPlay)
        audio.addEventListener('pause', onPause)
        audio.addEventListener('seeked', onSeek)
        audio.addEventListener('timeupdate', onSeek)
        return () => {
            audio.removeEventListener('play', onPlay)
            audio.removeEventListener('pause', onPause)
            audio.removeEventListener('seeked', onSeek)
            audio.removeEventListener('timeupdate', onSeek)
            cancelAnimationFrame(raf)
        }
    }, [])

    // Smoothly center the current line inside the lyrics container.
    useEffect(() => {
        if (currentIdx < 0) return
        const container = containerRef.current
        const line = lineRefs.current[currentIdx]
        if (!container || !line) return

        const cRect = container.getBoundingClientRect()
        const lRect = line.getBoundingClientRect()
        const offset = (lRect.top - cRect.top) - (cRect.height / 2) + (lRect.height / 2)
        container.scrollBy({ top: offset, behavior: 'smooth' })
    }, [currentIdx])

    const handleSeek = (time: number) => {
        const audio = audioRef.current
        if (!audio) return
        audio.currentTime = time
        if (!isPlaying) audio.play().catch(() => { /* user gesture not yet given */ })
    }

    return (
        <div className="lp-wrap">
            <audio
                ref={audioRef}
                controls
                preload="metadata"
                src={src}
                className="lp-audio"
            >
                Your browser does not support the audio element.
            </audio>

            <div ref={containerRef} className="lp-lyrics" aria-label="Lyrics">
                <div className="lp-spacer" aria-hidden="true" />
                {lyrics.map((line, i) => {
                    const state =
                        i === currentIdx ? 'current'
                            : i < currentIdx ? 'past'
                                : 'future'
                    return (
                        <div
                            key={i}
                            ref={(el) => { lineRefs.current[i] = el }}
                            className={`lp-line lp-${state}`}
                            onClick={() => handleSeek(line.time)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleSeek(line.time)
                                }
                            }}
                        >
                            {line.words && line.words.length > 0 ? (
                                line.words.map((w, j) => {
                                    const passed = state === 'past' || (state === 'current' && currentTime >= w.time)
                                    return (
                                        <span
                                            key={j}
                                            className={passed ? 'lp-word lp-passed' : 'lp-word'}
                                        >
                                            {w.text}{' '}
                                        </span>
                                    )
                                })
                            ) : (
                                <span>{line.text}</span>
                            )}
                        </div>
                    )
                })}
                <div className="lp-spacer" aria-hidden="true" />
            </div>
        </div>
    )
}
