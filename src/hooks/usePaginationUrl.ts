"use client";

import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/config";

export type SortItem = { field: string; ascending: boolean };

interface PaginationParams {
    defaultPage?: number;
    defaultPerPage?: number;
    debounceDelay?: number;
}

// Serialize: [{field: "likes", ascending: false}] => "likes:false"
export function serializeSort(sortArr: SortItem[]): string {
    return sortArr
      .map((i) => `${i.field}:${i.ascending}`)
      .join(",");
}

// Parse: "likes:false,comment:true" => [{field: "likes", ascending: false}, ...]
export function parseSort(str: string): SortItem[] {
    if (!str) return [];
    return str.split(",").map((item) => {
      const [field, asc] = item.split(":");
      return { field, ascending: asc === "true" };
    });
}

const usePaginationUrl = ({
    defaultPage = DEFAULT_PAGE_NUMBER,
    defaultPerPage = DEFAULT_PAGE_SIZE,
    debounceDelay = 1500,
}: PaginationParams = {}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [page, setPage] = useState<number>(defaultPage);
    const [perPage, setPerPage] = useState<number>(defaultPerPage);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchParam, setSearchParam] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [contentType, setContentType] = useState<string>("");
    const [sortByArr, setSortByArr] = useState<SortItem[]>([]);
    
    const updateParams = useCallback(
        (newParams: {
            page?: number;
            perPage?: number;
            search?: string;
            startDate?: string;
            endDate?: string;
            contentType?: string;
            sortByArr?: SortItem[];
        }) => {
            const urlParams = new URLSearchParams(searchParams?.toString() || "");

            Object.entries(newParams).forEach(([key, value]) => {
                if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
                    urlParams.delete(key);
                } else if (Array.isArray(value)) {
                    if (key === "sortByArr") {
                        urlParams.set(key, serializeSort(value));
                    } else {
                        urlParams.set(key, value.join(","));
                    }
                } else {
                    urlParams.set(key, value.toString());
                }
            });

            router.push(`?${urlParams.toString()}`);
        },
        [router, searchParams]
    );

    const debouncedUpdateParams = useMemo(
        () =>
            debounce((value: string) => {
                updateParams({ search: value });
                setSearchParam(value.trim());
            }, debounceDelay),
        [updateParams, debounceDelay],
    );

    useEffect(() => {
        const pageParam = searchParams?.get("page");
        const perPageParam = searchParams?.get("perPage");
        const searchParamValue = searchParams?.get("search");
        const startDateParam = searchParams?.get("startDate");
        const endDateParam = searchParams?.get("endDate");
        const contentTypeParam = searchParams?.get("contentType");
        const sortByArrParam = searchParams?.get("sortByArr");

        setPage(pageParam ? Number(pageParam) : defaultPage);
        setPerPage(perPageParam ? Number(perPageParam) : defaultPerPage);
        setSearchValue(searchParamValue || "");
        setSearchParam(searchParamValue || "");
        setStartDate(startDateParam || "");
        setEndDate(endDateParam || "");
        setContentType(contentTypeParam || "posts");
        setSortByArr(sortByArrParam ? parseSort(sortByArrParam) : []);
    }, [defaultPage, defaultPerPage, searchParams]);

    useEffect(() => {
        return () => {
            debouncedUpdateParams.cancel();
        };
    }, [debouncedUpdateParams]);

    const handleSearch = useCallback(
        (value: string) => {
            setSearchValue(value);
            debouncedUpdateParams(value);
        },
        [debouncedUpdateParams],
    );

    return {
        page,
        perPage,
        search: searchValue,
        searchParam,
        startDate,
        endDate,
        setSearch: handleSearch,
        setStartDate,
        setEndDate,
        updateQueryParams: updateParams,
        contentType,
        setContentType,
        sortByArr,
        setSortByArr,
    };
};

export default usePaginationUrl;

