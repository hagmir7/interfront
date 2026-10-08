import ShowRoom from '@/components/ShowRoom'
import React from 'react'

export const metadata = {
    title: 'Visualiseur de Couleurs Cuisine | INTERCOCINA',
    description: 'Explorez notre collection de couleurs et finitions pour votre cuisine sur mesure. ',
    keywords: [
        'couleurs cuisine',
        'cuisine sur mesure',
        'visualiseur couleurs',
        'finitions cuisine',
        'cuisine design',
        'intercocina',
        'couleurs façades cuisine',
        'décoration cuisine',
        'cuisine moderne',
        'choix couleur cuisine',
    ],
    openGraph: {
        title: 'Visualiseur de Couleurs Cuisine | INTERCOCINA',
        description: 'Explorez notre collection de couleurs et finitions pour votre cuisine sur mesure. Visualisez en temps réel le rendu de chaque coloris.',
        type: 'website',
    },
}

export default function page() {
    return (
        <div>
            <div className="container mx-auto px-4 pt-8 pb-2 max-w-7xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Visualiseur de Couleurs
                </h1>
                <p className="mt-2 text-gray-500 text-sm md:text-base max-w-xl">
                    Parcourez notre collection de couleurs et finitions, et visualisez en temps réel le rendu dans votre cuisine.
                </p>
            </div>
            <ShowRoom />
        </div>
    )
}