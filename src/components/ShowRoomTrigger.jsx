'use client'
import React, { useState } from 'react'
import ShowRoomModal from './ShowRoomModal'

/**
 * ShowRoomTrigger
 *
 * A clickable banner placed under a product to open the color visualizer.
 *
 * Props:
 *  - colorId  {string|number}  The product's current color id to pre-select in the showroom
 *  - className {string}        Optional extra classes for positioning/margin
 */
export default function ShowRoomTrigger({ colorId = null, className = '' }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`group relative w-full overflow-hidden rounded-xl border border-gray-200 hover:border-red-300 bg-white hover:bg-red-50/40 transition-all duration-300 px-5 py-4 flex items-center justify-between gap-4 cursor-pointer shadow-sm hover:shadow-md ${className}`}
            >
                {/* Left: icon + text */}
                <div className="flex items-center gap-3.5">
                    {/* Palette icon */}
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-300">
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                        </svg>
                    </div>

                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-200 leading-tight">
                            Voir dans le visualiseur
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Explorez toutes les couleurs et finitions disponibles
                        </p>
                    </div>
                </div>

                {/* Right: color swatches preview + arrow */}
                <div className="flex items-center gap-2.5 shrink-0">
                    {/* Decorative animated color dots */}
                    <div className="hidden sm:flex items-center -space-x-1.5">
                        {['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'].map((color, i) => (
                            <span
                                key={color}
                                className="w-4 h-4 rounded-full border-2 border-white ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-0.5"
                                style={{
                                    backgroundColor: color,
                                    transitionDelay: `${i * 30}ms`
                                }}
                            />
                        ))}
                    </div>

                    {/* Arrow */}
                    <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-red-500 flex items-center justify-center transition-all duration-300">
                        <svg
                            className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                </div>

                {/* Subtle animated background sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-red-50/60 to-transparent transition-transform duration-500 ease-out pointer-events-none" />
            </button>

            <ShowRoomModal
                isOpen={open}
                onClose={() => setOpen(false)}
                currentColorId={colorId}
            />
        </>
    )
}