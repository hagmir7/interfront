'use client'
import React from "react";
import CLink from "./CLink";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mail, ShoppingCart } from "lucide-react";


const SectionConver = () => {
    return (
      <section className='relative bg-gradient-to-br from-blue-900 to-gray-800 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div
          className='absolute inset-0 bg-cover bg-center opacity-50'
          style={{
            backgroundImage: "url('/imgs/fabrica.jpeg')",
          }}
        ></div>

        <div className='container mx-auto px-4 py-24 md:py-32 relative z-10'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            {/* Left Side: Company Info */}
            <div className='w-full md:w-1/2 mb-12 md:mb-0'>
              <div className='flex flex-col order-2 gap-3 pt-6 space-y-4 col-span-full md:px-4 xl:order-1 xl:col-span-1 md:py-10'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center md:text-left md:leading-tight'>
                  <span
                    className='text-[#b6b6b7] font-black tracking-widest'
                    style={{ fontFamily: 'DOCK11-Heavy' }}
                  >
                    INTER
                  </span>
                  <span
                    className='text-[#ec2228] font-black tracking-widest'
                    style={{ fontFamily: 'DOCK11-Heavy, sans-serif' }}
                  >
                    COCINA
                  </span>{' '}
                  <br />
                  Leader des cuisines modernes au Maroc
                </h1>
                <p className='text-center text-white md:text-left text-lg font-semibold'>
                  Meubles de cuisine est conçue pour transformer votre espace en
                  un lieu d'inspiration gastronomique, où chaque détail compte.
                </p>
                <div className='flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4'>
                  <CLink
                    href='/contact'
                    className='bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-3 transition-all duration-300 flex items-center justify-center gap-3 text-white font-semibold'
                  >
                    <Mail size={20} />
                    <span>Contact</span>
                  </CLink>

                  <CLink
                    href='/shop'
                    className='bg-red-600 hover:bg-red-700 rounded-lg px-6 py-3 transition-all duration-300 flex items-center justify-center gap-3 text-white font-semibold shadow-lg'
                  >
                    <ShoppingCart size={20} />
                    <span>Produits</span>
                  </CLink>
                </div>
              </div>
            </div>

            {/* Right Side: Features */}
            <div className='w-full md:w-1/2 md:pl-12'>
              <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                className='hero-swiper'
              >
                <SwiperSlide>
                  <div className='swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full'>
                    <img
                      src='https://intercocina.com/storage/public/01JJ9S1JJHSJZ9S8143SGR6MAT.png'
                      className='h-96 object-center'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full'>
                    <img
                      src='https://intercocina.com/storage/public/01JJ9JPT9EY7NCA37RW72P7PF7.png'
                      className='h-96 object-center'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full'>
                    <img
                      src='https://intercocina.com/storage/public/01JJ9KRKCBEXK6V03HA4V8R74Y.png'
                      className='h-96 object-center'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full'>
                    <img
                      src='https://intercocina.com/storage/public/01JJ9M513KM8P5MKBGMRCD412S.png'
                      className='h-96 object-center'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full'>
                    <img
                      src='https://intercocina.com/storage/public/01JJ9RNXMMA92VV2PMMFH307XC.png'
                      className='h-96 object-center'
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div
          className='absolute bottom-0 left-0 right-0 h-[129px]'
          style={{
            backgroundImage: "url('/imgs/bg-inter1.png')",
            backgroundSize: '100px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top',
            transform: 'scaleY(-1)',
            opacity: '28%',
            bottom: '-46px',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            maskSize: 'cover',
          }}
        ></div>
      </section>
    )
};

export default SectionConver;
