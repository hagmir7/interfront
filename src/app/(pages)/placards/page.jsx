"use client"
import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import CLink from '@/components/CLink';

const page = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const projectImages = [
        { id: 1, src: 'https://boisetblanc.fr/wp-content/uploads/36.-Bobillot-12.webp', alt: 'Project Image 1' },
        { id: 2, src: 'https://boisetblanc.fr/wp-content/uploads/36.-Bobillot-9.webp', alt: 'Project Image 2' },
        { id: 3, src: 'https://boisetblanc.fr/wp-content/uploads/36.-Bobillot-11.webp', alt: 'Project Image 3' },
    ];

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2]">
            <div className="relative min-h-[250px] max-sm:min-h-[230px] bg-cover bg-center z-[2] w-full before:absolute before:inset-0 before:bg-black before:opacity-40 before:z-[-1]"
                style={{ backgroundImage: "url('https://www.gamso-menuiseries.fr/wp-content/uploads/2024/07/gamso-amenagement-interieur.jpg')" }}>
                <div className="container relative z-10 table h-full mx-auto px-4">
                    <div className="container relative z-10 table h-full mx-auto px-4">
                        <div className="text-center py-[90px] max-sm:py-10 table-cell align-middle h-[500px] max-sm:h-[230px]">
                            <h1 className="mb-2.5 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                                Dressings et armoires sur mesure
                            </h1>
                            <nav>
                                <ul className="text-white mb-6">
                                    <li className="pl-4 inline-block text-lg font-medium relative before:content-['›'] before:absolute before:left-0 before:font-bold before:text-white">
                                        Optimisez votre espace avec nos solutions de rangement élégantes et fonctionnelles
                                    </li>
                                </ul>
                            </nav>
                            {/* Buttons */}
                            <div className="flex justify-center gap-4 flex-wrap">
                                <CLink
                                    href="/contact"
                                    className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Contactez-nous
                                </CLink>
                                <a
                                    href="https://wa.me/21266610759"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 flex gap-2 items-center text-white font-semibold py-2 px-5 rounded-full hover:bg-green-600 transition-colors"
                                >
                                    <FaWhatsapp size={23} />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className=" gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {projectImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full min-h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                    <button
                                        onClick={() => openLightbox(image)}
                                        className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                                    >
                                        <Maximize2 size={20} className="text-gray-700" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full">
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-full h-full object-contain rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;