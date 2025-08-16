import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type SortItem = { field: string; direction: "asc" | "desc" };

interface FiltersState {
  contentType?: string;
  sortByArr?: SortItem[];
  [key: string]: any;
}

export default function useFiltersUrl(defaults: FiltersState) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersState>(defaults);

  const syncToUrl = useCallback((newFilters: FiltersState) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, val]) => {
      if (!val || (Array.isArray(val) && val.length === 0)) {
        params.delete(key);
      } else if (key === "sortByArr" && Array.isArray(val)) {
        const str = val.map(i => `${i.field}:${i.direction}`).join(",");
        params.set(key, str);
      } else {
        params.set(key, val);
      }
    });

    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const setFilter = useCallback((key: string, value: any) => {
    setFilters(prev => {
      const updated = { ...prev, [key]: value || undefined };
      syncToUrl(updated);
      return updated;
    });
  }, [syncToUrl]);

  const toggleSortField = useCallback((field: string) => {
    setFilters(prev => {
      const sortArr: SortItem[] = Array.isArray(prev.sortByArr) ? [...prev.sortByArr] : [];
      const idx = sortArr.findIndex(s => s.field === field);

      if (idx === -1) {
        sortArr.push({ field, direction: "desc" });
      } else if (sortArr[idx].direction === "desc") {
        sortArr[idx].direction = "asc";
      } else {
        sortArr.splice(idx, 1);
      }

      const updated = { ...prev, sortByArr: sortArr.length ? sortArr : undefined };
      syncToUrl(updated);
      return updated;
    });
  }, [syncToUrl]);

  const resetFilters = useCallback(() => {
    setFilters(defaults);
    syncToUrl(defaults);
  }, [defaults, syncToUrl]);

  const removeFilter = useCallback((key: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      delete updated[key];
      syncToUrl(updated);
      return updated;
    });
  }, [syncToUrl]);

  useEffect(() => {
    const initial: FiltersState = { ...defaults };

    searchParams.forEach((value, key) => {
      if (key === "sortByArr") {
        initial.sortByArr = value.split(",").map(s => {
          const [field, dir] = s.split(":");
          return { field, direction: dir as "asc" | "desc" };
        });
      } else {
        initial[key] = value;
      }
    });

    setFilters(initial);
  }, [searchParams, defaults]);

  const { contentType = "all", sortByArr = [] } = filters;

  return {
    contentType,
    sortByArr,
    filters,
    setFilter,
    toggleSortField,
    resetFilters,
    removeFilter,
  };
}
