"use client"
import { useState } from "react";
import Carousel from "@/components/Carousel";
import Product from "@/components/Product";

const ProductClient = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentColor, setCurrentColor] = useState(null)

  const handleColorChange = (image) => {
    setCurrentColor(image);
  };


  const handleImageChange = (imageIndex) => {
    // console.log('Current image index:', imageIndex);
    // You can add additional logic here if needed
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 py-3 md:py-6 rounded-xl border">
      <div className="w-full px-4" style={{ margin: '0 auto' }}>
        <Carousel
          images={product.images}
          onImageChange={handleImageChange}
          currentColor={currentColor}
        />
      </div>
      <div className="flex justify-center">
        <div className="pro-detail w-full md:max-lg:max-w-[608px] lg:pl-8 xl:pl-12 max-lg:mx-auto max-lg:mt-6 px-3">
          <div className="sm:flex flex-initial items-center justify-between gap-6 mb-2">
            <div className="text-left">
              <h1 className="font-manrope font-bold  text-xl  sm:text-2xl leading-10 text-gray-900 mb-2">
                {product.name}
              </h1>
              <h2 className="font-normal text-base text-gray-500 text-left">
                {product.type}
              </h2>
            </div>

            {product?.id && (
              <a href={`/admin/products/${product.id}/edit`} className="group transition-all duration-500 p-0.5 sm:block hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path className="stroke-blue-600 transition-all duration-500 group-hover:stroke-blue-700" d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z"></path>
                    <path className="stroke-blue-600 transition-all duration-500 group-hover:stroke-blue-700" d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"></path>
                  </g>
                </svg>
              </a>
            )}
          </div>

          {
            product?.description && <p className="mb-3 text-left">{product?.description}</p>
          }

          <Product
            product={product}
            selectedColor={selectedColor}
            setColor={setSelectedColor}
            onColorChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductClient;