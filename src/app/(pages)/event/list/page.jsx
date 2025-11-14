import CLink from '@/components/CLink'
import { api } from '@/lib/api'
import Image from 'next/image'
import React from 'react'

export const metadata = {
  title: 'Événements et exposition - Intercocina',
  description:
    'Intercocina est une entreprise spécialisée dans la fabrication de meubles de cuisine, meubles TV, placards et armoires, meubles de salle de bain, ainsi que de parquets, au Maroc.',
}

const EventsSection = async () => {
  const response = await api.get('events')
  const events = response.data.data

  return (
    <section className='relative px-4 pt-10 pb-20 bg-[#f2f2f2] overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl'></div>
      </div>

      <div className='relative max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <div className='inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200'>
            Événements & Expositions
          </div>
          <h2 className='mb-6 text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent leading-tight'>
            Joignez-vous à Nous lors des Événements
          </h2>
          <p className='max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed'>
            Clés pour Tout Savoir sur les Tendances de la Cuisine et du Design.
          </p>
        </div>

        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {events.map((event, index) => (
            <div
              key={index}
              className='group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-2'
            >
              {/* Image container with overlay effect */}
              <div className='relative overflow-hidden'>
                <CLink
                  href={`/event/${event.slug}`}
                  className='block relative h-64 overflow-hidden'
                >
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    title={event.title}
                    width={100}
                    height={100}
                    loading='lazy'
                    className='w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  {/* Hover overlay with icon */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'>
                    <div className='w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm'>
                      <svg
                        className='w-5 h-5 text-gray-800'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </div>
                  </div>
                </CLink>
              </div>

              {/* Content */}
              <div className='p-6'>
                <CLink
                  href={`/event/${event.slug}`}
                  className='block group-hover:text-blue-600 transition-colors duration-200'
                >
                  <h3 className='text-xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2'>
                    {event.title}
                  </h3>
                </CLink>

                <p className='text-gray-600 text-sm leading-relaxed'>
                  {event.description.length > 120
                    ? event.description.slice(0, 120).trim() + '...'
                    : event.description}
                </p>

                {/* Call to action */}
                <div className='mt-6 pt-4 border-t border-gray-100'>
                  <CLink
                    href={`/event/${event.slug}`}
                    className='inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200'
                  >
                    En savoir plus
                    <svg
                      className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </CLink>
                </div>
              </div>

              {/* Subtle gradient border effect */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsSection
