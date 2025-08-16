import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SortItem } from "@/hooks/usePaginationUrl";
import { useCallback } from "react";
import { formatFieldLabel } from "@/lib/utils";

export function FilterPanel({
  sortByArr = [],
  setSortByArr,
  fields = [],
}: {
  sortByArr?: SortItem[];
  setSortByArr: (arr: SortItem[]) => void;
  fields?: string[];
}) {
  const toggleSort = useCallback(
    (field: string) => {
      const found = sortByArr.find((s) => s.field === field);
      let next: SortItem[];

      if (!found) {
        // Chưa có field, thêm sort desc
        next = [...sortByArr, { field, ascending: false }];
      } else if (found.ascending === false) {
        // Đang desc, chuyển sang asc
        next = sortByArr.map((s) =>
          s.field === field ? { ...s, ascending: true } : s
        );
      } else {
        // Đang asc, loại bỏ khỏi mảng
        next = sortByArr.filter((s) => s.field !== field);
      }

      setSortByArr(next);
    },
    [sortByArr, setSortByArr]
  );

  const getSortState = useCallback(
    (field: string) => {
      const found = sortByArr.find((s) => s.field === field);
      return found?.ascending ?? null;
    },
    [sortByArr]
  );

  return (
   <div className="flex gap-2 flex-wrap">
   {fields.map((field) => {
     const state = getSortState(field);
     const isActive = sortByArr.some((s) => s.field === field);

     return (
       <Button
         key={field}
         variant={isActive ? "default" : "outline"}
         className={`px-3 py-1 rounded-full border ${
           isActive ? "border-primary " : ""
         }`}
         onClick={() => toggleSort(field)}
       >
         <span>{formatFieldLabel(field)}</span>
         {state === true && <ArrowUp className="ml-1 w-4 h-4" />}
         {state === false && <ArrowDown className="ml-1 w-4 h-4" />}
       </Button>
     );
   })}
 </div>
  );
}
