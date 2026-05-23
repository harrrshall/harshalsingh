'use client'

import { useRouter } from "next/navigation"
import { useCallback } from "react"

export default function BackLink({
    fallbackHref = "/",
    className = "rp-backlink",
    children,
}: {
    fallbackHref?: string
    className?: string
    children: React.ReactNode
}) {
    const router = useRouter()

    const onClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            if (typeof window !== "undefined" && window.history.length > 1) {
                router.back()
            } else {
                router.push(fallbackHref)
            }
        },
        [router, fallbackHref]
    )

    return (
        <a href={fallbackHref} className={className} onClick={onClick}>
            {children}
        </a>
    )
}
