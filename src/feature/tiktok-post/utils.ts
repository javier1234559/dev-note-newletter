"use client";

import { supabase } from "@/supabase/client";
import { TiktokPost } from "./type";
import { SortItem } from "@/hooks/usePaginationUrl";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 8;

export interface TiktokQueryParams {
    page?: number;
    perPage?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    sortByArr?: SortItem[];
}

export interface PaginationOutputDto {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface TiktokPostResponse {
    data: TiktokPost[];
    pagination: PaginationOutputDto;
}


export const getTiktokPost = async ({
    page = DEFAULT_PAGE_NUMBER,
    perPage = DEFAULT_PAGE_SIZE,
    search,
    startDate,
    endDate,
    sortByArr,
}: TiktokQueryParams) => {
    if (startDate && endDate) {
        if (startDate > endDate) {
            throw new Error("Start date must be before end date");
        }
    }

    const offset = (page - 1) * perPage;

    const query = supabase
        .from("tiktok_post")
        .select("*", { count: "exact" })
        .range(offset, offset + perPage - 1);

    if (startDate) {
        query.gte("date_posted", startDate);
    }

    if (endDate) {
        query.lte("date_posted", endDate);
    }

    if (search) {
        query.ilike("caption", `%${search}%`);
    }

    if (sortByArr) {
        sortByArr.forEach(({ field, ascending }) => {
            query.order(field, { ascending });
        });
    }

    const { data, count, error } = await query;

    if (error) {
        throw error;
    }

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / perPage);

    const pagination: PaginationOutputDto = {
        totalItems,
        currentPage: page,
        totalPages,
        itemsPerPage: perPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };

    return {
        data,
        pagination,
    };
};


export const getDetailTiktokPost = async (id: string) => {
    const { data, error } = await supabase.from("tiktok_post").select("*").eq("id", id).single();
    if (error) {
        throw error;
    }
    return data;
};