import ParqetCaracteristiques from "@/components/ParqetCaracteristiques";
import ProductCard from "@/components/ProductCard";
import ProductClient from "@/components/ProductClient";
import ShareProduct from "@/components/ShareProduct";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const response = await api.get(`products/${slug}`);
    const product = response.data?.data ?? response.data;

    return {
      title: `${product.name} - Nos Produits`,
      description: `Découvrez notre sélection de ${product.name}. Qualité supérieure et design sur-mesure.`,
      keywords: `${product.tags}, armoires, meubles sur-mesure, rangement`,
      alternates: {
        canonical: `/product/${slug}`,
      },
      openGraph: {
        title: `${product.name} - Nos Produits`,
        description: `Découvrez notre sélection de ${product.name}. Qualité supérieure et design sur-mesure.`,
        images: 'https://interapi.facepy.com/storage/'+ product.images?.[0]?.image ? [{ url: product.images[0].image }] : [],
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
    image: 'https://interapi.facepy.com/storage/'+ product.images?.[0]?.image ?? "",
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

        {/* Related Products */}
        {product?.related?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9 mt-5">
            {product.related.map((related, index) => (
              <ProductCard key={related.id ?? index} {...related} />
            ))}
          </div>
        )}

        {/* Options Table */}
        {(Object.keys(options).length > 0 || product.content) && (
          <div className="rounded-2xl border shadow-2xs bg-white p-3 mt-3">
            {Object.keys(options).length > 0 && (
              <div className="relative overflow-x-auto border rounded-lg mt-3 md:mt-6">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {Object.entries(options).map(([key, value]) => (
                      <tr
                        key={key}
                        className="border-b last:border-0 hover:bg-gray-50 transition"
                      >
                        <th className="px-2 md:px-6 py-1 md:py-3 text-gray-800 font-medium w-1/3">
                          {key.trim()}
                        </th>
                        <td className="px-2 md:px-6 py-1 md:py-3 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {product.content && (
              <div
                className="my-3 md:my-6 w-full prose"
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
                  src="https://www.kastamonuentegre.com/uploads/2022/12/fr-floorpan.png"
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