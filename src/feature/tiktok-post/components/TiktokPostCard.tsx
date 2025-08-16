import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ThumbsUp, MessageCircle, Share2, Eye, Bookmark, Music } from "lucide-react";
import { cn, formatCompact } from "@/lib/utils";
import { platformConfig } from "@/config";
import { TiktokPost } from "../type";
import MediaPreview from "@/components/MediaPreview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TiktokPostCardProps {
    post: TiktokPost;
    onSelect: (post: TiktokPost) => void;
}

export function TiktokPostCard({ post, onSelect }: TiktokPostCardProps) {
    const config = platformConfig["tiktok"];
    if (!post) return null;

    let mediaType: "image" | "video" = "image";
    let mediaUrl = post.video_url || "";
    if (post.video_url) {
        mediaType = "video";
        mediaUrl = post.video_url;
    }

    if (!mediaUrl && post.caption) mediaUrl = "/placeholder.svg";

    return (
        <Card
            className={cn(
                "group overflow-hidden transition-all duration-300",
                "hover:scale-105 hover:shadow-lg hover:shadow-black/10",
                "border-2 border-transparent hover:border-current",
                "flex flex-col h-full"
            )}
        >
            {/* Badge + ExternalLink */}
            <div className="relative">
                <Badge
                    className={cn(
                        "absolute top-3 left-3 z-20 text-xs font-medium",
                        config.badgeClassName
                    )}
                >
                    {post.is_ad ? "AD" : "VIDEO"}
                </Badge>
                <div
                    className={cn(
                        "absolute top-3 right-3 z-20 opacity-80 hover:opacity-100",
                        "transition-opacity duration-300 cursor-pointer"
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (post.video_url) window.open(post.video_url, "_blank", "noopener,noreferrer");
                    }}
                >
                    <ExternalLink className="w-4 h-4 text-white drop-shadow-md" />
                </div>
            </div>

            {/* Media - full bleed */}
            <div className="relative w-full h-[300px] aspect-square bg-black">
                <MediaPreview
                    url={mediaUrl}
                    mediaType={mediaType}
                    posterUrl={mediaType === "image" ? mediaUrl : undefined}
                    alt={post.caption || "Tiktok post"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow gap-5 p-4">
                <div className="flex items-center gap-2">
                    {post.author_avatar && (
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={post.author_avatar} />
                            <AvatarFallback>
                                {post.author_username?.charAt(0) || "?"}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <span className="font-medium text-sm">
                        <a
                            href={post.author_profile_url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {post.author_username || "Unknown Author"}
                        </a>
                    </span>
                </div>

                {post.caption && (
                    <h3 className="bg-caption text-xs leading-relaxed line-clamp-3 ">
                        <span className="font-semibold">Caption:</span> {post.caption}
                    </h3>
                )}

                {post.hashtags && post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-xs text-blue-500">
                        {post.hashtags.map((tag, idx) => (
                            <a
                                key={idx}
                                href={`https://www.tiktok.com/tag/${encodeURIComponent(tag)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                #{tag}
                            </a>
                        ))}
                    </div>
                )}



                <div className="mt-auto flex flex-col gap-3">
                    {post.music_name && (
                        <div className="text-xs flex gap-1 text-muted-foreground">
                            <Music className="w-3 h-3" />
                            <span className="font-semibold">Music:</span>
                            <span className="font-semibold">{post.music_name}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-2 flex-wrap gap-2">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span className={config.textClassName}>
                                    {formatCompact(post.like_count ?? 0)}
                                </span>
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                <span className={config.textClassName}>{formatCompact(post.comment_count ?? 0)}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Share2 className="w-3 h-3" />
                                <span className={config.textClassName}>{formatCompact(post.share_count ?? 0)}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span className={config.textClassName}>{formatCompact(post.view_count ?? 0)}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Bookmark className="w-3 h-3" />
                                <span className={config.textClassName}>{formatCompact(post.save_count ?? 0)}</span>
                            </span>
                        </div>

                    </div>
                    <span className={` ml-auto text-xs text-muted-foreground font-bold ${config.textClassName}`}>
                        {post.date_posted &&
                            `Date posted: ${new Date(post.date_posted).toLocaleDateString()}`}
                    </span>
                    {/* View more link */}
                    <button
                        className={`mt-2 underline text-sm font-medium transition-colors w-fit self-end  ${config.textClassName}`}
                        onClick={e => {
                            e.stopPropagation();
                            onSelect(post);
                        }}
                        type="button"
                    >
                        View more
                    </button>
                </div>
            </div>
        </Card>
    );
}
