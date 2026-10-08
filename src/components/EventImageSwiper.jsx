"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function EventImageSwiper({ images = [], title }) {
  if (!images.length) return null;

  return (
    <div className="w-full rounded-2xl overflow-hidden mb-6">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-2xl"
        spaceBetween={20}
        breakpoints={{
          // Mobile
          0: {
            slidesPerView: 1,
          },
          // Tablets
          640: {
            slidesPerView: 2,
          },
          // Desktop
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={title}
              width={1200}
              height={800}
              className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
