"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface AppPaginationProps {
    currentPage: number
    totalPages: number
    type: "hashtag" | "timeline"
}

export function AppPagination({ currentPage, totalPages, type }: AppPaginationProps) {
    const getPageNumbers = () => {
        const pages = []
        const showPages = 5 // Show 5 page numbers at most

        let startPage = Math.max(1, currentPage - 2)
        const endPage = Math.min(totalPages, startPage + showPages - 1)

        // Adjust start if we're near the end
        if (endPage - startPage < showPages - 1) {
            startPage = Math.max(1, endPage - showPages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    const baseUrl = `/${type}/page`

    return (
        <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={`${baseUrl}/${currentPage - 1}`}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    prev
                </Link>
            ) : (
                <span className="flex items-center gap-1 px-3 py-2 text-sm font-mono text-muted-foreground/50 cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" />
                    prev
                </span>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {/* First page if not in range */}
                {getPageNumbers()[0] > 1 && (
                    <>
                        <Link
                            href={`${baseUrl}/1`}
                            className="px-3 py-2 text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors"
                        >
                            1
                        </Link>
                        {getPageNumbers()[0] > 2 && <span className="px-2 text-sm font-mono text-muted-foreground/50">...</span>}
                    </>
                )}

                {/* Page number buttons */}
                {getPageNumbers().map((page) => (
                    <Link
                        key={page}
                        href={`${baseUrl}/${page}`}
                        className={`px-3 py-2 text-sm font-mono transition-colors ${page === currentPage
                            ? "text-cyan-400 bg-cyan-400/10 rounded"
                            : "text-muted-foreground hover:text-cyan-400"
                            }`}
                    >
                        {page}
                    </Link>
                ))}

                {/* Last page if not in range */}
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                    <>
                        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                            <span className="px-2 text-sm font-mono text-muted-foreground/50">...</span>
                        )}
                        <Link
                            href={`${baseUrl}/${totalPages}`}
                            className="px-3 py-2 text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors"
                        >
                            {totalPages}
                        </Link>
                    </>
                )}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={`${baseUrl}/${currentPage + 1}`}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                    next
                    <ChevronRight className="h-4 w-4" />
                </Link>
            ) : (
                <span className="flex items-center gap-1 px-3 py-2 text-sm font-mono text-muted-foreground/50 cursor-not-allowed">
                    next
                    <ChevronRight className="h-4 w-4" />
                </span>
            )}
        </div>
    )
}
