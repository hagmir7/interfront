import BrandsSection from '@/components/brand-section';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: "À propos d'Intercocina",
  description:
    "Découvrez Intercocina, spécialiste des cuisines, armoires et rangements sur mesure. Nous allions qualité, design et solutions personnalisées pour chaque espace.",
  keywords:
    "Intercocina, à propos, cuisine sur mesure, armoires, dressings, rangements, mobilier personnalisé, expert en aménagement intérieur",
  alternates: {
    canonical: `/aprops`,
  },
};


const sections = [
  {
    title: 'Leader de la fabrication de meubles de cuisine',
    description:
      "Intercocina est une entreprise pionnière et leader dans la fabrication de meubles de cuisine sur mesure. Forte d’un savoir-faire éprouvé, la marque s’appuie sur l’exploitation de technologies de pointe et de processus de production innovants pour concevoir des cuisines d’exception. Chaque projet allie précision, design contemporain et exigence de qualité, afin d’offrir des solutions fonctionnelles, durables et parfaitement adaptées aux besoins des professionnels.",
    image: 'https://app.intercocina.com/assets/imgs/intercocina.png',
    reversed: false,
    tag: 'Notre histoire',
  },
  {
    title: 'Fabrication de meubles de cuisine',
    description:
      "Depuis plus de 16 ans, INTERCOCINA excelle dans la fabrication de meubles de cuisine au Maroc, depuis son atelier à Nador. Notre équipe de menuisiers hautement qualifiés, hommes et femmes, met en œuvre son savoir-faire artisanal pour créer des meubles de cuisine d'une qualité exceptionnelle. En choisissant méticuleusement des matériaux de qualité, nous nous engageons à vous proposer des meubles résistants qui traversent le temps avec distinction.",
    image: 'https://app.intercocina.com/assets/imgs/qualite.jpg',
    reversed: true,
    tag: 'Fabrication',
  },
  {
    title: 'Qualité premium',
    description:
      "La sélection minutieuse des matériaux dans la confection de nos meubles et la rigueur de notre processus de création sont au cœur de notre engagement envers la qualité et la durabilité de nos produits. Depuis 2017, chacun de nos meubles est accompagné d'une certification et d'un certificat de catégorisation, offrant ainsi à nos clients l'assurance d'acquérir des pièces de mobilier exceptionnelles répondant aux normes de qualité les plus élevées.",
    image: '/imgs/fabrica/fabrica-5.jpg',
    reversed: false,
    tag: 'Qualité',
  },
  {
    title: 'Grande capacité industrielle',
    description: "Grâce à une grande capacité de production industrielle, Intercocina répond avec efficacité et constance aux exigences du marché B2B. Son outil de production moderne, intégrant des technologies innovantes et des processus optimisés, permet d’assurer une fabrication maîtrisée à grande échelle tout en préservant un haut niveau de qualité. Cette organisation industrielle performante garantit la disponibilité continue des produits, la fiabilité des délais et la régularité des approvisionnements, offrant ainsi à nos partenaires professionnels des solutions durables, flexibles et parfaitement adaptées à leurs projets.",
     image: `/imgs/fabrica/fabrica-${5+5}.jpg`,
    reversed: true,
    tag: 'Industrie',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="border-b border-neutral-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-10 md:pb-15 md:pt-15">

          {/* Eyebrow */}
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            <span className="h-px w-6 bg-red-400" />
            À propos d'Intercocina
          </p>

          <div className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl">
            <h1> L’excellence de la production  {' '}
            <span className="text-red-500">industrielle de meubles</span>{' '}</h1>
            de cuisine premium au Maroc
          </div>

          <p className="mt-5 max-w-xl text-lg text-neutral-500 leading-relaxed">
            Qualité premium · Livraison rapide · Grande capacité industrielle
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full bg-red-500 px-6 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
            >
              Nous contacter
            </Link>
            <Link
              href="/shop"
              className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-neutral-200 px-6 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
            >
              Nos produits
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-20 space-y-20">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20 ${
              section.reversed ? 'md:[&>*:first-child]:order-last' : ''
            }`}
          >
            {/* Text */}
            <div>
              <span className="mb-4 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-500">
                {section.tag}
              </span>
              <h2 className="text-2xl font-bold leading-snug text-neutral-900 md:text-3xl">
                {section.title}
              </h2>
              <div className="mt-4 h-0.5 w-12 rounded-full bg-red-500" />
              <p className="mt-5 text-base leading-relaxed text-neutral-600">
                {section.description}
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              {/* Decorative border offset */}
              <div
                aria-hidden
                className={`absolute hidden md:block h-full w-full rounded-2xl border-2 border-red-100 ${
                  section.reversed
                    ? '-bottom-4 -left-4'
                    : '-bottom-4 -right-4'
                }`}
              />
              <Image
                src={section.image}
                alt={`Intercocina — ${section.title}`}
                width={700}
                height={700}
                className="relative z-10 h-72 w-full rounded-2xl object-cover shadow-lg md:h-96"
              />
            </div>
          </div>
        ))}
      </section>
      {/* ── CTA BANNER ── */}

       <BrandsSection />
      <section className="bg-red-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Prêt à transformer votre cuisine ?
            </h3>
            <p className="mt-1 text-red-100">
              Contactez notre équipe pour un devis personnalisé.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 active:scale-95"
          >
            Demander un devis
          </Link>
        </div>
      </section>

     
    </div>
  );
};

export default AboutPage;