export const revalidate = 3600;

import { ColorCard } from "@/components/ColorCard";
import { apiServer } from "@/lib/api-server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.votre-site.com";

export const metadata = {
  // metadataBase: new URL(SITE_URL),
  title: "Couleurs de Cuisine Tendances | Palette et Nuancier",
  description:
    "Découvrez notre large palette de couleurs tendances pour cuisine moderne : façades, finitions mates ou brillantes. Trouvez la teinte idéale pour sublimer votre cuisine.",
  keywords: [
    "couleurs cuisine",
    "couleurs tendances cuisine",
    "nuancier cuisine",
    "façades de cuisine",
    "cuisine moderne",
    "palette de couleurs",
  ],
  alternates: {
    canonical: "/colors",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Couleurs de Cuisine Tendances | Palette et Nuancier",
    description:
      "Une large palette de couleurs tendances pour sublimer une cuisine moderne avec style.",
    url: "/colors",
    siteName: "Intercocina",
    locale: "fr_FR",
    images: ["/main-image.png"],
    type: "website",
  },
};

async function getColors() {
  try {
    const data = await apiServer(
      "view-colors",
      {
        next: { revalidate: 3600 },
      },
      false
    );
    return data.data || [];
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
}

export default async function Page() {
  const colors = await getColors();

  // Données structurées (JSON-LD) pour les moteurs de recherche
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Couleurs de Cuisine Tendances",
    description:
      "Une large palette de couleurs tendances pour sublimer une cuisine moderne avec style.",
    url: `/colors`,
    inLanguage: "fr-FR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: colors.length,
      itemListElement: colors.slice(0, 20).map((color, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: color.name || color.title || `Couleur ${index + 1}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-4 md:py-10 px-2 md:px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-screen-xl">
        <header className="mb-12 text-center">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
            Une Grande Diversité de Couleurs Tendances
          </h1>
          <p className="text-slate-600 text-lg">
            Une large palette de couleurs tendances pour sublimer une cuisine
            moderne avec style.
          </p>
        </header>

        <section
          aria-label="Liste des couleurs"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {colors.map((color, index) => (
            <ColorCard key={color.id || index} color={color} />
          ))}
        </section>
      </div>
    </main>
  );
}