'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const Carousel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize PhotoSwipe
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery', // Ensure this matches the container ID
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div>
      {/* Main Carousel */}
      <div id="gallery" style={{ userSelect: 'none' }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Thumbs]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          // autoplay={{ delay: 3000 }}
          loop={true}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <a
                href={image}
                data-pswp-width="1875"
                data-pswp-height="2500"
                key={'gallery' + '-' + index}
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src={`https://intercocina.com/storage/public/${image}`}
                  className='lazy-image max-lg:mx-auto rounded-2xl m-auto max-h-[500px] mt-0 loaded'
                  alt={`Product ${index + 1}`}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails Carousel */}
      <Swiper
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={4}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        
        style={{ padding: '10px' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{width: '100px'}}>
            <img
              src={`https://intercocina.com/storage/public/${image}`}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
                cursor: 'pointer',
                border: activeIndex === index ? '2px solid red' : '2px solid transparent',
                boxSizing: 'border-box'

              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
