import { Search } from "lucide-react"

export function HashTagSearch() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
                type="text"
                placeholder="Search tag..."
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
        </div>
    )
}
