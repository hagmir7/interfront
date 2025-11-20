"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Eye, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import { AddToCartModal } from "./AddToCartModal"

const ProductCard = ({
  name = "True Wireless Noise Cancelling Headphone",
  images = [],
  price = 899,
  price_format = 930,
  rating = 4,
  id = 0,
  reviewCount = 0,
  slug = "/products/true-wireless-noise-cancelling-headphone",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"}`}
        />
      ))
  }

  const handleAddToCart = (options) => {
    console.log(options);
    
  }

  const imageUrl =
    images && images.length > 0
      ? `https://intercocina.com/storage/public/${images[0]?.image}`
      : "/modern-tech-product.png"

  return (
    <>
      <div className="group relative transition-all duration-300 shadow-sm hover:shadow-lg rounded-lg p-4 bg-white">
        <div className="relative overflow-hidden rounded-lg bg-gray-50 mb-4">
          <Link href={`/product/${slug}`} className="block">
            <Image
              alt={name}
              loading="lazy"
              width={600}
              height={600}
              src={imageUrl || "/placeholder.svg"}
              className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 pb-4 space-x-2">
            <Link
              href={`/product/${slug}`}
              aria-label="Quick view"
              className="bg-white shadow-md rounded-full p-2 hover:bg-blue-50 transition-colors"
            >
              <Eye className="w-5 h-5 text-gray-700 hover:text-blue-600" />
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Ajouter</span>
            </button>

            <button
              aria-label="Favorite"
              className="bg-white shadow-md rounded-full p-2 hover:bg-red-50 transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-700 hover:text-red-600" />
            </button>
          </div>
        </div>

        <Link href={`/product/${slug}`} className="block">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="text-sm text-gray-500 ml-2">({reviewCount})</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2">{name}</h3>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-red-600">{price_format ? price_format : price} MAD</span>
          </div>
        </Link>
      </div>

      <AddToCartModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={{
          name,
          price,
          price_format,
          images,
          slug,
          id
        }}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}

export default ProductCard
