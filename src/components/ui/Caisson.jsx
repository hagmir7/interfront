"use client"
import React, { useState } from 'react'
import { ShoppingCart, Heart, Star } from 'lucide-react'

const Caisson = () => {
  const [selectedColor, setSelectedColor] = useState('#24262B')
  const [isFavorited, setIsFavorited] = useState(false)

  const colors = [
    { id: 'color1', value: '#24262B', label: 'Dark Gray' },
    { id: 'color2', value: '#8CB2D1', label: 'Light Blue' },
    { id: 'color3', value: '#0D775E', label: 'Green' },
  ]

  const handleColorChange = (color) => {
    setSelectedColor(color)
  }

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', { color: selectedColor })
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 md:py-12'>
      <div className='flex mb-7 max-sm:block bg-white shadow-sm rounded-xl px-3'>
        {/* Product Image */}
        <div className='max-w-[400px] rounded-3xl mr-7 overflow-hidden max-md:mr-4 max-sm:!mr-0 max-sm:w-full max-sm:max-w-full'>
          <img
            src='https://intercocina.com/storage/public/01JAA3TB6QYCZ5E8XS1AVPBK0R.webp'
            alt='Meuble de cuisine Hydrofige'
            className='object-cover w-full h-full'
          />
        </div>

        {/* Product Details */}
        <div className='flex-1 py-6 max-md:pt-5'>
          {/* Header with Title and Rating */}
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-xl font-semibold mb-1'>
                <a href='#' className='text-gray-900 hover:text-blue-600'>
                  Meuble de cuisine Hydrofige
                </a>
              </h4>
              <ul className='flex'>
                <li>
                  <a
                    className='text-sm mr-1 text-gray-600 hover:text-blue-600'
                    href='#'
                  >
                    Accessories,
                  </a>
                </li>
                <li>
                  <a
                    className='text-sm mr-1 text-gray-600 hover:text-blue-600'
                    href='#'
                  >
                    Sunglasses
                  </a>
                </li>
              </ul>
            </div>

            {/* Rating Section */}
            <div className='flex flex-col ml-4 text-center min-w-24'>
              <ul className='flex gap-0.5 justify-center mb-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <li key={star}>
                    <Star
                      className={`w-4 h-4 ${
                        star <= 3
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </li>
                ))}
              </ul>
              <span>
                <a
                  className='text-gray-600 text-xs hover:text-blue-600'
                  href='#'
                >
                  370 Review
                </a>
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div className='mt-4'>
            <div className='mb-4'>
              <p className='text-gray-600 pr-7 max-lg:pr-0 mb-4 max-lg:mb-0 text-sm font-light max-md:hidden'>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>
            </div>

            {/* Price and Options Section */}
            <div className='flex justify-between items-center max-xl:block max-xl:mt-3'>
              <div className='flex items-center xl:mb-4 mb-2'>
                {/* Price */}
                <div className='mr-20 max-sm:mr-7'>
                  <span className='text-gray-600 text-sm inline-block'>
                    Price
                  </span>
                  <span className='font-medium text-xl block text-gray-900'>
                    $40.00
                  </span>
                </div>

                {/* Color Selection */}
                <div className='mr-20 max-sm:mr-7'>
                  <span className='mb-2 text-gray-600 text-sm inline-block'>
                    Color
                  </span>
                  <div className='flex items-center gap-2'>
                    {colors.map((color) => (
                      <div key={color.id} className='relative'>
                        <input
                          type='radio'
                          name='productColor'
                          id={color.id}
                          value={color.value}
                          checked={selectedColor === color.value}
                          onChange={() => handleColorChange(color.value)}
                          className='opacity-0 absolute inset-0 cursor-pointer'
                        />
                        <label
                          htmlFor={color.id}
                          className={`w-4 h-4 rounded-full cursor-pointer border-2 ${
                            selectedColor === color.value
                              ? 'border-gray-800 ring-2 ring-gray-400'
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.label}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-2'>
                <button
                  onClick={handleAddToCart}
                  className='flex items-center gap-2 py-2 px-4 max-sm:px-2 text-base font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300'
                >
                  <ShoppingCart className='w-4 h-4 md:hidden' />
                  <span className='md:block hidden'>Add to cart</span>
                </button>

                <button
                  onClick={handleFavoriteToggle}
                  className={`w-11 h-11 flex items-center justify-center border rounded-xl transition-colors duration-300 ${
                    isFavorited
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-red-200 hover:text-red-600'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Caisson
