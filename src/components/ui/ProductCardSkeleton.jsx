"use client"

import React from "react"

const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-4 animate-pulse bg-white">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>

      {/* Title Placeholder */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      {/* Stars Placeholder */}
      <div className="flex items-center space-x-1 mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
          ))}
        <div className="h-4 bg-gray-200 rounded w-6 ml-2"></div>
      </div>

      {/* Price Placeholder */}
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
    </div>
  )
}

export default ProductCardSkeleton
