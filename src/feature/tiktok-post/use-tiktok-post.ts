"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { TiktokPost } from "./type";
import { getTiktokPost, TiktokPostResponse, TiktokQueryParams, getDetailTiktokPost } from "./utils";

export type { TiktokPost };

export const TIKTOK_KEY_FACTORY = {
    all: ["tiktok-post"] as const,
    lists: () => [...TIKTOK_KEY_FACTORY.all, "list"] as const,
    list: (params: TiktokQueryParams) =>
        [...TIKTOK_KEY_FACTORY.lists(), params] as const,
    details: () => [...TIKTOK_KEY_FACTORY.all, "detail"] as const,
    detail: (id: string) => [...TIKTOK_KEY_FACTORY.details(), id] as const,
};

export const useTiktokPostList = (
    params: TiktokQueryParams,
    options?: UseQueryOptions<TiktokPostResponse>,
) => {
    return useQuery({
        queryKey: TIKTOK_KEY_FACTORY.list(params),
        queryFn: () => getTiktokPost(params),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: true,
        ...(typeof options === "object" ? options : {}),
    });
};

export const useTiktokPostDetail = (id: string, isOpen?: boolean) => {
    return useQuery({
        queryKey: TIKTOK_KEY_FACTORY.detail(id),
        queryFn: () => getDetailTiktokPost(id),
        staleTime: 1000 * 60 * 5,
        enabled: !!id && (isOpen === undefined ? true : isOpen),
    });
};
