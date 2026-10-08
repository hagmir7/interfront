'use client'

import { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import '@splidejs/splide/css';
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
    return (
        <section className="p-5 py-6 bg-white rounded-lg text-center shadow-sm transform duration-500 hover:-translate-y-2 cursor-pointer w-56 snap-center shrink-0 min-w-64">
            <Link href={`/product/${product.url}`} tabIndex={-1}>
                <div className="flex justify-center">
                    <Image
                        width={500}
                        height={500}
                        src={product.imageUrl}
                        className="w-48 h-auto object-contain"
                        alt={product.title}
                    />
                </div>

                <div className="space-x-1 flex justify-center mt-10">
                    {[...Array(4)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 mx-px text-orange-600" />
                    ))}
                    <FaStar className="w-4 h-4 mx-px text-gray-300" />
                </div>

                <h3 className="text-xl my-5 font-semibold">{product.title}</h3>
            </Link>
        </section>
    );
};

const PlacardSlideShow = () => {
    const splideRef = useRef(null);

    useEffect(() => {
        const { Splide } = require('@splidejs/splide');
        const { AutoScroll } = require('@splidejs/splide-extension-auto-scroll');

        const splideInstance = new Splide(splideRef.current, {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 6,
            gap: '30px',
            pagination: false,
            breakpoints: {
                480: { perPage: 1, padding: '2rem' },
                640: { perPage: 1, padding: '3rem' },
                768: { perPage: 2, padding: '4rem' },
                1024: { perPage: 3, padding: '4rem' },
                1280: { perPage: 4, padding: '5rem' },
                1440: { perPage: 5, padding: '5rem' },
            },
            autoScroll: {
                speed: -0.5, // 🔥 reversed direction
            },
        }).mount({ AutoScroll });

        return () => {
            splideInstance.destroy();
        };
    }, []);

    const productData = [
        { url: "rangement-sac-a-mains-coulissant-400mm", imageUrl: "https://app.intercocina.com/storage/01JNGTP5Y4BT598J5PNQC5RF28.png", title: "Rangement sac à mains coulissant" },
        { url: "rangement-chaussures-a-4-etageresgauche", imageUrl: "https://app.intercocina.com/storage/01JMH9HMVX7N23RD9YAKSS648E.png", title: "Rangement chaussures" },
        { url: "range-accessoires-coulissant-avec-separateurs", imageUrl: "https://app.intercocina.com/storage/01JMH8YGCTVW6P3AZNFSEHQCJB.png", title: "Range accessoires coulissant" },
        { url: "rangement-chaussures", imageUrl: "https://app.intercocina.com/storage/01JMH99X7XGDSAFGFS8EQ4E4A0.png", title: "Rangement chaussures" },
        { url: "rangement-chaussures-pivotant-1350-1550-mm", imageUrl: "https://app.intercocina.com/storage/01JMH9S44VNMBKG6AD3D383W6H.png", title: "Rangement chaussures Rotatif" },
        { url: "cintre-pantalon-mobile-avec-rail-divisions-de-rangement-en-hautdroite", imageUrl: "https://app.intercocina.com/storage/01JMH62V1DQGZWFCJDKE3D3K5M.png", title: "Porte pantalon mobile" },
        { url: "cintre-pantalon-coulissant", imageUrl: "https://app.intercocina.com/storage/01JMH4CEYZ03NQMSCHJ59BT4JQ.png", title: "Porte-pantalons polyvalent" },
        { url: "cintre-mobile-abatible-capacite-10-kg", imageUrl: "https://app.intercocina.com/storage/01JMH81KQ03VWG967B6YSVW22M.png", title: "Cintre mobile abatible" },
        { url: "cintre-porte-cravate-droite", imageUrl: "https://app.intercocina.com/storage/01JMH7HGJKWP3WVD4A65VN1SZZ.png", title: <span>Porte-cravate <br /> Droite</span> },
    ];

    return (
        <div className="flex flex-col space-y-16 overflow-hidden">
            <div className="overflow-x-scroll no-scrollbar">
                <div ref={splideRef} className="splide" aria-label="Carousel">
                    <div className="splide__track py-7">
                        <ul className="splide__list md:gap-10 xl:gap-0">
                            {productData.map((product, index) => (
                                <li key={index} className="splide__slide">
                                    <ProductCard product={product} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacardSlideShow;