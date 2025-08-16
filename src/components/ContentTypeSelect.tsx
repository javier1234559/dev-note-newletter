import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface ContentTypeSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export function ContentTypeSelect({ value, onChange }: ContentTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Content Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="posts">Posts</SelectItem>
        <SelectItem value="ads">Ads</SelectItem>
      </SelectContent>
    </Select>
  );
}
