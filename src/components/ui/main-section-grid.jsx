'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import LacaColors from '../LacaColors';
import CLink from '../CLink';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { api } from '@/lib/api';
import ColorCards from './ColorCards';

const MainSectionGrid = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get('covers');
      setData(response.data);
    } catch (error) {

    }
  }

  const isProduction = process.env.NODE_ENV === 'production';

  const IMAGE_BASE_URL = isProduction
    ? 'https://interapi.facepy.com/storage/'
    : 'http://localhost:8000/storage/';



    
  useEffect(() => {
    getData()
  }, [])


  return (
    <section className='max-w-7xl mx-auto px-2 md:px-4 py-8 md:py-12'>
      <div className='grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6'>
        {/* Main Hero Carousel */}
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 1000 }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className='hero-swiper'
          >
            {data.filter((slide) => parseInt(slide.is_main) === 1).map((item, index) => (
              <SwiperSlide key={index}>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center py-3 md:py-9 px-3 md:p-8'>
                  <div className='order-2 sm:order-1 space-y-4'>
                    {
                      item.price && (<div className='flex items-center gap-4'>
                        <span className='text-lg md:text-2xl sm:text-4xl font-bold text-red-600'>
                          {item.price}
                        </span>
                        <span className='text-sm text-gray-700 uppercase tracking-wider'>
                          À partir
                          <br />
                          De
                        </span>
                      </div>)
                    }
                    

                    <h2 className='text-lg sm:text-3xl font-semibold text-gray-900 hover:text-red-600 transition mb-2'>
                      {
                        item?.url
                          ? <CLink href={item.url}>{item.title}</CLink>
                          : <p>{item.title}</p>
                      }
                    </h2>

                    {
                      (item?.colors?.length > 0 || item?.color_views?.length > 0) && (
                        <ColorCards
                          colors={[
                            ...(item?.colors || []),
                            ...(item?.color_views || [])
                          ]}
                        />
                      )
                    }
                    <p className='text-gray-600 mb-7 text-sm md:text-base'>
                      {item.description}
                    </p>

                    <div className='flex justify-end md:justify-start w-full'>
                      <CLink
                        href={item.url || '#'}
                        className='rounded-lg flex gap-2 text-white bg-[#da3036] hover:bg-red-600 py-1.5 md:py-3 px-3 md:px-5 text-sm md:text-[17px] hover:text-white'
                      >
                        <span> Voir Plus</span>
                        <ArrowRight className='h-5 md:h-6' />
                      </CLink>
                    </div>
                  </div>
                  <div className='order-1 sm:order-2 mb-4 sm:mb-0 relative'>

                    <span className="absolute top-4 right-4  text-white text-xs md:text-sm font-bold px-4 py-1.5 animate-pulse">
                      <Image width={50} height={50} alt='New' src={'/icons/new-badge-3-256.png'} />
                    </span>

                    <Image
                      src={IMAGE_BASE_URL + item.image}
                      alt={item.title}
                      width={1000}
                      height={1000}
                      className='w-full h-auto object-contain max-h-[300px] md:max-h-[400px]'
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>
        </div>

        {/* Side Products */}
        <div className='grid sm:grid-cols-2 xl:grid-cols-2 gap-6'>

          {data.filter((slide) => parseInt(slide.is_main) === 0).map((product, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-sm p-3 md:p-4 flex items-center justify-between hover:shadow-sm transition-shadow'
            >
              <div className='space-y-4 flex-1'>
                <h3 className='text-base md:text-xl font-semibold text-gray-900 hover:text-red-600 transition'>
                  <CLink href={product.url}>{product.title}</CLink>
                </h3>
                <div>
                  <p className='text-xs text-gray-500 uppercase mb-2'>
                    {product.subtitle}
                  </p>
                  {
                    product.price && <div className='flex items-center gap-3'>
                      <span className='text-gray-400'>À partir</span>
                      <span className='text-lg font-bold text-red-600'>
                        {product.price} MAD
                      </span>
                    </div>
                  }
                  
                </div>
              </div>
              <div className='ml-4 flex-shrink-0'>
                <CLink href={product.url}>
                  <Image
                    src={IMAGE_BASE_URL + product.image}
                    alt={product.title}
                    // fill
                    width={200}
                    height={200}
                    className='w-32 h-32 object-contain'
                  />
                </CLink>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
};

export default MainSectionGrid;