import { Button } from "@/components/ui/button";

interface SortState {
  field: string;
  direction: "asc" | "desc" | null;
};

interface EngagementSortProps {
  fields: string[]; // ex: ['likes', 'comments', 'shares']
  value: SortState[];
  onChange: (val: SortState[]) => void;
};

export function EngagementSort({ fields, value, onChange }: EngagementSortProps) {
  const toggleSort = (field: string) => {
    const current = value.find((s) => s.field === field);
    let direction: "asc" | "desc" | null = "desc";

    if (!current) {
      direction = "desc";
    } else if (current.direction === "desc") {
      direction = "asc";
    } else if (current.direction === "asc") {
      direction = null;
    }

    const nextValue = value.filter((s) => s.field !== field);
    if (direction) {
      nextValue.push({ field, direction });
    }
    onChange(nextValue);
  };

  const getLabel = (field: string) => {
    const current = value.find((s) => s.field === field);
    if (!current) return field;
    return `${field} ${current.direction === "asc" ? "↑" : "↓"}`;
  };

  return (
    <div className="flex gap-2">
      {fields.map((field) => (
        <Button
          key={field}
          variant="outline"
          onClick={() => toggleSort(field)}
        >
          {getLabel(field)}
        </Button>
      ))}
    </div>
  );
}
