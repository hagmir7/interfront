import { Suspense } from 'react';
import Tracking from '@/components/Tracking';

export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    const code = params?.code?.trim();

    const siteName = 'Intercocina';



    const title = code
        ? `Suivi de la commande ${code} | ${siteName}`
        : `Suivre votre commande | ${siteName}`;

    const description = code
        ? `Consultez le statut et la progression de votre commande ${code} chez ${siteName}. Suivi en temps réel: fabrication, préparation, contrôle, livraison.`
        : `Suivez votre commande ${siteName} en temps réel. Entrez votre code de commande pour consulter l'avancement: acceptée, fabrication, préparation, contrôle qualité, livraison.`;

    const keywords = [
        'suivi commande',
        'tracking',
        'Intercocina',
        'suivi livraison',
        'statut commande',
        'où est ma commande',
        code,
    ].filter(Boolean);

    return {
        title,
        description,
        keywords,
        robots: {
            index: !code,
            follow: true,
        }
    };
}

/**
 * Tracking page (Server Component).
 * Reads the optional ?code= query param and forwards it to the Tracking
 * client component which handles the fetch and display.
 */
export default async function TrackingPage({ searchParams }) {
  const params = await searchParams;
  const initialCode = params?.code?.trim() || '';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-1 md:px-4">
        {/* Page header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Suivi de commande
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Suivez l&apos;avancement de votre commande en temps réel, de la
            fabrication à la livraison.
          </p>
        </header>

        {/* Tracking widget */}
        <Suspense fallback={<TrackingSkeleton />}>
          <Tracking initialCode={initialCode} />
        </Suspense>

        {/* Structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Suivi de commande Intercocina',
              description:
                'Page de suivi des commandes Intercocina en temps réel.',
              url: 'https://online.intercocina.space/tracking',
              inLanguage: 'fr-FR',
              isPartOf: {
                '@type': 'WebSite',
                name: 'Intercocina',
                url: 'https://online.intercocina.space',
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Accueil',
                    item: 'https://online.intercocina.space',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Suivi de commande',
                    item: 'https://online.intercocina.space/tracking',
                  },
                ],
              },
            }),
          }}
        />
      </div>
    </main>
  );
}

function TrackingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="bg-white rounded-xl shadow-sm p-2 md:p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
        <div className="flex gap-4 max-w-md mx-auto mb-8">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-28 h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-32 bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  );
}