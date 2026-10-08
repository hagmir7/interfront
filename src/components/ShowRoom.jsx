'use client'
import { api } from '@/lib/api';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import CLink from './CLink';

const STORAGE_URL = 'https://app.intercocina.com/storage/';

function ColorCard({ colorItem, isSelected, onClick }) {
    return (
        <button
            onClick={() => onClick(colorItem)}
            className={`
                group relative bg-white rounded-xl overflow-hidden text-left
                transition-all duration-200 ease-out cursor-pointer
                border-2 hover:shadow-md
                ${isSelected
                    ? 'border-red-500 shadow-md ring-1 ring-red-200'
                    : 'border-transparent hover:border-gray-200'
                }
            `}
            aria-pressed={isSelected}
            aria-label={`${colorItem.name} — ${colorItem.code}`}
        >
            {isSelected && (
                <span className="absolute top-1.5 right-1.5 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            )}
            <div className="aspect-square overflow-hidden bg-gray-50">
                <img
                    src={`${STORAGE_URL}${colorItem.image}`}
                    alt={colorItem.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-2">
                <p className={`text-xs font-semibold truncate leading-tight ${isSelected ? 'text-red-600' : 'text-gray-800'}`}>
                    {colorItem.name}
                </p>
                <p className={`text-xs mt-0.5 font-mono tracking-wide ${isSelected ? 'text-red-400' : 'text-gray-400'}`}>
                    {colorItem.code}
                </p>
            </div>
        </button>
    );
}

function Spinner() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-20 rounded-xl">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-red-500 rounded-full animate-spin" />
        </div>
    );
}

function SearchInput({ value, onChange, onClear }) {
    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
            <input
                id="searchInput"
                type="text"
                value={value}
                placeholder="Couleur, Référence…"
                onChange={onChange}
                className="
                    w-full pl-9 pr-9 py-2.5 text-sm bg-gray-50 text-gray-800
                    border border-gray-200 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                    placeholder:text-gray-400 transition-all
                "
            />
            {value && (
                <button
                    onClick={onClear}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Effacer la recherche"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}

function ShowRoom({initialColorId=null}) {
    const [allColors, setAllColors] = useState([]);
    const [filteredColors, setFilteredColors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentImage, setCurrentImage] = useState(null);
    const [nextImage, setNextImage] = useState(null);
    const [isCrossFading, setIsCrossFading] = useState(false);
    const [color, setColor] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedColorId, setSelectedColorId] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredColors(allColors);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredColors(
                allColors.filter(c =>
                    (c.name ?? '').toLowerCase().includes(lower) ||
                    (c.code ?? '').toLowerCase().includes(lower)
                )
            );
        }
    }, [searchTerm, allColors]);

    async function getData() {
        try {
            setLoading(true);
            const res = await api.get('view-colors');
            const data = res.data.data;
            setAllColors(data);
            setFilteredColors(data);

            const initialColor = (initialColorId && data.find(c => c.id == initialColorId)) || data[0];

            if (initialColor) {
                setColor(initialColor);
                setCurrentImage(initialColor.images?.[0]?.path || null);
                setSelectedColorId(initialColor.id);
            }
        } catch (err) {
            console.error('Error fetching colors:', err);
        } finally {
            setLoading(false);
        }
    }

    const crossFadeTimeout = useRef(null);

    const changeColor = useCallback((newColor) => {
        if (newColor.id === selectedColorId) return;

        const newPath = newColor.images?.[0]?.path || null;

        // Preload the new image, then cross-fade once ready
        if (newPath) {
            const img = new window.Image();
            img.src = `${STORAGE_URL}${newPath}`;
            const startFade = () => {
                setNextImage(newPath);
                setIsCrossFading(true);
                clearTimeout(crossFadeTimeout.current);
                crossFadeTimeout.current = setTimeout(() => {
                    setCurrentImage(newPath);
                    setNextImage(null);
                    setIsCrossFading(false);
                }, 350);
            };
            if (img.complete) {
                startFade();
            } else {
                img.onload = startFade;
                img.onerror = startFade; // still transition even on error
            }
        } else {
            setCurrentImage(null);
        }

        setColor(newColor);
        setSelectedColorId(newColor.id);
    }, [selectedColorId]);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const clearSearch = () => setSearchTerm('');

    const noResults = !loading && filteredColors.length === 0 && searchTerm.trim() !== '';

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 max-w-7xl">

            {/* ── Left: Main image viewer ── */}
            <div className="flex-1 min-w-0">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm aspect-video">
                    {loading && <Spinner />}

                    {/* Base layer — current image */}
                    {currentImage && (
                        <img
                            src={`${STORAGE_URL}${currentImage}`}
                            alt={color.name || 'Aperçu couleur'}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}

                    {/* Top layer — incoming image, fades in then becomes the base */}
                    {nextImage && (
                        <img
                            src={`${STORAGE_URL}${nextImage}`}
                            alt={color.name || 'Aperçu couleur'}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                            style={{ opacity: isCrossFading ? 1 : 0 }}
                        />
                    )}

                    {/* Placeholder when no image */}
                    {!currentImage && !loading && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* ── Image footer ── */}
                <div className="mt-3 flex items-center justify-between">
                    <div>
                        {color.name && (
                            <CLink
                                href={`/product/${color.product_slug}`}
                                className="inline-flex items-center gap-1.5 text-gray-800 hover:text-red-500 transition-colors group"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="text-lg font-semibold">{color.name}</span>
                                {color.code && (
                                    <span className="text-sm text-gray-400 font-mono">{color.code}</span>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.818 15.182 6.364-6.364m-4.95 0h4.95v4.95" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
                                </svg>
                            </CLink>
                        )}
                    </div>
                    <div className="select-none">
                        <span className="text-[#b6b6b7] font-black tracking-widest text-xl" style={{ fontFamily: 'DOCK11-Heavy' }}>INTER</span>
                        <span className="text-[#ec2228] font-black tracking-widest text-xl" style={{ fontFamily: 'DOCK11-Heavy' }}>COCINA</span>
                    </div>
                </div>
            </div>

            {/* ── Right: Color picker panel ── */}
            <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-3">
                <SearchInput
                    value={searchTerm}
                    onChange={handleSearch}
                    onClear={clearSearch}
                />

                {/* Result count */}
                <p className="text-xs text-gray-400 px-0.5">
                    {loading
                        ? 'Chargement…'
                        : `${filteredColors.length} couleur${filteredColors.length !== 1 ? 's' : ''}${searchTerm ? ' trouvée' + (filteredColors.length !== 1 ? 's' : '') : ''}`
                    }
                </p>

                {/* Color grid */}
                <div className="overflow-y-auto flex-1 max-h-[72vh] pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                    {noResults ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
                            <svg className="w-10 h-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm">Aucun résultat pour <strong>"{searchTerm}"</strong></p>
                            <button onClick={clearSearch} className="text-xs text-red-500 hover:underline mt-1">
                                Effacer la recherche
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-2 pb-2">
                            {filteredColors.map((colorItem) => (
                                <ColorCard
                                    key={colorItem.id}
                                    colorItem={colorItem}
                                    isSelected={selectedColorId === colorItem.id}
                                    onClick={changeColor}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowRoom;