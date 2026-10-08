import React from 'react'

export default function AddToCartSketelon() {
    return (

        <div className="space-y-6 animate-pulse">
            {/* Price skeleton */}
            <div className="h-8 bg-gray-200 rounded w-32"></div>

            {/* Attribute dropdown skeleton */}
            <div className="h-10 bg-gray-200 rounded w-full"></div>

            {/* Heights skeleton */}
            <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-20"></div>
                <div className="grid grid-cols-6 gap-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Widths skeleton */}
            <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-20"></div>
                <div className="grid grid-cols-6 gap-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Colors skeleton */}
            <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="flex flex-wrap gap-2">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    ))}
                </div>
            </div>

            {/* Footer skeleton */}
            <div className="flex items-end justify-between pt-4">
                <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="flex gap-3">
                    <div className="h-10 bg-gray-200 rounded w-40"></div>
                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
        </div>
    )
}
