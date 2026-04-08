'use client'
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategorySwiper from "./CategorySwiper";

const categories = [
  {
    href: "/category/caissons",
    img: "/imgs/caisson.png",
    alt: "Caissons de cuisine",
    title: "Caissons de cuisine",
    desc: "Caissons conçus avec passion pour transformer votre espace culinaire en une œuvre d'art fonctionnelle.",
    tag: "Structure",
  },
  {
    href: "/category/facade",
    img: "/imgs/facade.png",
    alt: "Façades et Portes",
    title: "Façades et Portes de cuisine",
    desc: "Façades élégantes et personnalisables, conçues pour donner vie à vos idées de design.",
    tag: "Design",
  },

  {
    href: "/category/accessoiriser",
    img: "/imgs/acc.png",
    alt: "Accessoires de cuisine",
    title: "Accessoires de cuisine",
    desc: "La touche finale parfaite pour vos projets de meubles de cuisine — fonctionnel et raffiné.",
    tag: "Finition",
  },

  // {
  //   href: "/category/parquettes",
  //   img: "/imgs/parquet.png",
  //   alt: "Parquets",
  //   title: "Parquets",
  //   desc: "Un sol élégant et durable pour sublimer votre intérieur — chaleur et style à chaque pièce.",
  //   tag: "Revêtement",
  // },

];


const images = [
  {
    image: "/imgs/cuisin-image.jpg",
    alt: "Meubles de cuisine 1"
  },
  {
    image: "/imgs/cuisin-image-1.jpg",
    alt: "Meubles de cuisine 2"
  },
  {
    image: "/imgs/cuisin-image-2.jpg",
    alt: "Meubles de cuisine 3"
  },
  {
    image: "/imgs/cuisin-image-3.jpg",
    alt: "Meubles de cuisine 4"
  }
]

const HomeCategory = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('[data-card]');
    if (!cards) return;
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(28px)';
      card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 60);
    });
  }, []);

  return (
    <section className="py-10 px-4">
      {/* Section header */}
      <div className="container mx-auto mb-10 flex flex-col items-center text-center gap-3">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
          Meubles de cuisine
        </h2>
        <p className="text-gray-500 max-w-md text-sm leading-relaxed">
          Des solutions complètes pour aménager votre cuisine et votre intérieur, fabriquées au Maroc.
        </p>
        <div className="flex items-center gap-3 mt-1">
          <div className="h-px w-12 bg-red-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <div className="h-px w-12 bg-red-500/40" />
        </div>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map(({ href, img, alt, title, desc, tag }) => (
          <Link
            key={href}
            href={href}
            data-card
            className="group relative flex flex-col rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-400 border border-gray-100"
          >
            {/* Image */}
            <div className="relative h-72 w-full overflow-hidden bg-gray-100">
              <Image
                src={img}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Tag badge */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
                {tag}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
              <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {desc}
              </p>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-red-600 mt-1">
                <span>Explorer</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-0.5 w-0 bg-red-500 group-hover:w-full transition-all duration-400 absolute bottom-0 left-0" />
          </Link>
        ))}
      </div>
      <div className="max-w-7xl m-auto rounded-xl overflow-hidden mt-16">
        <CategorySwiper images={images} />
      </div>
    </section>
  );
};

export default HomeCategory;