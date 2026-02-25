// app/faqs/page.jsx — SERVER COMPONENT

import CLink from "@/components/CLink";
import FAQAccordion from "@/components/Faqaccordion";
import Image from "next/image";

export const metadata = {
    title: "FAQ - Intercocina",
    description:
        "Consultez la FAQ d'Intercocina pour toutes vos questions sur nos meubles sur mesure, commandes, livraison et service client.",
    keywords:
        "FAQ Intercocina, questions fréquentes, aide meubles sur mesure, support client, livraison, commande, conseils aménagement, assistance Intercocina",
    alternates: {
        canonical: "/faqs",
    },
};

async function getFaqs() {
    try {
        const res = await fetch("https://interapi.facepy.com/api/faqs", {
            // Revalidate every hour, or use { cache: 'no-store' } for always-fresh
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error("Failed to fetch FAQs");

        const data = await res.json();
        return data.map((item) => ({
            q: item.question,
            a: item.answer,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function FAQPage() {
    const faqs = await getFaqs();

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="px-4 text-center lg:px-12">
                <div className="w-full flex justify-center py-6">
                    <CLink href="#">
                        <Image
                            className="w-48"
                            src="https://interapi.facepy.com/assets/imgs/intercocina-logo.png"
                            width={192}
                            height={80}
                            alt="Intercocina faq"
                            title="Intercocina FAQs"
                        />
                    </CLink>
                </div>

                <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">
                    Frequently asked questions (FAQ)
                </h1>

                <p className="mb-8 text-md font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                    Vous avez des questions? Vous trouverez ici les réponses les plus
                    appréciées par nos partenaires, ainsi que l'accès à des instructions
                    détaillées et à un support.
                </p>
            </div>

            {/* Client component handles all interactivity */}
            <FAQAccordion faqs={faqs} />
        </div>
    );
}