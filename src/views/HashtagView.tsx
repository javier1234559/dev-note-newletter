import { AppPagination } from "@/components/feature/app-pagination";
import PaginationUrl from "@/components/PaginationUrl";
import { HashTagCard } from "@/feature/hashtag/components/HashTagCard";
import { HashtagChip } from "@/feature/hashtag/components/HashtagChip";
import { HashTagSearch } from "@/feature/hashtag/components/HashTagSearch";
import { tools } from "@/feature/hashtag/data/list-post";
import { Code, Palette, Zap, Database, Globe, Smartphone } from "lucide-react"

const hashtags = [
    { tag: "development", icon: <Code className="h-4 w-4" /> },
    { tag: "design", icon: <Palette className="h-4 w-4" /> },
    { tag: "productivity", icon: <Zap className="h-4 w-4" /> },
    { tag: "database", icon: <Database className="h-4 w-4" /> },
    { tag: "web", icon: <Globe className="h-4 w-4" /> },
    { tag: "mobile", icon: <Smartphone className="h-4 w-4" /> },
]

export default function HashtagView() {
    const page = 1;
    const totalPage = 10;
    const type = "hashtag"


    return (
        <div className="w-full h-auto">
            {/* Search Box */}
            <div className="mb-8">
                <HashTagSearch />
            </div>


            {/* Hashtag Filters */}
            <div className="mb-10">
                <div className="flex flex-wrap gap-3 justify-center">
                    {hashtags.map((hashtag) => (
                        <HashtagChip key={hashtag.tag} tag={hashtag.tag} icon={hashtag.icon} />
                    ))}
                </div>
            </div>

            {/* Tools List */}
            <div className="space-y-4">
                {tools.map((tool, index) => (
                    <HashTagCard
                        key={index}
                        title={tool.title}
                        description={tool.description}
                        author={tool.author}
                        lastUpdate={tool.lastUpdate}
                        tags={tool.tags}
                    />
                ))}
            </div>


            <AppPagination
                currentPage={page}
                totalPages={totalPage}
                type={type}
            />
        </div>
    )
}
