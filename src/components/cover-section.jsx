'use client'
import { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import '@splidejs/splide/css';
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <section className="p-5 py-6 bg-white rounded-lg text-center shadow-sm transform duration-500 hover:-translate-y-2 cursor-pointer w-56 snap-center shrink-0 min-w-64">
      <Link href={`/product/${product.url}`} tabIndex={-1}>
        <div className="flex justify-center">
          <img src={product.imageUrl} className="w-48 object-contain" alt={product.title} />
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

const CoverSection = () => {
  const splideRef = useRef(null);
  const [splideInitialized, setSplideInitialized] = useState(false);

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
        480: { perPage: 1, padding: '2rem' }, // Small phones
        640: { perPage: 1, padding: '3rem' }, // Larger phones
        768: { perPage: 2, padding: '4rem' }, // Tablets
        1024: { perPage: 3, padding: '4rem' }, // Small laptops
        1280: { perPage: 4, padding: '5rem' }, // Desktops
        1440: { perPage: 5, padding: '5rem' }, // Large screens
      },
      autoScroll: {
          speed: 0.5,
      },
    }).mount({ AutoScroll });
  
    return () => {
      splideInstance.destroy();
    };
    
  }, []);


  const productData = [
    { url: "/facade-laca-g3-vittoria", imageUrl: "https://intercocina.com/storage/public/01JJ9S1JJHSJZ9S8143SGR6MAT.png", title: "Vittoria - Laca G3" },
    { url: "/facade-laca-g3-venecia", imageUrl: "https://intercocina.com/storage/public/01JJ9RTWHSK7XTNH0XY66D4GPG.png", title: "Venecia - Laca G3" },
    { url: "/facade-laca-g3-brecia", imageUrl: "https://intercocina.com/storage/public/01JJ9RNXMMA92VV2PMMFH307XC.png", title: "Brecia - Laca G3" },
    { url: "/facade-laca-g2-verona", imageUrl: "https://intercocina.com/storage/public/01JJ9MR9G97T5C29CPR017BA1E.png", title: "Verona - Laca G2" },
    { url: "/facade-laca-g2-mesina", imageUrl: "https://intercocina.com/storage/public/01JJ9MCKJRG0S9EG8Q2MD8NC6H.png", title: "Mesina - Laca G2" },
    { url: "/facade-laca-g2-foggia", imageUrl: "https://intercocina.com/storage/public/01JJ9M513KM8P5MKBGMRCD412S.png", title: "Foggia - Laca G2" },
    { url: "/facade-laca-g2-florencia", imageUrl: "https://intercocina.com/storage/public/01JJ9KRKCBEXK6V03HA4V8R74Y.png", title: "Florencia - Laca G2" },
    { url: "/facade-laca-g1-latina", imageUrl: "https://intercocina.com/storage/public/01JJ9K28H7S9YDC7VKJCTWB8EX.png", title: "Latina - Laca G1" },
    { url: "/facade-laca-g1-atania", imageUrl: "https://intercocina.com/storage/public/01JJ9JPT9EY7NCA37RW72P7PF7.png", title: "Catania - Laca G1" },
  ];

  return (
    <div className="flex flex-col space-y-16 overflow-hidden">
      <div className="overflow-x-scroll no-scrollbar">
        <div ref={splideRef} className="splide" aria-label="Carousel">
          <div className="splide__track py-7">
            <ul className="splide__list">
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

export default CoverSection;
