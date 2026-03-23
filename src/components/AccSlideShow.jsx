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

const AccSlideShow = () => {
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
    { url: "etageres-de-rangement-coulissantes", imageUrl: "https://app.intercocina.com/storage/01JNJZ057XJK7M854GB4P3CBM0.png", title: "Étagères de rangement" },
    { url: "ensemble-garde-manger-double-avec-5-paniers-anthracite", imageUrl: "https://app.intercocina.com/storage/01JNE4TA8SM5WQ6ZBVP92JDBNA.png", title: "Ensemble Garde-manger " },
    { url: "coulisse-de-tiroir-a-encastrer-avec-extraxtion-totale", imageUrl: "https://app.intercocina.com/storage/01JJYH0W3XN7T40T95GMD273PQ.png", title: "Glissières de tiroir encastrer " },
    { url: "caisse-a-bouteille-150mm-coulissante-a-fond-bois-droite", imageUrl: "https://app.intercocina.com/storage/01JM9JTY8GX7WG60RRQPB6M8T7.png", title: "Porte-bouteille coulissante" },
    { url: "caisse-a-casserole-coulissante-450-mm-gauche", imageUrl: "https://app.intercocina.com/storage/01JM9XDAT8HSF092FTAJN22ZPZ.png", title: "Porte-casserole coulissante" },
    { url: "caisse-amovible-500-mm-pour-caisson-coin-l", imageUrl: "https://app.intercocina.com/storage/01JM9Y1FJR312PXFDWRPBH1MT3.png", title: "Mécanisme d'angle coulissant" },
    { url: "coin-magique-500-mm-gauche", imageUrl: "https://app.intercocina.com/storage/01JMA3S4S4GHRGSXWWDG82GWJT.png", title: "Coin magique Droite, Gauche" },
    { url: "mecanisme-slim-pour-porte-relevable-classe-d", imageUrl: "https://app.intercocina.com/storage/01JJYFZNN1X6S9QVK20M37E9XF.png", title: "Mécanisme Slim relevable" },
    { url: "facade-laca-g1-atania", imageUrl: "https://app.intercocina.com/storage/01JKDAQ2TQMCYJQJAXQ4NHPA1Z.png", title: "Kit mécanismes relevable" },
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

export default AccSlideShow;