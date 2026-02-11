import { FaWhatsapp } from 'react-icons/fa';
import CLink from '@/components/CLink';
import PlacardCards from '@/components/PlacardCards';
import Colors from '@/components/Colors';
import PlacardReviews from '@/components/PlacardReviews';
import SallesDeBainCards from '@/components/salles-de-bain-cards';

const page = () => {
    return (
        <div className="min-h-screen bg-[#f2f2f2]">
            <div className="relative min-h-[250px] max-sm:min-h-[230px] bg-cover bg-center z-[2] w-full before:absolute before:inset-0 before:bg-black before:opacity-40 before:z-[-1]"
                style={{ backgroundImage: "url('/imgs/salle-de-bein.png')" }}>
                <div className="container relative z-10 table h-full mx-auto px-4">
                    <div className="container relative z-10 table h-full mx-auto px-4">
                        <div className="text-center py-[90px] max-sm:py-10 table-cell align-middle h-[500px] max-sm:h-[230px]">
                            <h1 className="mb-2.5 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                               Meubles de salle de bain sur mesure
                            </h1>
                            <nav>
                                <ul className="text-white mb-6">
                                    <li className="pl-4 inline-block text-lg font-medium relative before:content-['›'] before:absolute before:left-0 before:font-bold before:text-white">
                                       Des meubles qui transforment la salle de bain en un espace fonctionnel et harmonieux.
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
            <SallesDeBainCards />
            <Colors />
            {/* <PlacardReviews /> */}
        </div>
    );
};

export default page;