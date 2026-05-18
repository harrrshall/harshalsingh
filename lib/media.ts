// Local media paths, prefixed with NEXT_PUBLIC_BASE_PATH so they resolve
// correctly when the site is served under a GitHub Pages sub-path.

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

const path = (p: string) => `${BASE}${p}`

export const MEDIA = {
    coverImage: path('/img/cover.png'),
    featuredAudio: path('/audio/Optimized_for_streaming.m4a'),
}
