import BrandsSection from '@/components/brand-section';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AboutPage = () => {

  const sections = [
    {
      title: 'Leader des cuisines modernes',
      description: 'Nous sommes profondément honorés de vous présenter notre société, qui se distingue en tant que leader incontesté dans le domaine de la fabrication sur mesure d\'éléments de cuisine. Notre expertise se fonde sur l\'exploitation de technologies de pointe, permettant ainsi la conception de cuisines d\'exception',
      image: 'https://intercocina.com/assets/imgs/intercocina.png',
      reversed: false
    },
    {
      title: 'Fabrication de meubles de cuisine',
      description: 'Depuis plus de 10 ans, INTERCOCINA excelle dans la fabrication de meubles de cuisine au Maroc, depuis son atelier à Nador. Notre équipe de menuisiers hautement qualifiés, hommes et femmes, met en œuvre son savoir-faire artisanal pour créer des meubles de cuisine d\'une qualité exceptionnelle. En choisissant méticuleusement des matériaux de qualité, nous nous engageons à vous proposer des meubles résistants qui traversent le temps avec distinction.',
      image: 'https://intercocina.com/assets/imgs/fabrication.jpg',
      reversed: true
    },
    {
      title: 'Produit de qualité',
      description: 'La sélection minutieuse des matériaux dans la confection de nos meubles et la rigueur de notre processus de création sont au cœur de notre engagement envers la qualité et la durabilité de nos produits. Depuis 2017, chacun de nos meubles est accompagné d\'une certification et d\'un certificat de catégorisation, offrant ainsi à nos clients l\'assurance d\'acquérir des pièces de mobilier exceptionnelles répondant aux normes de qualité les plus élevées.',
      image: 'https://intercocina.com/assets/imgs/qualite.jpg',
      reversed: false
    },
    {
      title: 'Une innovation renouvelée',
      description: 'Fort d\'une expérience de plus d\'une décennie, INTERCOCINA, leader en tant que fabricant de cuisines de renom, a toujours placé l\'innovation au cœur de sa stratégie de développement. Notre engagement envers l\'innovation vise à façonner des solutions qui transforment votre vie en rendant chaque aspect plus pratique, fonctionnel, et harmonieux, tout en répondant à vos besoins culinaires et esthétiques les plus exigeants.',
      image: 'https://intercocina.com/assets/imgs/innovation.jpg',
      reversed: true
    }
  ];


  return (
    <div className="bg-[#f2f2f2] rounded-b-xl border">
      {/* Header Section */}
      <div className="px-4 py-20 md:max-w-6xl md:mx-auto bg-white">
        <div className="px-3 max-w-3xl m-auto">
          <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
            L'excellence des cuisines De luxe au Maroc
          </h2>
          <p className="relative z-[11] my-8 text-lg text-gray-700 text-center">
            Haute qualité - Livraison rapide - Accessible
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/contact" 
              className="relative flex h-9 items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-red-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="leading-none relative text-base tracking-wider text-white">Contact</span>
            </Link>
            <Link 
              href="/produits" 
              className="group flex items-center gap-1 tracking-wide text-gray-500"
            >
              <span className="duration-300 group-hover:tracking-wider group-hover:underline group-hover:underline-offset-2">
                Nos produits
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="h-5 w-5 translate-y-px duration-300 group-hover:translate-x-1"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* About Sections */}
        {sections.map((section, index) => (
          <section key={index} className="mt-4">
            <div className="container mx-auto py-2 px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 ${section.reversed ? 'flex-row-reverse' : ''}`}>
                {section.reversed ? (
                  <>
                    <div className="mt-12 md:mt-0 sm:order-first">
                      <Image 
                        src={section.image} 
                        alt={`Intercocina ${section.title}`} 
                        width={100}
                        height={100} 
                        className="object-cover rounded-lg shadow-sm border bg-gray-100" 
                      />
                    </div>
                    <div className="max-w-lg">
                      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{section.title}</h2>
                      <p className="mt-4 text-gray-600 text-lg">{section.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="max-w-lg">
                      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{section.title}</h2>
                      <p className="mt-4 text-gray-600 text-lg">{section.description}</p>
                    </div>
                    <div className="sm:mt-12 mt-0 order-first sm:order-last">
                      <Image 
                        src={section.image} 
                        alt={`Intercocina ${section.title}`} 
                        width={100}
                        height={100} 
                        className="object-cover rounded-lg" 
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* Brands Section */}
       <BrandsSection />
      </div>
    </div>
  );
};

export default AboutPage;