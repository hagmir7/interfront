import { FaWhatsapp } from 'react-icons/fa';
import CLink from '@/components/CLink';
import PlacardCards from '@/components/PlacardCards';
import Colors from '@/components/Colors';
import PlacardReviews from '@/components/PlacardReviews';

import PlacardSlideShow from '@/components/PlacardSlideShow';
import { ArrowRight } from 'lucide-react';


export const metadata = {
    title: 'Armoires, dressings et penderies sur mesure - Intercocina',
    description: 'Découvrez notre sélection d’armoires, dressings et penderies sur mesure chez Intercocina. Alliez qualité, style et rangement optimisé pour chaque espace.',
    keywords: 'armoire sur mesure, dressing moderne, penderie design, rangement intérieur, meubles Intercocina, dressing pratique, armoire élégante, aménagement chambre, mobilier sur mesure, organisation espace',
    alternates: {
        canonical: '/placards',
    },
};

const page = () => {
    return (
        <div>
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
                                            Des solutions de rangement élégantes pour un espace optimisé.
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
               
                <PlacardCards />


                
                

                <div className='max-w-7xl mx-auto py-3'>
                    

                    <div className="rounded-3xl bg-white p-8 shadow-xs border border-gray-100 text-center space-y-4 mt-3">

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-900">
                            Demander un devis gratuit
                        </h2>

                        {/* Small Description */}
                        <p className="text-gray-600 text-sm max-w-xl mx-auto">
                            Obtenez une estimation rapide et personnalisée pour votre projet sur mesure.
                            Notre équipe vous répond dans les plus brefs délais.
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 flex-wrap pt-2">

                            <CLink
                                href="/contact"
                                className="bg-[#ec2228] text-white font-semibold py-3 px-6 rounded-full hover:bg-red-800 transition duration-300"
                            >
                                Contactez-nous
                            </CLink>

                            <a
                                href="https://wa.me/21266610759"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 flex gap-2 items-center text-white font-semibold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300"
                            >
                                <FaWhatsapp size={20} />
                                <span>WhatsApp</span>
                            </a>

                        </div>

                    </div>
                </div>

            </div>

            <PlacardSlideShow />
            <div>

                {/* Bottom CTA */}

                <Colors />
                <PlacardReviews type='placards' />
            </div>
        </div>
    );
};

export default page;