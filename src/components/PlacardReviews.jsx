"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { Maximize2, X, User } from 'lucide-react';

export default function PlacardReviews({ type }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const projects = [
        {
            id: 1,
            src: '/imgs/placard/placard-sub.jpg',
            alt: 'Placard 1',
            review: {
                name: "Mounia",
                text: "Très bonne expérience du début à la fin. Le placard est solide, bien conçu et s’intègre parfaitement à notre intérieur."
            }
        },
        {
            id: 2,
            src: 'https://boisetblanc.fr/wp-content/uploads/36.-Bobillot-9.webp',
            alt: 'Placard 2',
            review: {
                name: "Imane",
                text: "Travail soigné et finitions de qualité."
            }
        },
        {
            id: 3,
            src: '/imgs/placard/DSC_0373.jpg',
            alt: 'Placard 3',
            review: {
                name: "Youssef",
                text: "Nous apprécions la qualité des matériaux et le soin apporté aux détails. Le résultat final est à la hauteur."
            }
        },
        {
            id: 4,
            src: '/imgs/placard/placard-4.jpeg',
            alt: 'Placard 4',
            review: {
                name: "Yassine",
                text: "Très satisfait de notre placard sur mesure."
            }
        },
        {
            id: 5,
            src: '/imgs/placard/placard-2.jpeg',
            alt: 'Placard 5',
            review: {
                name: "Karim",
                text: "Le design est parfait et la qualité irréprochable."
            }
        },
        {
            id: 6,
            src: '/imgs/placard/placard-3.jpeg',
            alt: 'Placard 6',
            review: {
                name: "Sara",
                text: "Une équipe professionnelle et un résultat magnifique."
            }
        },
    ];




    const projects_sale_de_bain = [
        {
            id: 1,
            src: '/imgs/salle-de-bein/image-1.png',
            alt: 'Placard 1',
            review: {
                name: "Mounia",
                text: "Travail soigné et finitions de qualité."
            }
        },
        {
            id: 2,
            src: '/imgs/salle-de-bein/image-2.png',
            alt: 'Placard 2',

        },
        {
            id: 3,
            src: '/imgs/salle-de-bein/image-3.png',
            alt: 'Placard 3',
        },
        {
            id: 4,
            src: '/imgs/salle-de-bein/image-4.png',
            alt: 'Placard 4',

        },
        {
            id: 5,
            src: '/imgs/salle-de-bein/image-5.png',
            alt: 'Placard 5',
        },
        {
            id: 6,
            src: '/imgs/salle-de-bein/image-6.png',
            alt: 'Placard 6',

        },
    ];


    const openLightbox = (image) => setSelectedImage(image);
    const closeLightbox = () => setSelectedImage(null);

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-6 md:mb-10 mt-6">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {type === 'placards' ? "Retours Clients" : 'Galerie d’inspirations'}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     {type === 'placards' ? "Les avis et retours d’expérience de nos clients sur notre savoir-faire, notre qualité et notre engagement" 
                     : 'Galerie d’inspirations'}
                </p>
            </div>

            {/* Image Grid with Reviews */}
            <div className="max-w-7xl mx-auto py-12 px-4 hidden lg:block">
                <div className="grid grid-cols-3 gap-8">
                    {(type == 'placrds' ? projects : projects_sale_de_bain).map((project) => (
                        <div key={project.id} className="space-y-4">
                            {/* Image */}
                            <div className="relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                <Image
                                    src={project.src}
                                    alt={project.alt}
                                    width={700}
                                    height={700}
                                    className="w-full min-h-full max-h-96 object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                <button
                                    onClick={() => openLightbox(project)}
                                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                                >
                                    <Maximize2 size={20} className="text-gray-700" />
                                </button>
                            </div>

                            {/* Review */}
                            {
                                type === 'placards' && <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 shadow-sm">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User size={24} className="text-gray-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{project.review.name}</p>
                                        <p className="text-gray-700 mt-1">{project.review.text}</p>
                                    </div>
                                </div>
                            }
                           
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative max-w-4xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                width={1000}
                                height={1000}
                                className="w-full h-full object-contain rounded-2xl max-h-[600px]"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
