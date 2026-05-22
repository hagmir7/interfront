import ParqetCaracteristiques from "@/components/ParqetCaracteristiques";
import ProductCard from "@/components/ProductCard";
import ProductClient from "@/components/ProductClient";
import ProductPiece from "@/components/ProductPiece";
import ShareProduct from "@/components/ShareProduct";
import ShowRoomTrigger from "@/components/ShowRoomTrigger";
import ImageHotspot from "@/components/ZoomLightbox";
import { api } from "@/lib/api";
import { truncate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const response = await api.get(`products/${slug}`);
    const product = response.data?.data ?? response.data;

    return {
      title: `${product.name}`,
      description: `${truncate(product.description)}`,
      keywords: `${product.tags}, armoires, meubles sur-mesure, rangement`,
      openGraph: {
        title: `${product.name}`,
        description: `${truncate(product.description)}`,
        images: 'https://app.intercocina.com/storage/' + product.images?.[0]?.image ? [{ url: product.images[0].image }] : [],
      },
    };
  } catch {
    return { title: 'Produit introuvable', description: 'Erreur lors du chargement du produit.' };
  }
}


export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearch = await searchParams;
  const code = resolvedSearch?.code ?? null;

  let product;

  try {
    const response = await api.get(`products/${slug}`);
    const data = response.data;
    product = data?.data ?? data;
  } catch {
    notFound();
  }

  const options = product?.options ?? {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: 'https://app.intercocina.com/storage/' + product.images?.[0]?.image ?? "",
    brand: {
      "@type": "Brand",
      name: "INTERCOCINA",
    },
    offers: {
      "@type": "Offer",
      url: `https://intercocina.com/product/${product.slug}`,
      priceCurrency: "MAD",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    manufacturer: {
      "@type": "Organization",
      name: "INTERCOCINA",
    },
    ...(product.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "150",
        bestRating: "100",
        worstRating: "1",
      },
    }),
  };

  return (
    <section className="py-2 md:py-6 mt-5 md:mt-6">

      <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductClient product={product} code={code} />

        
        {product?.piece?.length > 0 && <ProductPiece pieces={product.piece || []} />}

        <div className="mt-2">
          {product?.color && <ShowRoomTrigger colorId={product?.color?.id} />}
        </div>

        {/* Related Products */}
        {product?.related?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9 mt-5 mb-3">
            {product.related.map((related, index) => (
              <ProductCard key={related.id ?? index} {...related} />
            ))}
          </div>
        )}


        {
          parseInt(product?.type?.category_id) === 12 && (<ImageHotspot
            mainImage="/imgs/zoom-caissons/caisson-granada.png"
            hotspots={[
              { id: 1, label: 'Peçages', description: '...', x: 28, y: 20, zoomImage: '/imgs/zoom-caissons/trous.png' },
              { id: 2, label: "Structure interne du Panneau", description: '...', x: 59, y: 20, zoomImage: '/imgs/zoom-caissons/densite.png' },
              { id: 3, label: "Support d'étagère avec systeme anti-basculement", description: '...', x: 38, y: 43, zoomImage: '/imgs/zoom-caissons/etagere.png' },
              { id: 4, label: 'Finition Texturèe', description: '...', x: 65, y: 50, zoomImage: '/imgs/zoom-caissons/finition.png' },
            ]} />)
        }


        {/* Options Table */}
        {(Object.keys(options).length > 0 || String(product.content).length > 10) && (
          <div className="rounded-2xl border border-stone-200 shadow-sm bg-gradient-to-b from-white to-stone-50 p-4 mt-4 space-y-4">

            {(({ 11: ["/imgs/fiche-technique-caisson/stone.png", "Caisson de cuisine Blanc"], 1: ["/imgs/fiche-technique-caisson/blanc.png", "Caisson de cuisine Hydrofuge Ston"], 12: ["/imgs/fiche-technique-caisson/granada.png", "Caisson Hydrofuge Granada"] }[+product?.type?.category_id]) || []).length > 0 && <Image src={({ 11: ["/imgs/fiche-technique-caisson/stone.png", "Caisson de cuisine Blanc"], 1: ["/imgs/fiche-technique-caisson/blanc.png", "Caisson de cuisine Hydrofuge Ston"], 12: ["/imgs/fiche-technique-caisson/granada.png", "Caisson Hydrofuge Granada"] }[+product?.type?.category_id])[0]} alt={({ 11: ["/imgs/fiche-technique-caisson/stone.png", "Caisson de cuisine Blanc"], 1: ["/imgs/fiche-technique-caisson/blanc.png", "Caisson de cuisine Hydrofuge Ston"], 12: ["/imgs/fiche-technique-caisson/granada.png", "Caisson Hydrofuge Granada"] }[+product?.type?.category_id])[1]} className="w-full" width={1000} height={1000} />}

            {Object.keys(options).length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-stone-100">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(options).map(([key, value], i) => (
                      <tr
                        key={key}
                        className={`flex justify-between gap-4 px-4 py-2.5 ${i % 2 === 0 ? "bg-stone-50/60" : "bg-white"}`}
                      >
                        <th className="text-stone-500 font-medium text-left whitespace-nowrap">
                          {key.trim()}
                        </th>
                        <td className="text-stone-800 text-right">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}


            {product.content && (
              <div
                className="prose prose-sm prose-stone max-w-none text-stone-700"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            )}

          </div>
        )}


        {/* Share Product */}
        <ShareProduct
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
          }}
        />




        {/* Parquet Section */}
        {String(product?.type?.name).includes("Parquet") && (
          <>
            <ParqetCaracteristiques />

            <div className="bg-white border shadow-2xs p-4 rounded-2xl mt-10">
              <div className="block">
                <h2 className="mb-8 text-2xl font-semibold">Couches</h2>
                <img
                  src="/imgs/floorpan.png"
                  alt="Couches"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}