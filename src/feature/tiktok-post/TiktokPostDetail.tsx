"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Hash, User, ThumbsUp, MessageCircle, Share2, Bookmark, Eye, Music, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import MediaPreview from "@/components/MediaPreview";
import { Skeleton } from "@/components/ui/skeleton";
import AppError from "@/components/common/app-error";
import { formatCompact, formatDate } from "@/lib/utils";
import { useTiktokPostDetail } from "./use-tiktok-post";

interface TiktokPostDetailProps {
    id: string;
    isOpen: boolean;
}

export default function TiktokPostDetail({ id, isOpen }: TiktokPostDetailProps) {
    const { data: post, isLoading, error } = useTiktokPostDetail(id, isOpen);
    const [expandedCaption, setExpandedCaption] = useState(false);

    if (isLoading) return <div className="w-full h-full"><TiktokPostDetailSkeleton /></div>;
    if (error) return <div className="w-full h-full"><AppError error={error} /></div>;
    if (!post) return null;

    let mediaType: "image" | "video" = "image";
    let mediaUrl = post.video_url || "";
    if (post.video_url) {
        mediaType = "video";
        mediaUrl = post.video_url;
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column - Media & Caption */}
                <div className="space-y-3">
                    {/* Media */}
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative aspect-square w-full overflow-hidden bg-muted">
                                <MediaPreview
                                    url={mediaUrl}
                                    mediaType={mediaType}
                                    alt="Tiktok post media"
                                    className="object-cover w-full h-full"
                                />
                                {/* Type Badge */}
                                <Badge className="absolute z-20 top-3 left-3 text-xs font-medium bg-black text-white border-0">
                                    {post.is_ad ? "AD" : "VIDEO"}
                                </Badge>
                                {/* External link */}
                                {post.video_url && (
                                    <Button size="sm" variant="secondary" className="absolute z-20 bottom-3 right-3" asChild>
                                        <Link href={post.video_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Info */}
                    {(post.author_avatar || post.author_bio) && (
                        <Card>
                            <CardHeader className="pb-1">
                                <h4 className="text-sm font-semibold">User Info</h4>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3">
                                <div className="flex items-center gap-3">
                                    {post.author_avatar && (
                                        <img
                                            src={post.author_avatar}
                                            alt={post.author_bio || "Avatar"}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">
                                            {post.author_profile_url ? (
                                                <Link
                                                    href={post.author_profile_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {post.author_username || "Unknown"}
                                                </Link>
                                            ) : post.author_username}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {post.author_bio || ""}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                </div>

                {/* Right Column - Info & Details */}
                <div className="space-y-3">
                    {/* Engagement */}
                    <Card>
                        <CardHeader className="pb-1">
                            <h4 className="text-sm font-semibold">Engagement</h4>
                        </CardHeader>
                        <CardContent className="pt-0 py-3">
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                                <div className="flex items-center gap-1 min-w-[70px]">
                                    <ThumbsUp className="w-4 h-4 text-green-500" />
                                    <span className="font-semibold text-sm">{formatCompact(post.like_count ?? 0)}</span>
                                    <span className="font-bold">Likes</span>
                                </div>
                                <div className="flex items-center gap-1 min-w-[70px]">
                                    <MessageCircle className="w-4 h-4 text-blue-500" />
                                    <span className="font-semibold text-sm">{formatCompact(post.comment_count ?? 0)}</span>
                                    <span className="font-bold">Comments</span>
                                </div>
                                <div className="flex items-center gap-1 min-w-[70px]">
                                    <Share2 className="w-4 h-4 text-blue-500" />
                                    <span className="font-semibold text-sm">{formatCompact(post.share_count ?? 0)}</span>
                                    <span className="font-bold">Shares</span>
                                </div>
                                <div className="flex items-center gap-1 min-w-[70px]">
                                    <Bookmark className="w-4 h-4 text-yellow-500" />
                                    <span className="font-semibold text-sm">{formatCompact(post.save_count ?? 0)}</span>
                                    <span className="font-bold">Saves</span>
                                </div>
                                <div className="flex items-center gap-1 min-w-[70px]">
                                    <Eye className="w-4 h-4 text-gray-500" />
                                    <span className="font-semibold text-sm">{formatCompact(post.view_count ?? 0)}</span>
                                    <span className="font-bold">Views</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Caption */}
                    {post.caption && (
                        <Card>
                            <CardHeader className="pb-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold">Caption</h4>
                                    {post.caption.length > 100 && (
                                        <Button variant="ghost" size="sm" onClick={() => setExpandedCaption(!expandedCaption)}>
                                            {expandedCaption ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3">
                                <div
                                    className={`bg-caption text-sm leading-relaxed ${!expandedCaption && post.caption.length > 100 ? "line-clamp-3" : ""}`}
                                >
                                    {post.caption}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                        <Card>
                            <CardHeader className="pb-1">
                                <h4 className="text-sm font-semibold">Hashtags</h4>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3">
                                <div className="flex flex-wrap gap-1 text-xs text-blue-500">
                                    {post.hashtags.map((tag, idx) => (
                                        <a
                                            key={idx}
                                            href={`https://www.tiktok.com/tag/${encodeURIComponent(tag)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline cursor-pointer"
                                        >
                                            #{tag}
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Music */}
                    {post.music_name && (
                        <Card>
                            <CardHeader className="pb-1">
                                <h4 className="text-sm font-semibold">Music</h4>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Music className="w-4 h-4" />
                                    <span className="font-bold">{post.music_name}</span>
                                    {post.music_author && <span>by {post.music_author}</span>}
                                    {post.music_url && (
                                        <a
                                            href={post.music_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline flex items-center gap-1 ml-2"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}


                    {/* Timeline */}
                    <Card>
                        <CardHeader className="pb-1">
                            <h4 className="text-sm font-semibold">Timeline</h4>
                        </CardHeader>
                        <CardContent className="pt-0 pb-3">
                            <div className="space-y-2">
                                {post.created_at && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        <div className="text-xs">
                                            <span className="font-medium">Created:</span> {formatDate(post.created_at)}
                                        </div>
                                    </div>
                                )}
                                {/* {post.updated_at && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        <div className="text-xs">
                                            <span className="font-medium">Updated:</span> {formatDate(post.updated_at)}
                                        </div>
                                    </div>
                                )} */}
                                {post.date_posted && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        <div className="text-xs">
                                            <span className="font-medium">Date posted:</span> {formatDate(post.date_posted)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}

function TiktokPostDetailSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
                <Skeleton className="w-full h-[300px]" />
                <Skeleton className="w-full h-[100px]" />
                <Skeleton className="w-full h-[60px]" />
            </div>
            <div className="space-y-3">
                <Skeleton className="w-full h-[100px]" />
                <Skeleton className="w-full h-[100px]" />
                <Skeleton className="w-full h-[100px]" />
                <Skeleton className="w-full h-[100px]" />
                <Skeleton className="w-full h-[100px]" />
            </div>
        </div>
    );
}