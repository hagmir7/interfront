'use client'

import React from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'
import CLink from './CLink'

const CaissonSectionLeft = () => {
  return (
    <div className='max-w-7xl mx-auto px-2'>
      <div className='flex flex-col lg:flex-row mb-7 bg-white shadow-sm rounded-xl p-4 md:p-6'>
        
        {/* Product Image */}
        <div className='w-full order-1 lg:order-1 lg:w-96 lg:max-w-[370px] rounded-3xl overflow-hidden mb-6 lg:mb-0'>
          <CLink href='/product/caisse-tournant-pour-caisson-coin-antracite'>
            <Image
              src='https://interapi.facepy.com/storage/01JMA4TEWC1VRMJPB9KQYX9PVA.png'
              alt='Caisse tournant pour caisson coin'
              width={700}
              height={700}
              className='w-full h-full object-contain'
            />
          </CLink>
        </div>

        {/* Product Details */}
        <div className='flex-1 lg:ml-7 order-2 lg:order-2'>
          
          {/* Header */}
          <div className='mb-2'>
            <h4 className='text-xl sm:text-2xl font-semibold mb-2'>
              <CLink
                href='/category/accessoiriser'
                className='text-gray-900 hover:text-red-600 transition-colors'
              >
                Accessoires de cuisine
              </CLink>
            </h4>
          {/* Description */}
          <p className='text-gray-600 text-sm font-light leading-7 mb-2 hidden md:block'>
            Optimisez votre cuisine avec nos accessoires sur mesure, alliant design, confort et performance.
          </p>
             {/* Rating */}
            <ul className='flex gap-0.5'>
              {[1, 2, 3, 4, 5].map((star) => (
                <li key={star}>
                  <Star className='w-4 h-4 text-yellow-400 fill-current' />
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div className='hidden lg:block mb-6 mt-5'>
            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
              {[{
                path: '01JNJZ057XJK7M854GB4P3CBM0.png',
                alt: "tiroirs",
                link: "/category/accessoiriser?type=tiroir"
              },

              {
                path: '01JMEMTJ4ZWB5QG9XQTP5CBCDE.png',
                alt: "Egoutoire",
                link: "/product/etagere-a-assiettesverre-600-mm-avec-plateau"
              },

              {
                path: '01JM1YA6DGGY9YBAJTB9X59YA0.png',
                alt: "ecological",
                link: "/category/accessoiriser?type=ecological"
              }
              ].map((img) => (
                <li key={img.path}>
                  <CLink href={img.link}>
                    <Image
                      src={`https://interapi.facepy.com/storage/${img.path}`}
                      width={700}
                      height={700}
                      alt='inter'
                      className='border rounded-2xl'
                    />
                  </CLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className='mt-6'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
              {[
                { label: 'Tiroir', type: 'tiroir' },
                { label: 'Egoutoire', type: 'egoutoire' },
                { label: 'Charnières', type: 'charneir' },
                { label: 'Placard', type: 'placard' },
              ].map(({ label, type }) => (
                <CLink
                  key={type}
                  href={`/category/accessoiriser?type=${type}`}
                  className='py-2 px-4 border border-red-500 text-red-600 rounded-2xl uppercase flex items-center justify-center text-xs font-bold hover:bg-red-500 hover:text-white transition-colors duration-200 text-center'
                >
                  {label}
                </CLink>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CaissonSectionLeft
