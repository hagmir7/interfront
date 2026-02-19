'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Image as AntdImage } from 'antd';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const Carousel = ({ images = [], currentColor, onImageChange }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [currentImages, setCurrentImages] = useState(images);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const filtered = currentColor
      ? images.filter((img) => img.color_id === currentColor)
      : images;

    setCurrentImages(filtered.length ? filtered : images);
    setActiveIndex(0);
    mainSwiper?.slideTo(0);
  }, [images, currentColor]);

  return (
    <div className="w-full flex flex-col items-center">

      <div className="relative w-full max-w-[650px] select-none">

        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={0}
          slidesPerView={1}
          loop={currentImages.length > 1}
          onSwiper={setMainSwiper}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onSlideChange={(s) => {
            setActiveIndex(s.realIndex);
            onImageChange?.(s.realIndex);
          }}
          style={{ height: '450px' }}
          className="rounded-xl shadow-sm bg-white w-full"
        >
          {currentImages.map((img, i) => (
            <SwiperSlide
              key={i}
              style={{ height: '450px' }}
              className="flex justify-center items-center overflow-hidden"
            >
              <AntdImage.PreviewGroup>
                <AntdImage
                  src={`https://interapi.facepy.com/storage/${img.image}`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '450px',
                    objectFit: 'contain',
                  }}
                  className="rounded-xl"
                  preview={true}
                />
              </AntdImage.PreviewGroup>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ARROWS */}
        <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-30
          w-9 h-9 flex items-center justify-center bg-white/90
          backdrop-blur-sm rounded-full shadow-md text-gray-600
          hover:scale-110 transition">
          ‹
        </button>

        <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-30
          w-9 h-9 flex items-center justify-center bg-white/90
          backdrop-blur-sm rounded-full shadow-md text-gray-600
          hover:scale-110 transition">
          ›
        </button>
      </div>

      {currentImages.length > 1 && (
        <div className="w-full max-w-[650px] mt-4 px-2">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            slidesPerView={4}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            style={{ height: '100px' }}
          >
            {currentImages.map((img, i) => (
              <SwiperSlide key={i} style={{ height: '100px' }}>
                <div
                  onClick={() => mainSwiper?.slideToLoop(i)}
                  className={`overflow-hidden rounded-lg cursor-pointer border transition-all h-full
                    ${activeIndex === i ? "border-red-500 border-2" : "border-gray-200"}
                    hover:border-gray-400`}
                >
                  <Image
                    src={`https://interapi.facepy.com/storage/${img.image}`}
                    width={120}
                    height={100}
                    alt=""
                    className="object-cover w-full h-full py-1 px-1"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Carousel;