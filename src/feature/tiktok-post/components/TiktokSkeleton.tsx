import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { platformConfig } from "@/config";

export function TiktokSkeleton() {
    const config = platformConfig["tiktok"];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card
                    key={i}
                    className={cn(
                        "group overflow-hidden animate-pulse",
                        "border-2 border-transparent"
                    )}
                >
                    {/* Platform Badge */}
                    <div className="relative">
                        <Badge
                            className={cn(
                                "absolute top-3 left-3 z-10 text-xs font-medium",
                                config.badgeClassName
                            )}
                        >
                            {config.name}
                        </Badge>
                    </div>
                    {/* Image Skeleton */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                        <div className="w-full h-full bg-muted-foreground/10" />
                    </div>
                    {/* Content Skeleton */}
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <div className="h-3 bg-muted-foreground/20 rounded w-1/3" />
                            <div className="h-3 bg-muted-foreground/20 rounded w-1/4" />
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="h-3 bg-muted-foreground/20 rounded w-8" />
                            <div className="h-3 bg-muted-foreground/20 rounded w-8" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}