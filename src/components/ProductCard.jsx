
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Eye, ShoppingCart, Heart } from "lucide-react";
import { AddToCartModal } from "./AddToCartModal";

const BASE_IMAGE_URL = "https://app.intercocina.com";

const getImageUrl = (firstImage) => {
  const image =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.image;

  if (typeof image !== "string" || !image.trim()) {
    return "/modern-tech-product.png";
  }

  const path = image.trim();

  if (/^https?:\/\//i.test(path)) {
    return path.replace(/(\/storage)+\//g, "/storage/");
  }

  const cleanPath = path
    .replace(/^\/+/, "")
    .replace(/^(storage\/)+/, "");

  return `${BASE_IMAGE_URL}/storage/${cleanPath}`;
};

const ProductCard = ({
  name,
  first_image,
  price = null,
  price_format = null,
  rating = 0,
  id = 0,
  reviewCount = 0,
  slug,
  type_id,
  is_new,
  family_id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const imageUrl = getImageUrl(first_image);

  const productUrl = slug
    ? `/product/${slug}`
    : "#";

  const isNew = Number(is_new) === 1;

  const normalizedRating = Math.max(
    0,
    Math.min(5, Number(rating) || 0)
  );

  const normalizedReviewCount = Math.max(
    0,
    Number(reviewCount) || 0
  );

  const numericPrice = Number(price) || 0;

  const hasPriceFormat =
    price_format !== null &&
    price_format !== undefined &&
    String(price_format).trim() !== "";

  const formattedPrice = hasPriceFormat
    ? String(price_format)
    : numericPrice > 0
      ? String(price)
      : null;

  const hasPrice = formattedPrice !== null &&
    formattedPrice !== "0" &&
    formattedPrice !== "0.00";

  const canAddToCart =
    hasPrice &&
    numericPrice !== 0 || (
      hasPrice &&
      hasPriceFormat
    );

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 md:w-4 md:h-4 ${
          index < Math.floor(normalizedRating)
            ? "fill-yellow-500 text-yellow-500"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    setIsModalOpen(true);
  };

  const handleFavorite = () => {
    setIsFavorite((previous) => !previous);
  };

  return (
    <>
      <div className="group relative flex h-full flex-col rounded-lg bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-lg md:p-4">
        {/* Product Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-50">
          {/* New Badge */}
          {isNew && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
              Nouveau
            </span>
          )}

          <Link
            href={productUrl}
            className="block"
            aria-label={`Voir ${name}`}
          >
            <Image
              alt={name || "Produit"}
              loading="lazy"
              width={600}
              height={600}
              src={imageUrl}
              className={`h-56 w-full transition-transform duration-300 group-hover:scale-105 xl:h-64 ${
                Number(type_id) === 14
                  ? "object-cover object-center"
                  : "object-contain"
              }`}
            />
          </Link>

          {/* Product Actions */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full transform items-center justify-center gap-2 pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {/* Quick View */}
            <Link
              href={productUrl}
              aria-label="Quick view"
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-blue-50"
            >
              <Eye className="h-5 w-5 text-gray-700 hover:text-blue-600" />
            </Link>

            {/* Add To Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs transition-colors md:px-4 md:text-sm ${
                !canAddToCart
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "cursor-pointer bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
              <span>Ajouter</span>
            </button>

            {/* Favorite */}
            <button
              type="button"
              onClick={handleFavorite}
              aria-label={
                isFavorite
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"
              }
              aria-pressed={isFavorite}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-red-50"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-700 hover:text-red-600"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <Link
          href={productUrl}
          className="flex flex-1 flex-col"
        >
          {/* Rating */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {renderStars()}

              <span className="ml-2 text-xs text-gray-500 md:text-sm">
                ({normalizedReviewCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="mb-2 text-sm font-semibold text-gray-800 transition-colors hover:text-blue-600 md:text-base">
            {name}
          </h3>

          {/* Product Price */}
          {hasPrice && (
            <div className="mt-auto flex items-center gap-2">
              <span className="text-sm font-bold text-red-600 md:text-lg">
                {formattedPrice} MAD
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Add To Cart Modal */}
      <AddToCartModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={{
          id,
          name,
          price,
          price_format,
          slug,
          image: imageUrl,
          family_id,
        }}
      />
    </>
  );
};

export default ProductCard;
