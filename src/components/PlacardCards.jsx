"use client";

import React from 'react';
import { Check, Mail, MessageCircle } from 'lucide-react';
import CLink from './CLink';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const WardrobeCard = ({ title, description, images = [], imagePosition = 'left' }) => {

  const features = [
    'Épaisseur au choix (16, 18, 22) mm',
    'Préparation rapide',
    '+50 couleurs disponibles',
    '100% fabriqué sur mesure',
    '+20 poignées disponibles'
  ];

  const content = (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
        {title}
      </h2>

      <p className="text-lg text-gray-600 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-green-700" strokeWidth={2.5} />
            </div>
            <span className="text-base font-medium text-gray-700">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <CLink
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold"
        >
          <Mail className="w-4 md:w-5 h-4 md:h-5" />
          Contactez-nous
        </CLink>

        <a
          href="https://wa.me/"
          className="flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold"
        >
          <MessageCircle className="w-4 md:w-5 h-4 md:h-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );

  const image = (
    <div className="relative group">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-2xl shadow-sm"
      >
        {(images.length ? images : [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"
        ]).map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${title}-${index}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {imagePosition === 'left' ? (
        <>
          <div className="order-1">{image}</div>
          <div className="order-2">{content}</div>
        </>
      ) : (
        <>
          <div className="order-2 sm:order-2 lg:order-1">{content}</div>
          <div className="order-1 sm:order-1 lg:order-2">{image}</div>
        </>
      )}
    </div>
  );
};

export default function PlacardCards() {

  const wardrobes = [
    {
      title: 'Placard Coulissants',
      description:
        'Personnalisez votre placard sur-mesure selon vos envies, nous vous proposons des portes coulissantes qui s’adaptent parfaitement à votre intérieur.',
      images: [
        '/imgs/placard/placard-colise.png',
        '/imgs/placard/placard-colise-2.png',
      ],
      imagePosition: 'left'
    },
    {
      title: 'Placards Battants',
      description:
        'Placards à portes battantes personnalisables avec charnières de qualité supérieure et une multitude de styles et de couleurs.',
      images: [
        '/imgs/placard/placard-abatible.png',
        '/imgs/placard/placard-abatible-2.png'
      ],
      imagePosition: 'right'
    },
    {
      title: 'Dresing',
      description:
        'Créez un placard sur mesure qui s’intègre parfaitement à votre espace, adapté à tous les styles d’intérieur.',
      images: [
        '/imgs/placard/placard-dressing.png',
        '/imgs/placard/placard-dressing-1.png',
        '/imgs/placard/placard-dressing-2.png',
      ],
      imagePosition: 'left'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-12 px-2 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {wardrobes.map((wardrobe, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-sm p-4 lg:p-8 hover:shadow-md transition"
          >
            <WardrobeCard {...wardrobe} />
          </div>
        ))}
      </div>
    </div>
  );
}
