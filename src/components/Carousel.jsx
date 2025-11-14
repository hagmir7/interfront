'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import Image from 'next/image';

const Carousel = ({ images, onImageChange, currentColor }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState(images || []);

  // Update images when color changes
  useEffect(() => {
    if (!images || images.length === 0) return;

    let filteredImages = images;

    if (currentColor) {
      const colorImages = images.filter(img => img.color_id === currentColor);
      filteredImages = colorImages.length > 0 ? colorImages : images;
    }

    setCurrentImages(filteredImages);
    setActiveIndex(0);

    if (mainSwiper?.slideTo) {
      mainSwiper.slideTo(0);
    }
  }, [images, currentColor]);

  // Initialize PhotoSwipe
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <div>
      {/* Main Carousel */}
      <div id="gallery" className='relative' style={{ userSelect: 'none' }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Thumbs]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={currentImages.length > 1}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            if (onImageChange) {
              onImageChange(swiper.realIndex);
            }
          }}
          key={currentColor || 'all'}
        >
          {currentImages.map((image, index) => (
            <SwiperSlide key={`${image.image}-${index}`}>
              <a
                href={`https://intercocina.com/storage/public/${image.image}`}
                data-pswp-width="1875"
                data-pswp-height="2500"
                onClick={(e) => e.preventDefault()}
              >
                <Image
                  src={`https://intercocina.com/storage/public/${image.image}`}
                  className="lazy-image max-lg:mx-auto rounded-2xl m-auto max-h-[500px] loaded transition-opacity duration-300"
                  alt={`Product ${index + 1}`}
                  loading="lazy"
                  width={100}
                  height={100}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="swiper-button-prev !text-blue-600 !bg-white !rounded-full !shadow-lg !w-10 !h-10 !mt-[-20px] after:!text-base"></div>
        <div className="swiper-button-next !text-blue-600 !bg-white !rounded-full !shadow-lg !w-10 !h-10 !mt-[-20px] after:!text-base"></div>
      </div>

      {/* Thumbnails Carousel */}
      {images?.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          spaceBetween={10}
          slidesPerView={Math.min(4, images.length)}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          style={{ padding: '10px' }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`thumb-${image.image}-${index}`}
              style={{ width: '100px' }}
              onClick={() => {
                // find index of this image inside filteredImages
                const targetIndex = currentImages.findIndex(ci => ci.image === image.image);
                if (targetIndex !== -1 && mainSwiper) {
                  mainSwiper.slideToLoop(targetIndex); // go to that slide
                }
              }}
            >
              <Image
                src={`https://intercocina.com/storage/public/${image.image}`}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}

                style={{
                  // width: '100%',
                  height: '80px',
                  // objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: currentImages.some(ci => ci.image === image.image)
                    ? activeIndex === currentImages.findIndex(ci => ci.image === image.image)
                      ? '3px solid #e4373a'
                      : '2px solid #ccc'
                    : '2px solid transparent',
                  opacity: currentImages.some(ci => ci.image === image.image) ? 1 : 0.4,
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                className="hover:opacity-80"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
