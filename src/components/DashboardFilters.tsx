import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import DateRangePicker from "./ui/date-range-picker";

interface DashboardFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedWeek: Date | undefined;
  setSelectedWeek: (date: Date | undefined) => void;
  // selectedPlatforms: string[];
  // setSelectedPlatforms: (platforms: string[]) => void;
  startDate: string;
  endDate: string;
  handleDateRangeChange: (startDate?: string, endDate?: string) => void;
}

const platforms = [
  { id: 'tiktok', name: 'TikTok', color: 'bg-tiktok text-white' },
  { id: 'instagram', name: 'Instagram', color: 'bg-instagram text-white' },
  { id: 'facebook', name: 'Facebook', color: 'bg-facebook text-white' }
];

export function DashboardFilters({
  searchTerm,
  setSearchTerm,
  selectedWeek,
  setSelectedWeek,
  // selectedPlatforms,
  // setSelectedPlatforms,
  startDate,
  endDate,
  handleDateRangeChange
}: DashboardFiltersProps) {

  // const togglePlatform = (platformId: string) => {
  //   if (selectedPlatforms.includes(platformId)) {
  //     setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
  //   } else {
  //     setSelectedPlatforms([...selectedPlatforms, platformId]);
  //   }
  // };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedWeek(undefined);
    // setSelectedPlatforms([]);
  };

  // const hasActiveFilters = searchTerm || selectedWeek || selectedPlatforms.length > 0;

  return (
    <div className="space-y-4">
      {/* Search and Date Picker Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search posts, authors, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Week Picker */}
        {/* Single Date Range Picker with integrated quick options */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={handleDateRangeChange}
          className="w-fit"
        />
      </div>

      {/* Platform Filters and Clear Button */}
      {/* <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">Platforms:</span>
        </div>

        {platforms.map((platform) => (
          <Badge
            key={platform.id}
            variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:scale-101 px-2 py-1",
              selectedPlatforms.includes(platform.id) && platform.color
            )}
            onClick={() => togglePlatform(platform.id)}
          >
            {platform.name}
          </Badge>
        ))}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground px-2 py-1 border border-muted-foreground rounded-full"
          >
            Clear all
          </Button>
        )}
      </div> */}
    </div>
  );
}