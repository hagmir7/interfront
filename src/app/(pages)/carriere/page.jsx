import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'Carrière chez Intercocina | Rejoignez notre équipe',
  description:
    "Intercocina recrute. Rejoignez une équipe industrielle en pleine expansion — unités de production, bureaux techniques et services supports.",
  keywords: [
    'Intercocina',
    'carrière Intercocina',
    'recrutement Intercocina',
    'emploi cuisines Maroc',
    'offres d\'emploi industriel',
    'cuisines sur mesure',
    'bureau technique',
    'unité de production',
    'RH Intercocina',
  ],
  authors: [{ name: 'Intercocina' }],
  creator: 'Intercocina',
  publisher: 'Intercocina',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.intercocina.com/carriere',
  },
  openGraph: {
    title: 'Carrière chez Intercocina | Rejoignez notre équipe',
    description:
      "L'humain au cœur de notre performance industrielle. Découvrez nos opportunités en production, bureau d'études et services supports.",
    url: 'https://www.intercocina.com/carriere',
    siteName: 'Intercocina',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.intercocina.com/imgs/recrute.png',
        width: 800,
        height: 400,
        alt: 'Équipe Intercocina — Rejoignez-nous',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carrière chez Intercocina',
    description:
      "Rejoignez une équipe industrielle en pleine expansion. Candidatures : RH@INTERCOCINA.COM",
    images: ['https://www.intercocina.com/pic_recrut.png'],
  },
  category: 'careers',
}

export default function Page() {
  return (

    <section className="relative bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero grid: text + image */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
          {/* Left — text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#e4373a]" />
              <span className="text-[#e4373a] text-[10px] font-extrabold tracking-[0.3em] uppercase">
                Rejoignez notre équipe
              </span>
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] text-[#e4373a]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Carrière
              <br />
              <span className="text-gray-500">chez</span> Intercocina
            </h1>
            <p className="mt-5 max-w-md text-gray-700 text-sm sm:text-base leading-relaxed">
              L'humain au cœur de notre performance industrielle — expertise,
              innovation et cuisines sur mesure de haute qualité.
            </p>
          </div>

          {/* Right — image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg aspect-[2/1]">
              <Image
                src="/imgs/recrute.png"
                alt="Équipe Intercocina"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 h-20 w-20 bg-[#e4373a] rounded-2xl -z-0 opacity-90 hidden sm:block" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-12" />

        {/* Body text */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#e4373a]" />
          <span className="text-[#e4373a] text-[10px] font-extrabold tracking-[0.3em] uppercase">
            À propos
          </span>
        </div>
        <h3
          className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1] text-gray-900 mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Carrière chez <span className="text-[#e4373a]">Intercocina</span>
        </h3>

        <div className="space-y-4 text-gray-700 text-base lg:text-lg leading-relaxed">
          <p>
            Intercocina place l'humain au cœur de sa performance industrielle.
            Grâce à l'expertise de ses équipes et à une vision orientée innovation,
            nous accompagnons la croissance de nos partenaires professionnels en
            proposant des solutions de cuisines sur mesure de haute qualité.
          </p>
          <p>
            Dans le cadre de notre développement, nous renforçons continuellement
            nos équipes au sein de nos{' '}
            <span className="text-gray-900 font-semibold">
              unités de production, bureaux techniques et services supports
            </span>
            . Nous recherchons des profils dynamiques, rigoureux et motivés, prêts
            à évoluer dans un environnement industriel structuré et en pleine
            expansion.
          </p>
        </div>

        <p className="mt-6 text-gray-700 text-base">
          Envie de nous rejoindre ? Envoyez votre candidature à{' '}
          <a
            href="mailto:RH@INTERCOCINA.COM"
            className="text-[#e4373a] font-semibold hover:underline"
          >
            RH@INTERCOCINA.COM
          </a>
        </p>

        <div className="border-t border-gray-100 my-8 max-w-2xl" />

        <div className="flex flex-wrap gap-2">
          {['Professionnalisme', "Esprit d'équipe", 'Amélioration continue', 'Performance', 'Épanouissement'].map((v) => (
            <span
              key={v}
              className="border border-[#e4373a44] rounded-full px-4 py-1 text-xs text-[#e4373a] bg-[#e4373a08] font-medium"
            >
              {v}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}

