'use client'
import { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import '@splidejs/splide/css'; // Ensure Splide styles are loaded

const ProductCard = ({ product }) => {
  return (
    <section className="p-5 py-6 bg-white rounded-lg text-center shadow-sm transform duration-500 hover:-translate-y-2 cursor-pointer w-56 snap-center shrink-0 min-w-64">
      <a href={product.url} tabIndex={-1}>
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
      </a>
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
      perPage: 6,
      gap: '0px',
      padding: '5rem',
      drag: 'free',
    //   focus: 'center',
      pagination: false,
      breakpoints: {
        640: { perPage: 1 },
        768: { perPage: 2 },
        1024: { perPage: 3 },
      },
      arrows: true,
      autoScroll: {
        speed: 1, // Adjust speed as needed
      },
    }).mount({ AutoScroll });
  
    return () => {
      splideInstance.destroy();
    };
  }, []);


  const productData = [
    { url: "https://intercocina.com/product/facade-laca-g3-vittoria", imageUrl: "https://intercocina.com/storage/public/01JJ9S1JJHSJZ9S8143SGR6MAT.png", title: "Vittoria - Laca G3" },
    { url: "https://intercocina.com/product/facade-laca-g3-venecia", imageUrl: "https://intercocina.com/storage/public/01JJ9RTWHSK7XTNH0XY66D4GPG.png", title: "Venecia - Laca G3" },
    { url: "https://intercocina.com/product/facade-laca-g3-brecia", imageUrl: "https://intercocina.com/storage/public/01JJ9RNXMMA92VV2PMMFH307XC.png", title: "Brecia - Laca G3" },
    { url: "https://intercocina.com/product/facade-laca-g2-verona", imageUrl: "https://intercocina.com/storage/public/01JJ9MR9G97T5C29CPR017BA1E.png", title: "Verona - Laca G2" },
    { url: "https://intercocina.com/product/facade-laca-g2-mesina", imageUrl: "https://intercocina.com/storage/public/01JJ9MCKJRG0S9EG8Q2MD8NC6H.png", title: "Mesina - Laca G2" },
    { url: "https://intercocina.com/product/facade-laca-g2-foggia", imageUrl: "https://intercocina.com/storage/public/01JJ9M513KM8P5MKBGMRCD412S.png", title: "Foggia - Laca G2" },
    { url: "https://intercocina.com/product/facade-laca-g2-florencia", imageUrl: "https://intercocina.com/storage/public/01JJ9KRKCBEXK6V03HA4V8R74Y.png", title: "Florencia - Laca G2" },
    { url: "https://intercocina.com/product/facade-laca-g1-latina", imageUrl: "https://intercocina.com/storage/public/01JJ9K28H7S9YDC7VKJCTWB8EX.png", title: "Latina - Laca G1" },
    { url: "https://intercocina.com/product/facade-laca-g1-atania", imageUrl: "https://intercocina.com/storage/public/01JJ9JPT9EY7NCA37RW72P7PF7.png", title: "Catania - Laca G1" },
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
