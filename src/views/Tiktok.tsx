// 'use client'

// import usePaginationUrl, { SortItem } from "@/hooks/usePaginationUrl";
// import { useState } from "react";
// import { FilterPanel } from "@/components/FilterPanel";
// import { DashboardFilters } from "@/components/DashboardFilters";
// import { ContentTypeSelect } from "@/components/ContentTypeSelect";
// import TiktokPostPage from "../feature/tiktok-post/TiktokPostPage";
// import TiktokAdsPage from "@/feature/tiktok-ads/TiktokAdsPage";

// export default function TiktokPage() {
//     // 1. URL State
//     const {
//         page,
//         perPage,
//         updateQueryParams,
//         search,
//         searchParam: searchTerm,
//         setSearch,
//         startDate,
//         endDate,
//         contentType,
//         sortByArr,
//     } = usePaginationUrl();

//     // 2. Local state
//     const [selectedWeek, setSelectedWeek] = useState<Date | undefined>();


//     // 4. Handlers
//     const handleDateRangeChange = (startDate?: string, endDate?: string) => {
//         updateQueryParams({ startDate, endDate });
//     };

//     const handleSortByArrChange = (value: SortItem[]) => {
//         updateQueryParams({ sortByArr: value });
//     };

//     const handleContentTypeChange = (value: string) => {
//         updateQueryParams({ contentType: value, sortByArr: [] });
//     };


//     return (
//         <div className="min-h-screen bg-dashboard-bg">
//             {/* Filters */}
//             <div className="mb-8 flex flex-col gap-4">
//                 <DashboardFilters
//                     searchTerm={search}
//                     setSearchTerm={(value) => setSearch(value)}
//                     selectedWeek={selectedWeek}
//                     setSelectedWeek={setSelectedWeek}
//                     startDate={startDate}
//                     endDate={endDate}
//                     handleDateRangeChange={handleDateRangeChange}
//                 />

//                 <div className="flex gap-4 items-center flex-wrap">
//                     <ContentTypeSelect
//                         value={contentType}
//                         onChange={handleContentTypeChange}
//                     />

//                     {contentType === "posts" && (
//                         <FilterPanel
//                             sortByArr={sortByArr}
//                             setSortByArr={handleSortByArrChange}
//                             fields={["like_count", "comment_count", "share_count", "save_count", "view_count"]}
//                         />
//                     )}

//                     {contentType === "ads" && (
//                         <FilterPanel
//                             sortByArr={sortByArr}
//                             setSortByArr={handleSortByArrChange}
//                             fields={["cost", "ctr", "like_count","share_count"]}
//                         />
//                     )}
//                 </div>
//             </div>

//             <div className="mx-auto pb-8">
//                 <h2 className="text-2xl font-bold mb-4">Tiktok {contentType === "posts" ? "Posts" : "Ads"}</h2>

//                 {contentType === "posts" && (
//                     <TiktokPostPage
//                         searchTerm={searchTerm}
//                         startDate={startDate}
//                         endDate={endDate}
//                         page={page}
//                         perPage={perPage}
//                         sortByArr={sortByArr}
//                         updateQueryParams={updateQueryParams}
//                     />
//                 )}

//                 {contentType === "ads" && (
//                     <TiktokAdsPage
//                         searchTerm={searchTerm}
//                         startDate={startDate}
//                         endDate={endDate}
//                         page={page}
//                         perPage={perPage}
//                         sortByArr={sortByArr}
//                         updateQueryParams={updateQueryParams}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }
