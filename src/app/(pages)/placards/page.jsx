"use client"
import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const page = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const projectImages = [
        { id: 1, src: 'https://boisetblanc.fr/wp-content/uploads/36.-Bobillot-12.webp', alt: 'Project Image 1' },
        { id: 2, src: 'https://boisetblanc.fr/wp-content/uploads/36.-Bobillot-9.webp', alt: 'Project Image 2' },
        { id: 3, src: 'https://boisetblanc.fr/wp-content/uploads/36.-Bobillot-11.webp', alt: 'Project Image 3' },
        { id: 4, src: '/api/placeholder/400/300', alt: 'Project Image 4' }
    ];

    const projectDetails = [
        { label: 'Client', value: 'Martin Stewart' },
        { label: 'Material', value: '100% Polyester' },
        { label: 'Location', value: 'London, UK' },
        { label: 'Shipping', value: 'Free Shipping' },
        { label: 'Category', value: 'Child Trolly' }
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
                                <a
                                    href="#contact"
                                    className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Contactez-nous
                                </a>
                                <a
                                    href="https://wa.me/212600000000" // Replace with your WhatsApp number
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

                        {/* Content Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Research & Planning
                                    </h2>
                                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"></div>
                                </div>

                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        Our comprehensive research and planning phase ensures every project delivers exceptional results.
                                        We dive deep into understanding user needs, market trends, and technical requirements to create
                                        solutions that not only look stunning but perform flawlessly across all platforms.
                                    </p>

                                    <p>
                                        Through meticulous planning and iterative design processes, we transform complex challenges into
                                        elegant, user-friendly experiences. Our approach combines creative vision with data-driven insights
                                        to deliver products that exceed expectations and drive meaningful engagement.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {['UX Research', 'Market Analysis', 'Technical Planning', 'User Testing'].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
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