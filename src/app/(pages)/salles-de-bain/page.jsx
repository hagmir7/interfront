import { FaWhatsapp } from 'react-icons/fa';
import CLink from '@/components/CLink';
import PlacardCards from '@/components/PlacardCards';
import Colors from '@/components/Colors';
import PlacardReviews from '@/components/PlacardReviews';
import SallesDeBainCards from '@/components/salles-de-bain-cards';
import Image from 'next/image';

const FeatureItem = ({ icon, alt, text }) => (
    <div className="flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform duration-200">
        <Image src={icon} alt={alt} width={60} height={60} />
        <h3 className="text-sm font-semibold text-gray-800">{text}</h3>
    </div>
);

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
            {/* <SallesDeBainCards /> */}


            <div className="max-w-7xl gap-10 p-6 lg:p-10 m-auto">

                <div className='mb-6'>
                    <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">Nos meubles de salle de bain</h1>
                    {/* <p className='text-center text-xl'> </p> */}
                </div>

                {/* LEFT IMAGE */}
                <div>
                    <Image
                        src="/imgs/salle-de-bein.svg"
                        className="w-full rounded-3xl object-cover"
                        width={700}
                        height={700}
                        alt="Salle de bain sur mesure"
                    />
                </div>

                {/* RIGHT CONTENT */}
                <div className="space-y-6 mt-4">

                      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            <FeatureItem icon="/icons/epaisseur.svg" alt="Épaisseur" text="Épaisseur au choix (16, 18, 22 mm)" />
                            <FeatureItem icon="/icons/rapide.svg" alt="Préparation rapide" text="Fabrication rapide" />
                            <FeatureItem icon="/icons/couleurs.svg" alt="Couleurs" text="+50 couleurs disponibles" />
                            <FeatureItem icon="/icons/mesure.svg" alt="Sur mesure" text="100% fabriqué sur mesure" />
                            <FeatureItem icon="/icons/poignees.svg" alt="Poignées" text="+20 poignées disponibles" />
                        </div>
                    </div>

                    {/* TOP INFO BOXES */}
                    {/* <div className="grid sm:grid-cols-2 gap-4">

                        <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-md transition duration-300">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                Design moderne & élégant
                            </h3>
                            <p className="text-sm text-gray-600">
                                Des finitions premium adaptées aux salles de bain contemporaines.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-md transition duration-300">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                Matériaux résistants à l’humidité
                            </h3>
                            <p className="text-sm text-gray-600">
                                Conçus pour durer dans les environnements humides.
                            </p>
                        </div>

                    </div> */}

                    {/* FEATURES SECTION */}
                    <div className="rounded-3xl bg-white p-8 shadow-md border border-gray-100 text-center space-y-4 mt-3">

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


            <Colors />
            <PlacardReviews />
        </div>
    );
};

export default page;