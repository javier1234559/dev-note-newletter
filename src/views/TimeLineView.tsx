import { AppPagination } from "@/components/feature/app-pagination";
import { TimeLineCard } from "@/feature/timeline/components/TimeLineCard";
import { TimeLineSearch } from "@/feature/timeline/components/TimeLineSearch";
import { TimeDisplay } from "@/feature/timeline/components/TimeDisplay";
import { timeline } from "@/feature/timeline/data/timeline";

export default function TimeLineView() {
    const page = 1;
    const totalPage = 10;
    const type = "timeline"

    // Group by month and year
    const groupByMonth = timeline.reduce((acc, tool) => {
        const date = new Date(tool.lastUpdate);
        const monthYear = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
        const monthKey = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit' 
        });
        
        if (!acc[monthKey]) {
            acc[monthKey] = {
                monthYear,
                items: []
            };
        }
        acc[monthKey].items.push(tool);
        return acc;
    }, {} as Record<string, { monthYear: string; items: typeof timeline }>);

    // Sort months in descending order
    const sortedMonths = Object.entries(groupByMonth).sort(([a], [b]) => b.localeCompare(a));

    return (
        <div className="w-full h-auto">
            {/* Search Box */}
            <div className="mb-8">
                <TimeLineSearch />
            </div>

            {/* Timeline List */}
            <div className="space-y-8">
                {sortedMonths.map(([monthKey, { monthYear, items }]) => (
                    <div key={monthKey} className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary border-b border-border/40 pb-2">
                            {monthYear}
                        </h2>
                        <div className="space-y-6">
                            {items.map((tool, index) => (
                                <div key={index} className="flex gap-8">
                                    {/* Time display */}
                                    <TimeDisplay date={tool.lastUpdate} />
                                    {/* Card content */}
                                    <div className="flex-1">
                                        <TimeLineCard
                                            title={tool.title}
                                            description={tool.description}
                                            author={tool.author}
                                            lastUpdate={tool.lastUpdate}
                                            tags={tool.tags}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
