// Enhanced LRC parser. Supports the AssemblyAI-style format:
//
//   [mm:ss.xx]first_word <mm:ss.xx>second_word <mm:ss.xx>third_word <mm:ss.xx>
//
// The trailing per-word tag after the last word is treated as the line end
// (it's the start time of the next would-be word, equivalent to the previous
// word's end). Each LyricLine carries the line start time, full plain text,
// and an array of timestamped words so consumers can do karaoke-style
// per-word highlighting.

export interface LyricWord {
    time: number // seconds
    text: string
}

export interface LyricLine {
    time: number // seconds
    endTime: number // seconds (best-effort)
    text: string
    words: LyricWord[]
}

const LINE_TAG = /^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/
const WORD_TAG = /<(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?>/g
const META_TAG = /^\[(ti|ar|al|by|length|offset|re|ve):/i

const tagToSeconds = (mm: string, ss: string, frac?: string) => {
    const m = parseInt(mm, 10)
    const s = parseInt(ss, 10)
    const f = frac ? parseFloat('0.' + frac) : 0
    return m * 60 + s + f
}

export function parseEnhancedLrc(raw: string): LyricLine[] {
    const out: LyricLine[] = []

    for (const rawLine of raw.split(/\r?\n/)) {
        const line = rawLine.trim()
        if (!line || META_TAG.test(line)) continue

        const lineMatch = line.match(LINE_TAG)
        if (!lineMatch) continue

        const lineTime = tagToSeconds(lineMatch[1], lineMatch[2], lineMatch[3])
        const rest = line.slice(lineMatch[0].length)

        const words: LyricWord[] = []
        let segmentStart = lineTime
        let cursor = 0
        let endTime = lineTime

        WORD_TAG.lastIndex = 0
        let m: RegExpExecArray | null
        while ((m = WORD_TAG.exec(rest)) !== null) {
            const text = rest.slice(cursor, m.index).trim()
            const t = tagToSeconds(m[1], m[2], m[3])
            if (text) words.push({ time: segmentStart, text })
            segmentStart = t
            endTime = t
            cursor = m.index + m[0].length
        }

        const tail = rest.slice(cursor).trim()
        if (tail) {
            words.push({ time: segmentStart, text: tail })
            endTime = Math.max(endTime, segmentStart)
        }

        const text = words.map(w => w.text).join(' ').trim()
        if (!text) continue

        out.push({ time: lineTime, endTime, text, words })
    }

    out.sort((a, b) => a.time - b.time)

    for (let i = 0; i < out.length - 1; i++) {
        if (out[i].endTime <= out[i].time) {
            out[i].endTime = out[i + 1].time
        }
    }

    return out
}

export function findActiveIndex(lines: LyricLine[], currentTime: number): number {
    if (!lines.length) return -1
    if (currentTime < lines[0].time) return -1
    let lo = 0, hi = lines.length - 1, ans = -1
    while (lo <= hi) {
        const mid = (lo + hi) >> 1
        if (lines[mid].time <= currentTime) {
            ans = mid
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return ans
}
