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
        <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1538944570562-2c9cb7857097?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
            ></div>

            <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Side: Company Info */}
                    <div className="w-full md:w-1/2 mb-12 md:mb-0">
                        <div className="flex flex-col order-2 gap-3 pt-6 space-y-4 col-span-full md:px-4 xl:order-1 xl:col-span-1 md:py-10">
                            <h1 className="text-4xl font-bold leading-tight text-center md:text-left md:text-5xl md:leading-tight">
                                <span className="text-[#b6b6b7] font-black tracking-widest" style={{ fontFamily: "DOCK11-Heavy" }}>
                                    INTER
                                </span>
                                <span className="text-[#ec2228] font-black tracking-widest" style={{ fontFamily: "DOCK11-Heavy, sans-serif" }}>
                                    COCINA
                                </span>{" "}<br />
                                Leader des cuisines modernes au Maroc
                            </h1>
                            <p className="text-center text-white md:text-left text-lg font-semibold">
                                Notre collection de meubles de cuisine est conçue pour transformer votre
                                espace en un lieu d'inspiration gastronomique, où chaque détail compte.
                            </p>
                            <div className="flex justify-center w-full md:justify-start gap-4">
                                <CLink href="/contact" className="btn btn-accent-gray flex items-center justify-center w-full gap-2">
                                    <Mail size={20} className="text-white" />
                                    <span>Contact</span>
                                </CLink>

                                <CLink href="/shop" className="rounded-lg flex text-white bg-[#da3036] hover:bg-red-600 py-2 px-4 text-[17px] text-sm hover:text-white items-center justify-center w-full gap-2">
                                    <ShoppingCart size={20} className="text-white" />
                                    <span>Produits</span>
                                </CLink>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Features */}
                    <div className="w-full md:w-1/2 md:pl-12">
                        <div className="bg-opacit backdrop-filter backdrop-blur-sm rounded-xl shadow-2xl overlook-hidden">
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
                                    <div className="swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full">
                                        <img src="https://intercocina.com/storage/public/01JJ9S1JJHSJZ9S8143SGR6MAT.png" className="h-96 object-center" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full">
                                        <img src="https://intercocina.com/storage/public/01JJ9JPT9EY7NCA37RW72P7PF7.png" className="h-96 object-center" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full">
                                        <img src="https://intercocina.com/storage/public/01JJ9KRKCBEXK6V03HA4V8R74Y.png" className="h-96 object-center" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full">
                                        <img src="https://intercocina.com/storage/public/01JJ9M513KM8P5MKBGMRCD412S.png" className="h-96 object-center" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-zoom-container rounded-xl overflow-hidden flex items-center justify-center w-full">
                                        <img src="https://intercocina.com/storage/public/01JJ9RNXMMA92VV2PMMFH307XC.png" className="h-96 object-center" />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
};

export default SectionConver;
