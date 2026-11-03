"use client"
import { useState } from "react";
import Carousel from "@/components/Carousel";
import Product from "@/components/Product";

const ProductClient = ({ product, code }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);

  const handleColorChange = (image) => {
    setCurrentColor(image);
  };

  const handleImageChange = (imageIndex) => {
    // You can add additional logic here if needed
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 py-3 md:py-6 md:rounded-xl md:border">
      <div className="w-full px-2 md:px-4" style={{ margin: '0 auto' }}>
        <Carousel
          images={product.images}
          onImageChange={handleImageChange}
          currentColor={currentColor}
          productName={product.name}
        />
      </div>

      <div className="flex justify-center">
        <div className="pro-detail w-full md:max-lg:max-w-[608px] lg:pl-8 xl:pl-12 max-lg:mx-auto max-lg:mt-6 px-3">
          <div className="sm:flex flex-initial items-center justify-between gap-6 mb-2">
            <div className="text-left">
              <h1 className="font-manrope font-bold text-xl sm:text-2xl leading-10 text-gray-900 md:mb-2">
                {product.name}
              </h1>
              <h2 className="font-normal text-base text-gray-500 text-left">
                {product?.type?.name} {code && '| ' + code}
              </h2>
            </div>
          </div>

          {product?.description && (
            <p className="mb-3 text-left">{product.description}</p>
          )}

          <Product
            product={product}
            selectedColor={selectedColor}
            setColor={setSelectedColor}
            onColorChange={handleColorChange}
            initialCode={code}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductClient;