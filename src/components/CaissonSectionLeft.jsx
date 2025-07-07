"use client"
import React, { useState } from 'react'
import { Star, CheckCircle } from 'lucide-react'
import CLink from './CLink';

const CaissonSectionLeft = () => {

  const features = [
    'Recyclable',
    'Épaisseur optimisée',
    'Durabilité & Longévité',
    'Haute résistance',
    'Densité élevée',
    'Écologique',
    "Résistant à l'humidité",
    'Résistant à la chaleur',
    'Finition blanc mate',
  ];

  return (
    <div className='max-w-7xl mx-auto px-2'>
      <div className='flex flex-col lg:flex-row mb-7 bg-white shadow-sm rounded-xl p-4 md:p-6'>
        {/* Product Details */}
        <div className='flex-1 lg:mr-7'>
          {/* Header with Title and Rating */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4'>
            <div className='flex-1'>
              <h4 className='text-xl sm:text-2xl font-semibold mb-2'>
                <a href='#' className='text-gray-900 hover:text-red-600 transition-colors'>
                  Caisson de Cuisine Blanc
                </a>
              </h4>
            </div>

            {/* Rating Section */}
            <div className='flex flex-col sm:items-center text-left sm:text-center min-w-fit'>
              <ul className='flex gap-0.5 mb-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <li key={star}>
                    <Star
                      className={`w-4 h-4 ${star <= 5
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                        }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Description */}
          <div className='mb-6'>
            <p className='text-gray-600 text-sm font-light leading-7 mb-4 hidden md:block'>
              It is a long established fact that a reader will be distracted
              by the readable content of a page when looking at its layout.
            </p>
            
            {/* Features Grid */}
            <div className="w-full">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 p-2 sm:p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <CheckCircle className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Category Tags Section */}
          <div className='mt-6'>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              <CLink
                href="/category/caissons?type=caisson-haut"
                className="py-2 px-3 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
              >
                Meuble Haut
              </CLink>
              <CLink
                href="/category/caissons?type=caisson-bas"
                className="py-2 px-3 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
              >
                Meuble Bas
              </CLink>
              <CLink
                href="/category/caissons?type=caisson-colonne"
                className="py-2 px-3 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
              >
                Meuble Colonne
              </CLink>
              <CLink
                href="/category/accessoiriser?type=racrocheurs"
                className="py-2 px-3 sm:px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center"
              >
                Accessoires
              </CLink>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className='w-full lg:w-96 lg:max-w-[370px] rounded-3xl overflow-hidden mb-6 lg:mb-0'>
          <img
            src='https://intercocina.com/storage/public/01J96VEEPMQRW9VHPMR9NQJ8VB.png'
            alt='Caisson de Cuisine Hydrofuge'
            className='w-full h-full'
          />
        </div>
      </div>
    </div>
  )
}

export default CaissonSectionLeft