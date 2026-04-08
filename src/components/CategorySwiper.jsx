"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CategorySwiper({ images }) {
  if (!images.length) return null;

  return (
    <>
      <style jsx global>{`
        .red-swiper .swiper-button-next,
        .red-swiper .swiper-button-prev {
          color: #ef4444;
        }
        .red-swiper .swiper-pagination-bullet-active {
          background: #ef4444;
        }
      `}</style>

      <div className="w-full rounded-2xl overflow-hidden mb-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="rounded-2xl red-swiper"
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                src={item.image}
                alt={item.alt}
                width={1200}
                height={800}
                className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}