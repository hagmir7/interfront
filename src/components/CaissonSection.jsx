"use client"

import React, { useState } from 'react'
import { Star, CheckCircle } from 'lucide-react'
import CLink from './CLink'
import Image from 'next/image'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const CaissonSection = () => {

  const images = [
     {
      src: 'https://interapi.facepy.com/storage/01J96VEEPMQRW9VHPMR9NQJ8VB.png',
      title: ' Caisson de Cuisine Blanc - Meuble bas',
      link: '/category/caisson-hydrofuge?type=hydrofuge-bas',
    },

    {
      src: 'https://interapi.facepy.com/storage/01JD542CJ2N520EJX56Y445YFF.png',
      title: 'Caisson de Cuisine Hydrofuge - Meuble bas',
      link: '/category/caisson-hydrofuge?type=hydrofuge-haut',
    },
   
    {
      src: 'https://interapi.facepy.com/storage/01J96TYBTJ8JD7VVS3MSW9QD5C.png',
      title: 'Caisson de Cuisine Blanc – Meuble Haut',
      link: '/category/caisson-hydrofuge?type=hydrofuge-colonne',
    },

        {
      src: 'https://interapi.facepy.com/storage/01JD7C9KAEDZVYXG1WJ59GT17A.png',
      title: 'Caisson de Cuisine Hydrofuge – Meuble Haut',
      link: '/category/caisson-hydrofuge?type=hydrofuge-colonne',
    },
  ]

  const features = [
    'Recyclable',
    'Épaisseur 18mm',
    'Durabilité & Longévité',
    'Haute résistance',
    'Densité élevée',
    'Écologique',
    "Résistant à l'humidité",
    'Résistant à la chaleur',
    'Finition Stone',
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-6">
      <div className="flex flex-col lg:flex-row bg-white shadow-sm rounded-xl p-4 md:p-6">

        {/* Image Swiper */}
        <div className="w-full lg:w-96 lg:max-w-[370px] rounded-3xl overflow-hidden mb-6 lg:mb-0 lg:mr-7">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rounded-3xl"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img.src}
                  alt={img.title}
                  width={700}
                  height={700}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div className="flex-1">

          {/* Dynamic title ONLY */}
          <div className="mb-4">
            <h4 className="text-xl sm:text-2xl font-semibold mb-2">
              <a
                href={images[activeIndex].link}
                className="text-gray-900 hover:text-red-600 transition-colors"
              >
                {images[activeIndex].title}
              </a>
            </h4>

            {/* Rating */}
            <ul className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <li key={star}>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm font-light leading-7 mb-6 hidden md:block">
            It is a long established fact that a reader will be distracted
            by the readable content of a page when looking at its layout.
          </p>

          {/* Features */}
          <div className="hidden lg:block mb-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <CheckCircle className="text-green-500 w-4 h-4 mt-0.5" />
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <CLink
              href="/category/caisson-hydrofuge?type=hydrofuge-haut"
              className="py-2 px-2 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
            >
              Meuble Haut
            </CLink>

            <CLink
              href="/category/caisson-hydrofuge?type=hydrofuge-bas"
              className="py-2 px-2 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
            >
              Meuble Bas
            </CLink>

            <CLink
              href="/category/caisson-hydrofuge?type=hydrofuge-colonne"
              className="py-2 px-2 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
            >
              Meuble Colonne
            </CLink>

            <CLink
              href="/category/accessoiriser?type=racrocheurs"
              className="py-2 px-2 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
            >
              Accessoires
            </CLink>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CaissonSection
