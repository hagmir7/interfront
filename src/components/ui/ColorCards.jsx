"use client";

import Image from "next/image";
import React from "react";

export default function ColorCards({ colors }) {

  const isProduction = process.env.NODE_ENV === 'production';

  const IMAGE_BASE_URL = isProduction
      ? 'https://https://interapi.facepy.com//storage/'
      : 'http://localhost:8000/storage/';


  return (
    <div className='text-left'>
      <p className='font-bold text-gray-700 mb-3 text-sm md:text-base'>
        Couleurs disponibles
      </p>

      <ul className='flex flex-wrap gap-1 md:gap-2 mb-4'>
        {colors?.map((color) => {

          const hasHex =
            color.code && color.code.startsWith("#");

          const imageUrl = `${IMAGE_BASE_URL}${color.image}`;

          return (
            <li
              key={color.id}
              className='color-box group text-center me-1 md:me-3 relative'
            >
              <div
                className='inline-flex items-center justify-between w-full p-4 text-gray-500 border-gray-500 rounded-lg cursor-pointer border md:border-2 hover:text-gray-600 hover:bg-gray-100'
                style={
                  hasHex
                    ? { backgroundColor: color.code }
                    : { backgroundImage: `url(${imageUrl})` }
                }
              ></div>

              <div
                className='-top-56 hidden absolute overflow-hidden bg-neutral-950 ease-out left-1/2 p-0 border-black border-2 group-hover:block rounded text-center text-sm text-white transition-all w-40 whitespace-nowrap z-10'
                role='tooltip'
              >
                {color.name}

                {hasHex ? (
                  <div
                    className='w-full h-24'
                    style={{ backgroundColor: color.code }}
                  />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    className='w-full'
                    alt={color.name}
                    src={imageUrl}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
