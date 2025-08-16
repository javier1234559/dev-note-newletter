'use client'

import PaginationUrl from "@/components/PaginationUrl";
import PageSizeSelector from "@/components/PageSizeSelector";
import { TiktokSkeleton } from "@/feature/tiktok-post/components/TiktokSkeleton";
import { useTiktokPostList } from "@/feature/tiktok-post/use-tiktok-post";
import { TiktokPost } from "@/feature/tiktok-post/type";
import { TiktokPostCard } from "@/feature/tiktok-post/components/TiktokPostCard";
import { SortItem } from "@/hooks/usePaginationUrl";
import { useState } from "react";
import TiktokPostDetail from "./TiktokPostDetail";
import DetailModal from "@/components/modal/DetailModal";

interface TiktokPostPageProps {
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    perPage?: number;
    sortByArr?: SortItem[];
    updateQueryParams: (params: { page?: number; perPage?: number; search?: string; startDate?: string; endDate?: string }) => void;
}

export default function TiktokPostPage({ searchTerm, startDate, endDate, page = 1, perPage = 100, sortByArr, updateQueryParams }: TiktokPostPageProps) {
    const { data, isLoading, error } = useTiktokPostList({
        page,
        perPage,
        ...(searchTerm && { search: searchTerm }),
        ...(startDate && { startDate: startDate }),
        ...(endDate && { endDate: endDate }),
        ...(sortByArr && { sortByArr: sortByArr }),
    });

    const [selectedPost, setSelectedPost] = useState<TiktokPost | null>(null);
    const posts = data?.data as TiktokPost[] | undefined;
    const pagination = data?.pagination;


    return (
        <div className="mx-auto py-8">
            {isLoading ? (
                <TiktokSkeleton />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts?.map((post) => (
                        <TiktokPostCard key={post.id} post={post} onSelect={setSelectedPost} />
                    ))}
                </div>
            )}

            <DetailModal
                showModal={!!selectedPost}
                setShowModal={() => setSelectedPost(null)}
                selectedDetail={selectedPost}
            >
                <TiktokPostDetail id={selectedPost?.id || ""} isOpen={!!selectedPost} />
            </DetailModal>

            {pagination && (
                <div className="text-center py-6">
                    <p className="text-muted-foreground text-sm">
                        {pagination.totalItems} posts found
                    </p>
                </div>
            )}

            {!isLoading && (!posts || posts.length === 0) && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        No posts found matching your criteria.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Try adjusting your filters or search terms.
                    </p>
                </div>
            )}

            {error && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        Error loading posts.
                    </p>
                </div>
            )}


            <div className="mt-2 flex justify-center">
                <div className="flex flex-col gap-10 justify-end items-center">
                    <PaginationUrl
                        currentPage={page}
                        totalPages={pagination?.totalPages || 1}
                        onPageChange={(newPage) => updateQueryParams({ page: newPage, perPage: perPage })}
                    />

                    <PageSizeSelector
                        pageSize={perPage}
                        onPageSizeChange={(newPageSize) => updateQueryParams({ page: 1, perPage: newPageSize })}
                    />
                </div>
            </div>
        </div>
    );
}
