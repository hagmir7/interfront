'use client'
import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import ShowRoom from './ShowRoom'

/**
 * ShowRoomModal
 *
 * Props:
 *  - isOpen         {boolean}         Whether the modal is visible
 *  - onClose        {() => void}      Called when the user dismisses the modal
 *  - currentColorId {string|number}   Pre-selects this color when the modal opens
 */
export default function ShowRoomModal({ isOpen, onClose, currentColorId = null }) {
    const overlayRef = useRef(null)

    // Lock body scroll while open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [isOpen, onClose])

    // Close when clicking the backdrop (not the modal itself)
    const handleOverlayClick = useCallback((e) => {
        if (e.target === overlayRef.current) onClose()
    }, [onClose])

    if (!isOpen) return null

    return createPortal(
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Visualiseur de couleurs"
        >
            <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* ── Header ── */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 leading-tight">
                            Visualiseur de Couleurs
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Sélectionnez une couleur pour l'apercevoir en situation
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Brand */}
                        <span className="hidden sm:block select-none">
                            <span className="text-[#b6b6b7] font-black tracking-widest text-sm" style={{ fontFamily: 'DOCK11-Heavy' }}>INTER</span>
                            <span className="text-[#ec2228] font-black tracking-widest text-sm" style={{ fontFamily: 'DOCK11-Heavy' }}>COCINA</span>
                        </span>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Fermer"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Content ── */}
                <div className="overflow-y-auto flex-1">
                    <ShowRoom initialColorId={currentColorId} />
                </div>
            </div>
        </div>,
        document.body
    )
}