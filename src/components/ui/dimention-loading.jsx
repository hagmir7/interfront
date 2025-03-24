import React from 'react'

export default function DimentionLoading() {
    return (
        <div>
            <div role="status" className="bg-gray-300 rounded-sm animate-pulse w-full mr-4 h-16 mt-5">
                <span className="sr-only">Loading...</span>
            </div>
            <div role="status" className="bg-gray-300 rounded-sm animate-pulse w-full mr-4 h-16 mt-5">
                <span className="sr-only">Loading...</span>
            </div>
            <div role="status" className="bg-gray-300 rounded-sm animate-pulse w-full mr-4 h-16 mt-5">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
