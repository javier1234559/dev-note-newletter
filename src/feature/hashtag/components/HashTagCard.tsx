import { ExternalLink } from "lucide-react"

interface HashTagCardProps {
    title: string
    description: string
    author: string
    lastUpdate: string
    href?: string
    tags?: string[]
}

export function HashTagCard({ title, description, author, lastUpdate, href = "#", tags = [] }: HashTagCardProps) {
    return (
        <div className="border-b border-dotted border-border/40 pb-6 mb-6 last:border-b-0 last:mb-0">
            <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
                <h3 className="flex underline text-xl font-medium text-primary hover:text-primary/30 transition-colors mb-3 font-mono items-center gap-2">
                    {title}
                    <ExternalLink className="h-3 w-3 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                </h3>
            </a>

            <p className="text-muted-foreground mb-4 leading-relaxed font-mono text-sm">{description}</p>

            <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-muted-foreground/80">{lastUpdate}</span>
                {tags.map((tag, index) => (
                    <span key={index} className="text-muted-foreground/60">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
