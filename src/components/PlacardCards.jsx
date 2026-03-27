"use client";

import React, { useState, useEffect } from 'react';
import { Check, Mail, MessageCircle, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Lightweight image slider (no Swiper dependency needed)
const ImageSlider = ({ images, title }) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [current, images.length]);

  const goTo = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] group shadow-lg">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${title} ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl" />

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 z-10"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 z-10"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '20px' : '6px',
                  height: '6px',
                  backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.5)'
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Image count badge */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full z-10">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

const features = [
  'Épaisseur au choix (16, 18, 22 mm)',
  '+50 couleurs disponibles',
  '100% fabriqué sur mesure',
  '+20 poignées disponibles',
];

const WardrobeCard = ({ title, description, images = [], imagePosition = 'left', index }) => {
  const isLeft = imagePosition === 'left';

  const fallbackImages = ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"];
  const displayImages = images.length ? images : fallbackImages;

  const content = (
    <div className="flex flex-col justify-center h-full space-y-6 py-2">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 w-fit">
        <span className="text-xs font-semibold uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">
          Devis gratuit
        </span>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
        <div className="mt-3 w-10 h-1 bg-red-500 rounded-full" />
      </div>

      {/* Description */}
      <p className="text-base text-gray-500 leading-relaxed max-w-md">
        {description}
      </p>

      {/* Features */}
      {/* <ul className="space-y-2.5">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
            </div>
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul> */}

      {/* CTA buttons */}
      <div className="flex flex-col xs:flex-row gap-3 pt-2">
        <a
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
          Contactez-nous
        </a>
        <a
          href="https://wa.me/"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0"
        >

          
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
            <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );

  const imageEl = (
    <div className="relative">
      <ImageSlider images={displayImages} title={title} />
      {/* Decorative number */}
      <div
        className="absolute -top-4 font-black text-7xl select-none pointer-events-none"
        style={{
          color: 'rgba(0,0,0,0.04)',
          right: isLeft ? '-10px' : 'auto',
          left: isLeft ? 'auto' : '-10px',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {isLeft ? (
        <>
          <div>{imageEl}</div>
          <div>{content}</div>
        </>
      ) : (
        <>
          {/* On mobile: image first, then content. On lg: content left, image right */}
          <div className="order-2 lg:order-1">{content}</div>
          <div className="order-1 lg:order-2">{imageEl}</div>
        </>
      )}
    </div>
  );
};

const wardrobes = [
  {
    title: 'Placards Coulissants',
    description:
      'Personnalisez votre placard sur-mesure selon vos envies. Nos portes coulissantes s\'adaptent parfaitement à votre intérieur tout en optimisant l\'espace disponible.',
    images: [
      '/imgs/placard/placard-colise.png',
      '/imgs/placard/placard-colise-2.png',
    ],
    imagePosition: 'left',
  },
  {
    title: 'Placards Battants',
    description:
      'Placards à portes battantes entièrement personnalisables avec charnières de qualité supérieure et une multitude de styles et de couleurs au choix.',
    images: [
      '/imgs/placard/placard-abatible.png',
      '/imgs/placard/placard-abatible-2.png',
    ],
    imagePosition: 'right',
  },
  {
    title: 'Dressings',
    description:
      'Créez l\'espace dressing de vos rêves, parfaitement intégré à votre pièce. Adapté à tous les styles d\'intérieur, du plus classique au plus contemporain.',
    images: [
      '/imgs/placard/placard-dressing.png',
      '/imgs/placard/placard-dressing-1.png',
      '/imgs/placard/placard-dressing-2.png',
    ],
    imagePosition: 'left',
  },
];

export default function PlacardCards() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-500 mb-3">
          Nos Réalisations
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Placards sur mesure
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Chaque placard est conçu et fabriqué sur mesure pour s'adapter parfaitement à votre espace et vos besoins.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto space-y-10">
        {wardrobes.map((wardrobe, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10 hover:shadow-md transition-shadow duration-300"
          >
            <WardrobeCard {...wardrobe} index={index} />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-2xl mx-auto text-center mt-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Un projet en tête ?</h3>
          <p className="text-gray-500 text-sm mb-6">
            Contactez-nous pour un devis gratuit et personnalisé sous 24h.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}