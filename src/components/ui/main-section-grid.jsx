'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const MainSectionGrid = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroCarouselData = [
    {
      discount: '30%',
      title: 'Vittoria - Laca G3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ipsum at risus euismod lobortis in',
      image: 'https://intercocina.com/storage/public/01JJ9S1JJHSJZ9S8143SGR6MAT.png',
      link: '#'
    },
    {
      discount: '30%',
      title: 'Macbook Pro M4 Pro - 512/16GB',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ipsum at risus euismod lobortis in',
      image: 'https://intercocina.com/storage/public/01JJ9RTWHSK7XTNH0XY66D4GPG.png',
      link: '#'
    },
    {
      discount: '30%',
      title: 'True Wireless Noise Cancelling Headphone',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ipsum at risus euismod lobortis in',
      image: 'https://intercocina.com/storage/public/01JJ9M513KM8P5MKBGMRCD412S.png',
      link: '#'
    }
  ];

  const sideProductsData = [
    {
      title: 'Macbook Pro - 512/16GB',
      originalPrice: 500,
      salePrice: 450,
      image: 'https://cdn.sanity.io/images/rpq7htxl/production/d5e6cc8a016057b6ef12174fd9fac9c64f1a3263-175x213.png',
      link: '/products/apple-ipad-air-5th-gen---64gb'
    },
    {
      title: 'iPhone 16 Pro - 8/128GB',
      originalPrice: 899,
      salePrice: 600,
      image: 'https://cdn.sanity.io/images/rpq7htxl/production/0e9a19b927fde251ee542f3fdd6767b2e75c8f60-175x213.png',
      link: '/products/iphone-14-plus--6128gb'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
    <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
      {/* Main Hero Carousel */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="hero-swiper"
        >
          {heroCarouselData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center p-6 md:p-8">
                <div className="order-2 sm:order-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-4xl font-bold text-red-600">
                      {item.discount}
                    </span>
                    <span className="text-sm text-gray-700 uppercase tracking-wider">
                      Sale<br />Off
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 hover:text-blue-600 transition">
                    <a href={item.link}>{item.title}</a>
                  </h2>
                  <p className="text-gray-600 mb-7">{item.description}</p>
                  <a href={item.link} className="rounded-lg  text-white bg-[#da3036] hover:bg-red-600 py-3 px-5 text-[17px] text-sm hover:text-white">
                    Shop Now
                  </a>
                </div>
                <div className="order-1 sm:order-2 mb-4 sm:mb-0">
                  <img src={item.image} alt={item.title} className="w-full h-auto object-contain max-h-[400px]" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side Products */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {sideProductsData.map((product, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-sm transition-shadow"
          >
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
                <a href={product.link}>{product.title}</a>
              </h3>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">
                  Limited Time Offer
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-red-600">
                    ${product.salePrice}
                  </span>
                  <span className="text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-32 h-32 object-contain" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default MainSectionGrid;