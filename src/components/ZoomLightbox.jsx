'use client'
import React, { useState, useEffect, useCallback } from 'react'

/**
 * ImageHotspot
 *
 * Props:
 *  - mainImage  {string}   Path/URL to the main cabinet image
 *  - hotspots   {Array}    Array of hotspot objects (see default below)
 *
 * Hotspot object shape:
 *  {
 *    id:       number       unique id
 *    label:    string       short label shown in the lightbox (e.g. "Étagère ajustable")
 *    description: string    optional detail text
 *    x:        number       horizontal position in % from left
 *    y:        number       vertical position in % from top
 *    zoomImage: string      URL of the zoomed detail image
 *  }
 */

const DEFAULT_HOTSPOTS = [
    {
        id: 1,
        label: 'Panneau intérieur',
        description: 'Panneau mélaminé haute résistance, finition lisse.',
        x: 28,
        y: 28,
        zoomImage: null,
    },
    {
        id: 2,
        label: 'Angle & assemblage',
        description: 'Jointure renforcée avec chant ABS anti-choc.',
        x: 62,
        y: 26,
        zoomImage: null,
    },
    {
        id: 3,
        label: 'Étagère ajustable',
        description: 'Tablette intermédiaire réglable en hauteur tous les 32 mm.',
        x: 38,
        y: 52,
        zoomImage: null,
    },
    {
        id: 4,
        label: 'Pied réglable',
        description: 'Pied de 150 mm ajustable pour compenser les irrégularités du sol.',
        x: 68,
        y: 68,
        zoomImage: null,
    },
]

function Hotspot({ spot, index, onClick, isActive }) {
    return (
        <button
            onClick={() => onClick(spot)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            aria-label={`Voir détail : ${spot.label}`}
        >
            {/* Pulse ring */}
            <span className={`absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60 ${isActive ? 'hidden' : ''}`} />

            {/* Main dot */}
            <span
                className={`
                    relative flex items-center justify-center
                    w-8 h-8 rounded-full border-2 border-white shadow-lg
                    transition-all duration-200
                    ${isActive
                        ? 'bg-white scale-110 border-red-500'
                        : 'bg-red-500 group-hover:scale-110 group-hover:bg-red-600'
                    }
                `}
            >
                {/* Number */}
                <span className={`text-xs font-bold leading-none ${isActive ? 'text-red-500' : 'text-white'}`}>
                    {index + 1}
                </span>
            </span>

            {/* Tooltip label on hover */}
            <span className="
                pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                whitespace-nowrap text-xs font-medium text-white
                bg-gray-900/90 rounded-md px-2.5 py-1.5 shadow
                opacity-0 group-hover:opacity-100 transition-opacity duration-150
            ">
                {spot.label}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
            </span>
        </button>
    )
}

function ZoomLightbox({ spot, onClose, hotspots, onNavigate }) {
    const currentIndex = hotspots.findIndex(h => h.id === spot.id)
    const hasPrev = currentIndex > 0
    const hasNext = currentIndex < hotspots.length - 1

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight' && hasNext) onNavigate(hotspots[currentIndex + 1])
            if (e.key === 'ArrowLeft' && hasPrev) onNavigate(hotspots[currentIndex - 1])
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [spot, hasPrev, hasNext])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {currentIndex + 1}
                        </span>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{spot.label}</h3>
                            {spot.description && (
                                <p className="text-xs text-gray-400 mt-0.5">{spot.description}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Fermer"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Zoom image */}
                <div className="relative bg-gray-50 aspect-video flex items-center justify-center overflow-hidden">
                    {spot.zoomImage ? (
                        <img
                            src={spot.zoomImage}
                            alt={spot.label}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        /* Placeholder when no zoom image is provided */
                        <div className="flex flex-col items-center gap-3 text-gray-300 py-16">
                            <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            <span className="text-sm">Image de détail à venir</span>
                        </div>
                    )}
                </div>

                {/* Footer navigation */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                    <button
                        onClick={() => hasPrev && onNavigate(hotspots[currentIndex - 1])}
                        disabled={!hasPrev}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Précédent
                    </button>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-1.5">
                        {hotspots.map((h, i) => (
                            <button
                                key={h.id}
                                onClick={() => onNavigate(h)}
                                className={`rounded-full transition-all duration-200 ${
                                    h.id === spot.id
                                        ? 'w-4 h-2 bg-red-500'
                                        : 'w-2 h-2 bg-gray-200 hover:bg-gray-400'
                                }`}
                                aria-label={`Détail ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => hasNext && onNavigate(hotspots[currentIndex + 1])}
                        disabled={!hasNext}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Suivant
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ImageHotspot({
    mainImage = '/images/détails_Caissons.png',
    hotspots = DEFAULT_HOTSPOTS,
}) {
    const [activeSpot, setActiveSpot] = useState(null)

    const handleOpen = useCallback((spot) => setActiveSpot(spot), [])
    const handleClose = useCallback(() => setActiveSpot(null), [])
    const handleNavigate = useCallback((spot) => setActiveSpot(spot), [])

    // Lock scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = activeSpot ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [activeSpot])

    return (
        <>
            <div className="relative inline-block w-full select-none">
                {/* Main image */}
                <img
                    src={mainImage}
                    alt="Détails du caisson"
                    className="w-full h-auto block rounded-xl"
                    draggable={false}
                />

                {/* Hotspot dots */}
                {hotspots.map((spot, i) => (
                    <Hotspot
                        key={spot.id}
                        spot={spot}
                        index={i}
                        onClick={handleOpen}
                        isActive={activeSpot?.id === spot.id}
                    />
                ))}

                {/* Legend hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                    Cliquez sur un point pour voir le détail
                </div>
            </div>

            {/* Lightbox */}
            {activeSpot && (
                <ZoomLightbox
                    spot={activeSpot}
                    hotspots={hotspots}
                    onClose={handleClose}
                    onNavigate={handleNavigate}
                />
            )}
        </>
    )
}