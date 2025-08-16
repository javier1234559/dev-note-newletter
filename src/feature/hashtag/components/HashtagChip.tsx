"use client"

import type React from "react"
import { useState } from "react"
import { Hash } from "lucide-react"

interface HashtagChipProps {
    tag: string
    icon?: React.ReactNode
}

export function HashtagChip({ tag, icon = <Hash className="h-4 w-4" /> }: HashtagChipProps) {
    const [isActive, setIsActive] = useState(false)

    return (
        <button
            onClick={() => setIsActive(!isActive)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
        >
            {icon}
            {tag}
        </button>
    )
}
