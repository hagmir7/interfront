import Image from 'next/image';
import React from 'react';

const MainSection = () => {

    return (
        <header className="max-w-7xl mx-auto px-4 py-10 overflow-x-hidden md:overflow-visible">
            <div className="grid grid-cols-2 gap-8 md:gap-20 xl:gap-8 place-items-center">
                <div className="flex flex-col order-2 gap-3 pt-6 space-y-4 col-span-full md:px-4 xl:order-1 xl:col-span-1 md:py-16">
                    <h1 className="text-4xl font-bold leading-tight text-left md:text-5xl md:leading-tight animate__animated animate__fadeInUp animate__delay-100ms">
                        <span
                            className="text-[#b6b6b7] font-black tracking-widest"
                            style={{ fontFamily: "DOCK11-Heavy" }}
                        >
                            INTER
                        </span>
                        <span
                            className="text-[#ec2228] font-black tracking-widest"
                            style={{ fontFamily: "DOCK11-Heavy, sans-serif" }}
                        >
                            COCINA
                        </span>{" "}<br />
                        Leader de la fabrication de meubles de cuisine au Maroc
                    </h1>
                    <p className="text-left text-slate-700 text-lg font-semibold animate__animated animate__fadeInUp animate__delay-300ms">
                        De la cuisine aux placards, en passant par les salles de bain et le parquet, nos créations transforment chaque espace en une source d&apos;inspiration, où chaque détail compte.
                    </p>
                    <div className="flex justify-start gap-4 animate__animated animate__fadeInUp animate__delay-500ms">
                        
                           <a href="https://app.intercocina.com/contact"
                            className="btn btn-accent-gray flex items-center justify-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d={"m2.357 7.714l6.98 4.654c.963.641 1.444.962 1.964 1.087a3 3 0 0 0 1.398 0c.52-.125 1.001-.446 1.963-1.087l6.98-4.654M7.158 19.5h9.686c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V9.3c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311c-.642-.327-1.482-.327-3.162-.327H7.157c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v5.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327"}
                                ></path>
                            </svg>
                            <span>Contact</span>
                        </a>
                        
                        <a href="https://app.intercocina.com/shop"
                            className="btn btn-primary flex items-center justify-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d={"M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"}
                                ></path>
                            </svg>
                            Produits1111
                        </a>
                    </div>
                </div>

                <div className="relative order-1 col-span-full xl:order-2 xl:col-span-1">
                    <div className="absolute z-0 rounded-full -top-8 -right-16 w-28 h-28 md:w-52 md:h-52 bg-gray-300"></div>
                    <div className="absolute rounded-full -bottom-8 -left-16 md:-bottom-16 bg-red-400 w-36 h-36 md:w-64 md:h-64"></div>
                    <div className="relative z-20 rounded-3xl animate__animated animate__zoomIn">
                        <div className="swiper header-swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
                            <div className="swiper-wrapper">
                                <div
                                    className="swiper-slide"
                                    role="group"
                                    aria-label="4 / 4"
                                    data-swiper-slide-index="3"
                                    style={{ width: "560px", marginRight: "30px" }}
                                >
                                    <Image
                                        src="https://app.intercocina.com/storage/01JJ6WJ2KACAM10XKRPSGX4D9D.webp"
                                        className="rounded-3xl border-2"
                                        width={550}
                                        height={300}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MainSection;