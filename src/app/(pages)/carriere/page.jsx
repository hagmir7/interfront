import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'Carrière chez Intercocina | Rejoignez notre équipe',
  description:
    "Intercocina recrute. Rejoignez une équipe industrielle en pleine expansion — unités de production, bureaux techniques et services supports. Cuisines sur mesure de haute qualité.",
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
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* ====================== HERO ====================== */}
      <header className="relative bg-gray-100 overflow-hidden">
        {/* Red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(228,55,58,0.15) 0%, transparent 70%)',
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(black 1px,transparent 1px),linear-gradient(90deg,black 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#e4373a]" />
                <span className="text-[#e4373a] text-[10px] font-extrabold tracking-[0.3em] uppercase">
                  Rejoignez notre équipe
                </span>
              </div>
              <h1
                className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-[#e4373a]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Carrière
                <br />
                <span className="text-gray-500">chez</span> Intercocina
              </h1>
              <p className="mt-6 max-w-md text-gray-700 text-sm sm:text-base leading-relaxed">
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
              {/* Decorative accent corner */}
              <div className="absolute -bottom-3 -left-3 h-20 w-20 bg-[#e4373a] rounded-2xl -z-0 opacity-90 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      {/* ====================== MISSION + DEVELOPMENT ====================== */}
      <section className="relative bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#e4373a]" />
                <span className="text-[#e4373a] text-[10px] font-extrabold tracking-[0.3em] uppercase">
                  Notre vision
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1] text-gray-900"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                L'humain au cœur de la{' '}
                <span className="text-[#e4373a]">performance industrielle</span>.
              </h2>
             <div className='mt-3'>
               <a className=' text-gray-600 hover:text-[#e4373a] font-black'  href="mailto:rh@intercocin.com">Rh@intercocin.com</a>
             </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                Grâce à l'expertise de ses équipes et à une vision orientée
                innovation, Intercocina accompagne la croissance de ses
                partenaires professionnels avec des solutions de cuisines sur
                mesure de haute qualité.
              </p>
              <p className="mt-5 text-gray-700 text-base lg:text-lg leading-relaxed">
                Nous renforçons continuellement nos équipes au sein de nos{' '}
                <span className="text-gray-900 font-semibold">
                  unités de production, bureaux techniques et services supports
                </span>
                . Profils dynamiques, rigoureux et motivés, bienvenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== VALUES ====================== */}
      <section className="relative bg-gray-100 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(black 1px,transparent 1px),linear-gradient(90deg,black 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#e4373a]" />
            <span className="text-[#e4373a] text-[10px] font-extrabold tracking-[0.3em] uppercase">
              Nos valeurs
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1] text-gray-900"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ce que nous <span className="text-[#e4373a]">valorisons</span>.
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <ValueCard
              title="Professionnalisme"
              text="Rigueur et exigence dans chaque geste, de la conception à la finition."
            />
            <ValueCard
              title="Esprit d'équipe"
              text="Une collaboration sincère entre ateliers, bureaux et services."
            />
            <ValueCard
              title="Amélioration continue"
              text="Chaque jour, une occasion de faire mieux — pour tous."
            />
          </div>
        </div>
      </section>

      {/* ====================== CTA (LIGHT) ====================== */}
      <section className="relative overflow-hidden border-t border-gray-200">
        {/* Red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 90% 50%, rgba(228,55,58,0.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#e4373a]" />
                <span className="text-[#e4373a] text-[10px] font-extrabold tracking-[0.3em] uppercase">
                  Candidature
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] text-gray-900"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Envie de nous{' '}
                <span className="text-[#e4373a]">rejoindre</span> ?
              </h2>
              <p className="mt-5 max-w-xl text-gray-700 text-base leading-relaxed">
                Envoyez votre candidature — nous étudions chaque profil avec
                attention.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl">
                <span className="text-gray-500 text-[10px] font-extrabold tracking-[0.3em] uppercase">
                  Contact RH
                </span>
                <a
                  href="mailto:rh@intercocin.com"
                  className="mt-4 block break-all text-2xl sm:text-3xl font-black tracking-tight text-gray-900 hover:text-[#e4373a] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  RH@INTERCOCINA.COM
                </a>
                <a
                  href="mailto:rh@intercocin.com"
                  className="mt-6 inline-flex items-center gap-3 bg-[#e4373a] hover:bg-gray-900 text-white px-6 py-3 text-[11px] font-extrabold tracking-[0.25em] uppercase transition-colors border border-[#e4373a] hover:border-gray-900 rounded-full"
                >
                  Envoyer ma candidature
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ValueCard({ title, text }) {
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-2xl hover:border-[#e4373a] hover:shadow-md transition-all">
      <div className="h-px w-8 bg-[#e4373a] mb-5" />
      <h3
        className="text-xl font-black tracking-tight text-gray-900"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {title}
      </h3>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}