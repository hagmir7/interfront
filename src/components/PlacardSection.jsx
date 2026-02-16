'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import CLink from './CLink';
import { api } from '@/lib/api';


const PlacarColors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseImageUrl = 'https://interapi.facepy.com/storage/';

  const getImageUrl = (color) => {
    if (color.image) {
      return `${baseImageUrl}${color.image}`;
    }

    return '/placeholder.png';
  };

  const fetchColors = async () => {
    try {
      const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://interapi.facepy.com';

      const response = await api.get(`${baseURL}/api/view-colors?per_page=12`);

      setColors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching colors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  if (loading) {
    return <p className='text-sm text-gray-500'>Chargement des couleurs…</p>;
  }

  return (
    <div className='text-left'>
      <p className='font-bold text-gray-700 mb-3 text-sm md:text-base'>
        +50 Couleurs disponibles
      </p>

      <ul className='flex flex-wrap gap-1 md:gap-2 mb-4'>
        {colors.map((color) => {
          const imageUrl = getImageUrl(color);

          return (
            <li
              key={color.id}
              className='group relative text-center me-1 md:me-3'
            >
              {/* Color Box */}
              <div
                className='w-16 h-16 md:w-20 md:h-20 border border-gray-500 rounded-lg cursor-pointer hover:scale-105 transition-transform'
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Tooltip */}
              <div
                className='absolute -top-60 left-1/2 hidden group-hover:block -translate-x-1/2 bg-neutral-950 border-2 border-black rounded text-sm text-white w-44 z-10 overflow-hidden'
                role='tooltip'
              >
                <p className='p-2 text-center font-medium'>
                  {color.name}
                </p>

                <Image
                  src={imageUrl}
                  alt={color.name}
                  width={180}
                  height={180}
                  className='w-full object-cover'
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};




const PlacarSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroCarouselData = [
    {
      title: 'Dressing – Sur mesure',
      description: 'Dressings sur mesure, avec un large choix de couleurs et de poignées pour une finition élégante et personnalisée.',
      image: '/imgs/placard/placard-dressing.png',
      link: '/placards'
    },
    {
      title: 'Placards Coulissants – Sur mesure',
      description: 'Placards coulissants sur mesure, modernes et fonctionnels, avec de nombreuses options de couleurs et de poignées.',
      image: '/imgs/placard/placard-colise.png',
      link: '/placards'
    },
    {
      title: 'Placards Battants – Sur mesure',
      description: 'Placards battants sur mesure, robustes et esthétiques, avec un large choix de couleurs et de poignées pour s’adapter parfaitement à votre intérieur.',
      image: '/imgs/placard/placard-abatible.png',
      link: '/placards'
    }
  ];


  return (
    <section className='max-w-7xl mx-auto px-2 md:px-4 py-8 md:py-12'>
      <div className='grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6'>
        {/* Main Hero Carousel */}
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 1000 }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className='hero-swiper'
          >
            {heroCarouselData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center py-3 md:py-9 px-3 md:p-8'>
                  <div className='order-2 sm:order-1 space-y-4'>
                    <div className='flex items-center gap-4'>
                      <span className='text-sm text-[#da3036] font-bold text-md  uppercase tracking-wider'>
                        Devis Gratuit
                      </span>
                    </div>
                    <h2 className='text-lg sm:text-3xl font-semibold text-gray-900 hover:text-red-600 transition mb-2'>
                      <CLink href={item.link}>{item.title}</CLink>
                    </h2>
                    <PlacarColors />
                    <p className='text-gray-600 mb-7 text-sm md:text-base'>{item.description}</p>
                    <div className='flex justify-end md:justify-start w-full'>
                      <CLink
                        href={item.link}
                        className='rounded-lg flex gap-2  text-white bg-[#da3036] hover:bg-red-600 py-1.5 md:py-3 px-3 md:px-5 text-sm md:text-[17px] hover:text-white'
                      >
                        <span> Voir Plus</span>
                        <ArrowRight className='h-5 md:h-6' />
                      </CLink>
                    </div>
                  </div>
                  <div className='order-1 sm:order-2 mb-4 sm:mb-0'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={700}
                      height={700}
                      className='w-full h-auto object-contain rounded-2xl max-h-[300px] md:max-h-[450px]'
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
};

export default PlacarSection;