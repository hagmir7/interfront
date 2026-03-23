'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Image as AntdImage } from 'antd';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = ({ images = [], currentColor, onImageChange }) => {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [currentImages, setCurrentImages] = useState(images);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const filtered = currentColor
      ? images.filter((img) => String(img.color_id) === String(currentColor))
      : images;

    const newImages = filtered.length ? filtered : images;

    setCurrentImages(newImages);
    setActiveIndex(0);

    setTimeout(() => {
      mainSwiper?.slideTo(0, 0);
    }, 0);
  }, [images, currentColor, mainSwiper]);

  const handleThumbClick = (img) => {
    const indexInCurrent = currentImages.findIndex((ci) => ci.image === img.image);
    if (indexInCurrent !== -1) {
      // Image exists in current filtered list, just navigate
      mainSwiper?.slideToLoop(indexInCurrent);
      setActiveIndex(indexInCurrent);
    } else {
      // Image belongs to another color, switch to full list and navigate
      const indexInAll = images.findIndex((i) => i.image === img.image);
      setCurrentImages(images);
      setActiveIndex(indexInAll);
      setTimeout(() => {
        mainSwiper?.slideTo(indexInAll, 0);
      }, 0);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">

      <div className="relative w-full max-w-[650px] select-none">

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={currentImages.length > 1}
          onSwiper={setMainSwiper}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
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
                  src={`https://app.intercocina.com/storage/${img.image}`}
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

      {images.length > 1 && (
        <div className="w-full max-w-[650px] mt-4 px-2">
          <Swiper
            slidesPerView={4}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            style={{ height: '100px' }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} style={{ height: '100px' }}>
                <div
                  onClick={() => handleThumbClick(img)}
                  className={`overflow-hidden rounded-lg cursor-pointer border transition-all h-full
                    ${
                      currentImages[activeIndex]?.image === img.image
                        ? "border-red-500 border-2"
                        : "border-gray-200"
                    }
                    hover:border-gray-400`}
                >
                  <Image
                    src={`https://app.intercocina.com/storage/${img.image}`}
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