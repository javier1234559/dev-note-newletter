"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { memo } from "react"

interface PageSizeSelectorProps {
    pageSize?: number
    onPageSizeChange?: (pageSize: number) => void
    options?: number[]
    disabled?: boolean
}

function PageSizeSelector({
    pageSize = 8,
    onPageSizeChange = () => { },
    options = [4, 8, 10, 20, 50, 100],
    disabled = false,
}: PageSizeSelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Show</span>
            <Select
                value={pageSize.toString()}
                onValueChange={(value) => onPageSizeChange(Number(value))}
                disabled={disabled}
            >
                <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground whitespace-nowrap">items/page</span>
        </div>
    )
}

export default memo(PageSizeSelector)
