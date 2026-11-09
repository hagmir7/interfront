import React from "react"

function Skeleton({ className = "" }) {
    return <div aria-hidden="true" className={`bg-gray-200 rounded-lg animate-pulse ${className}`} />
}

function SkeletonGroup({ label = "w-24", children }) {
    return (
        <div className="space-y-2">
            <Skeleton className={`h-4 ${label}`} />
            {children}
        </div>
    )
}

export default function DimentionLoading() {
    return (
        <div role="status" aria-busy="true" aria-live="polite" className="space-y-6 text-left">
            <span className="sr-only">Chargement...</span>

            {/* Price + rating
            <div className="flex items-center gap-5">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="hidden md:block h-9 w-16" />
            </div> */}

            {/* Façade type + special */}
            <div className="md:flex gap-4 space-y-3 md:space-y-0">
                <SkeletonGroup label="w-28">
                    <Skeleton className="h-11 w-full md:w-64" />
                </SkeletonGroup>
                <SkeletonGroup label="w-16">
                    <Skeleton className="h-11 w-full md:w-64" />
                </SkeletonGroup>
            </div>

            {/* Colors */}
            <SkeletonGroup label="w-20">
                <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-12" />
                    ))}
                </div>
            </SkeletonGroup>

            {/* Height + width */}
            {["w-20", "w-24"].map((label) => (
                <SkeletonGroup key={label} label={label}>
                    <div className="flex flex-wrap gap-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-9 w-14" />
                        ))}
                    </div>
                </SkeletonGroup>
            ))}

            {/* Quantity + add to cart */}
            {/* <div className="flex flex-col min-[400px]:flex-row gap-3 pt-2">
                <Skeleton className="h-12 w-full min-[400px]:w-48 rounded-full" />
                <Skeleton className="h-12 w-full rounded-full" />
            </div> */}
        </div>
    )
}