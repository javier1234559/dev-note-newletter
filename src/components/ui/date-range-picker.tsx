"use client"

import type React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { useState, memo } from "react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

interface DateRangePickerProps {
    startDate?: string // ISO string
    endDate?: string // ISO string
    onDateRangeChange?: (startDate?: string, endDate?: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

function DateRangePicker({
    startDate,
    endDate,
    onDateRangeChange = () => { },
    placeholder = "Select date range",
    disabled = false,
    className,
}: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0) // 0 = this week, -1 = last week, etc.

    // Convert ISO strings to Date objects for the calendar
    const dateRange: DateRange | undefined = {
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined,
    }

    const handleDateSelect = (range: DateRange | undefined) => {
        // If clicking on a date when we already have a complete range, start fresh
        if (dateRange?.from && dateRange?.to && range?.from && !range?.to) {
            // Start a new selection
            const start = range.from.toISOString()
            onDateRangeChange(start, undefined)
            return
        }

        if (range?.from && range?.to) {
            // Complete range selected
            const start = range.from.toISOString()
            const end = range.to.toISOString()
            onDateRangeChange(start, end)
        } else if (range?.from && !range?.to) {
            // Only start date selected
            const start = range.from.toISOString()
            onDateRangeChange(start, undefined)
        } else {
            // Clear selection
            handleClearSelection()
        }
    }

    const handleClear = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        console.log("Clear button clicked") // Debug log
        handleClearSelection()
    }

    const handleClearSelection = () => {
        console.log("Clearing selection") // Debug log
        setCurrentWeekOffset(0)
        onDateRangeChange(undefined, undefined)
        console.log("onDateRangeChange called with undefined, undefined") // Debug log
    }

    // Get Monday of a specific week
    const getMondayOfWeek = (date: Date, weekOffset = 0) => {
        const dayOfWeek = date.getDay()
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Handle Sunday
        const monday = new Date(date)
        monday.setDate(date.getDate() + mondayOffset + weekOffset * 7)
        return monday
    }

    // Get Sunday of a specific week
    const getSundayOfWeek = (monday: Date) => {
        const sunday = new Date(monday)
        sunday.setDate(monday.getDate() + 6)
        return sunday
    }

    const handleWeekNavigation = (weekOffset: number) => {
        const today = new Date()
        const monday = getMondayOfWeek(today, weekOffset)
        const sunday = getSundayOfWeek(monday)

        // Set time properly
        monday.setHours(0, 0, 0, 0)
        sunday.setHours(23, 59, 59, 999)

        setCurrentWeekOffset(weekOffset)
        onDateRangeChange(monday.toISOString(), sunday.toISOString())
    }

    const handleQuickSelect = (days: number, type: "last" | "this" = "last") => {
        const today = new Date()
        let startDate: Date
        let endDate: Date

        switch (type) {
            case "this":
                if (days === 7) {
                    // This Week (Monday to today)
                    const monday = getMondayOfWeek(today, 0)
                    startDate = monday
                    endDate = new Date(today)
                    setCurrentWeekOffset(0)
                } else if (days === 30) {
                    // This Month (1st of current month to today)
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1)
                    endDate = new Date(today)
                } else {
                    // Fallback
                    startDate = new Date(today)
                    startDate.setDate(today.getDate() - days)
                    endDate = new Date(today)
                }
                break
            case "last":
            default:
                if (days === 0) {
                    // Yesterday only
                    startDate = new Date(today)
                    startDate.setDate(today.getDate() - 1)
                    endDate = new Date(today)
                    endDate.setDate(today.getDate() - 1)
                } else if (days === 7 && type === "last") {
                    // Last Week (Previous complete Monday to Sunday)
                    const lastMonday = getMondayOfWeek(today, -1)
                    const lastSunday = getSundayOfWeek(lastMonday)
                    startDate = lastMonday
                    endDate = lastSunday
                    setCurrentWeekOffset(-1)
                } else if (days === 30 && type === "last") {
                    // Last Month (1st to last day of previous month)
                    const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
                    startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
                    endDate = new Date(firstDayThisMonth.getTime() - 1) // Last day of previous month
                } else {
                    // Last X days (X days ago to today, NOT complete weeks)
                    startDate = new Date(today)
                    startDate.setDate(today.getDate() - days + 1) // Include today in the count
                    endDate = new Date(today)
                }
                break
        }

        // Set time properly
        startDate.setHours(0, 0, 0, 0)
        endDate.setHours(23, 59, 59, 999)

        onDateRangeChange(startDate.toISOString(), endDate.toISOString())
    }

    const quickOptions = [
        { label: "Yesterday", action: () => handleQuickSelect(0) },
        { label: "Last 7 days", action: () => handleQuickSelect(7) },
        { label: "Last 14 days", action: () => handleQuickSelect(14) },
        { label: "Last 30 days", action: () => handleQuickSelect(30) },
        { label: "This Week", action: () => handleQuickSelect(7, "this") },
        { label: "Last Week", action: () => handleQuickSelect(7, "last") },
        { label: "This Month", action: () => handleQuickSelect(30, "this") },
        { label: "Last Month", action: () => handleQuickSelect(30, "last") },
    ]

    const formatDateRange = () => {
        if (!dateRange?.from) return placeholder

        if (dateRange.from && !dateRange.to) {
            return format(dateRange.from, "MM/dd/yyyy", { locale: enUS })
        }

        if (dateRange.from && dateRange.to) {
            return `${format(dateRange.from, "MM/dd/yyyy", { locale: enUS })} - ${format(dateRange.to, "MM/dd/yyyy", { locale: enUS })}`
        }

        return placeholder
    }

    const getWeekLabel = (offset: number) => {
        if (offset === 0) return "This Week"
        if (offset === -1) return "Last Week"
        if (offset > 0) return `${offset} Week${offset > 1 ? "s" : ""} Ahead`
        return `${Math.abs(offset)} Week${Math.abs(offset) > 1 ? "s" : ""} Ago`
    }

    const hasSelection = dateRange?.from || dateRange?.to

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !hasSelection && "text-muted-foreground")}
                        disabled={disabled}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatDateRange()}
                        {hasSelection && (
                            <X
                                className="ml-auto h-4 w-4 hover:text-destructive cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    console.log("X icon clicked")
                                    setCurrentWeekOffset(0)
                                    onDateRangeChange(undefined, undefined)
                                }}
                            />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex">
                        {/* Calendar Section */}
                        <div className="p-2">
                            {!dateRange?.from && <p className="text-xs text-muted-foreground mb-2">Select start date</p>}
                            {dateRange?.from && !dateRange?.to && (
                                <p className="text-xs text-muted-foreground mb-2">Select end date</p>
                            )}
                            {dateRange?.from && dateRange?.to && (
                                <p className="text-xs text-muted-foreground mb-2">Click another date to reselect</p>
                            )}
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={handleDateSelect}
                                numberOfMonths={1}
                                locale={enUS}
                                className="rounded-md"
                            />
                        </div>

                        {/* Quick Options Section */}
                        <div className="border-l p-2 w-36">
                            {/* Week Navigation */}
                            <div className="mb-3 border-b pb-2">
                                <div className="flex items-center justify-between mb-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={() => handleWeekNavigation(currentWeekOffset - 1)}
                                    >
                                        <ChevronLeft className="h-3 w-3" />
                                    </Button>
                                    <span className="text-xs font-medium">{getWeekLabel(currentWeekOffset)}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={() => handleWeekNavigation(currentWeekOffset + 1)}
                                    >
                                        <ChevronRight className="h-3 w-3" />
                                    </Button>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-xs h-6 bg-transparent"
                                    onClick={() => handleWeekNavigation(currentWeekOffset)}
                                >
                                    Select This Week
                                </Button>
                            </div>

                            {/* Quick Options */}
                            <div className="space-y-0.5">
                                {quickOptions.map((option) => (
                                    <Button
                                        key={option.label}
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-xs font-normal h-7 px-2"
                                        onClick={option.action}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t p-2">
                        <div className="flex gap-2 justify-between">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    console.log("Clear button in actions clicked")
                                    setCurrentWeekOffset(0)
                                    onDateRangeChange(undefined, undefined)
                                }}
                                className="text-xs bg-transparent"
                            >
                                Clear
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)} className="text-xs">
                                    Cancel
                                </Button>
                                <Button size="sm" onClick={() => setIsOpen(false)} disabled={!hasSelection} className="text-xs">
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default memo(DateRangePicker)
