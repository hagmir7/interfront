'use client'
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import CLink from './CLink';
import Image from 'next/image';


export function ColorCard({ color }) {
  const [isHovered, setIsHovered] = useState(false);

    const IMAGE_BASE_URL = isProduction
      ? 'https://https://interapi.facepy.com//storage/'
      : 'http://localhost:8000/storage/';
  

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative w-full aspect-[205/200] overflow-hidden">
          <Image
            src={`https://interapi.facepy.com/storage/${color.image}`}
            alt={color.name}
            width={200}
            height={300}
            className={`h-full w-full object-cover object-top transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <span className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full bg-red-500 shadow-lg">
            {color?.code}
          </span>

          {isHovered && (
            <CLink
              href={`/product/${color.product_slug}`}
              className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-lg transform transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-slate-900" />
            </CLink>
          )}
        </div>

        <div className="p-4 text-center">
          <h4 className="text-slate-900 font-semibold text-sm lg:text-base transition-colors group-hover:text-red-600">
            {color.name}
          </h4>
        </div>
      </div>
    </div>
  );
}