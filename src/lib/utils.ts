import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function stripTrailingZero(str: string) {
  return str.replace(/\.0$/, '');
}


export function formatCompact(num: number, decimal = 1) {
  const absNum = Math.abs(num);

  let formatted;
  if (absNum >= 1_000_000_000) {
    formatted = (num / 1_000_000_000).toFixed(decimal);
    return stripTrailingZero(formatted) + 'B';
  }
  if (absNum >= 1_000_000) {
    formatted = (num / 1_000_000).toFixed(decimal);
    return stripTrailingZero(formatted) + 'M';
  }
  if (absNum >= 1_000) {
    formatted = (num / 1_000).toFixed(decimal);
    return stripTrailingZero(formatted) + 'K';
  }

  return num.toString();
}



// sortByArr: likes:asc,comments:desc,shares:asc
export function parseSort(sort?: string) {
  if (!sort) return [];
  return sort.split(",").map(item => {
      const [field, direction] = item.split(":");
      return {
          field: field.trim(),
          ascending: (direction || 'desc').trim().toLowerCase() === 'asc'
      };
  });
}


// Format snake_case or camelCase field to human readable label
export function formatFieldLabel(field: string): string {
  // Ưu tiên snake_case, nếu không thì camelCase
  return field
    .replace(/_/g, ' ') // snake_case -> space
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase -> space
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}


export const formatDate = (dateString: string | null) => {
  if (!dateString) return "Unknown date";
  return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
  });
};
