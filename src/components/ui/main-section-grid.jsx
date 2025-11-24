'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import LacaColors from '../LacaColors';
import CLink from '../CLink';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const MainSectionGrid = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroCarouselData = [
    {
      discount: '50 MAD',
      title: 'Vittoria - Laca Group 3',
      description: 'Vittoria : une pièce d’exception en panneaux MDF à double face, sublimée par une peinture haut de gamme. Disponible dans nos finitions Port, Cassroliers et Tiroir pour s’adapter à tous vos projets design.',
      image: 'https://intercocina.com/storage/public/01JJ9S1JJHSJZ9S8143SGR6MAT.png',
      link: '/product/facade-laca-g3-vittoria'
    },
    {
      discount: '50 MAD',
      title: 'Foggia - Laca Group 3',
      description: 'Foggia : une pièce d’exception en panneaux MDF à double face, sublimée par une peinture haut de gamme. Disponible dans nos finitions Port, Cassroliers et Tiroir pour s’adapter à tous vos projets design.',
      image: 'https://intercocina.com/storage/public/01JJ9JPT9EY7NCA37RW72P7PF7.png',
      link: '/product/facade-laca-g1-atania'
    },
    {
      discount: '50 MAD',
      title: 'Foggia - Laca Group 3',
      description: 'Catania : une pièce d’exception en panneaux MDF à double face, sublimée par une peinture haut de gamme. Disponible dans nos finitions Port, Cassroliers et Tiroir pour s’adapter à tous vos projets design.',
      image: 'https://intercocina.com/storage/public/01JJ9M513KM8P5MKBGMRCD412S.png',
      link: '/product/facade-laca-g2-foggia'
    }
  ];

  const sideProductsData = [
    {
      title: 'Mesina - Laca Group 2',
      salePrice: 50,
      image: 'https://intercocina.com/storage/public/01JJ9MCKJRG0S9EG8Q2MD8NC6H.png',
      link: '/product/facade-laca-g2-mesina'
    },
    {
      title: 'Sicilia - Laca Group 1',
      salePrice: 50,
      image: 'https://intercocina.com/storage/public/01JJ9KA7NPCD7DPG3EK973D2HK.png',
      link: '/product/facade-laca-g1-sicilia'
    }
  ];

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
            {heroCarouselData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center py-9 p-6 md:p-8'>
                  <div className='order-2 sm:order-1 space-y-4'>
                    <div className='flex items-center gap-4'>
                      <span className='text-lg md:text-2xl sm:text-4xl font-bold text-red-600'>
                        {item.discount}
                      </span>
                      <span className='text-sm text-gray-700 uppercase tracking-wider'>
                        À partir
                        <br />
                        De
                      </span>
                    </div>
                    <h2 className='text-md sm:text-3xl font-semibold text-gray-900 hover:text-red-600 transition'>
                      <CLink href={item.link}>{item.title}</CLink>
                    </h2>
                    <LacaColors />
                    <p className='text-gray-600 mb-7 text-sm md:text-base'>{item.description}</p>
                    <div className='flex justify-end md:justify-start w-full'>
                      <CLink
                        href={item.link}
                        className='rounded-lg flex gap-2  text-white bg-[#da3036] hover:bg-red-600 py-1.5 md:py-3 px-3 md:px-5 text-sm md:text-[17px] hover:text-white'
                      >
                        <span> Voir Plus</span>
                        <ArrowRight className='h-5 md:h-6' />
                      </CLink>
                    </div>
                  </div>
                  <div className='order-1 sm:order-2 mb-4 sm:mb-0'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={200}
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
          {sideProductsData.map((product, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-sm p-3 md:p-6 flex items-center justify-between hover:shadow-sm transition-shadow'
            >
              <div className='space-y-4 flex-1'>
                <h3 className='text-base md:text-xl font-semibold text-gray-900 hover:text-red-600 transition'>
                  <CLink href={product.link}>{product.title}</CLink>
                </h3>
                <div>
                  <p className='text-xs text-gray-500 uppercase mb-2'>
                    Matte et brillant
                  </p>
                  <div className='flex items-center gap-3'>
                    <span className='text-gray-400'>À partir</span>
                    <span className='text-lg font-bold text-red-600'>
                      {product.salePrice} MAD
                    </span>
                  </div>
                </div>
              </div>
              <div className='ml-4 flex-shrink-0'>
                <CLink href={product.link}>
                <Image
                  src={product.image}
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