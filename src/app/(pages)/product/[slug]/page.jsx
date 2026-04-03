import ParqetCaracteristiques from "@/components/ParqetCaracteristiques";
import ProductCard from "@/components/ProductCard";
import ProductClient from "@/components/ProductClient";
import ShareProduct from "@/components/ShareProduct";
import { api } from "@/lib/api";
import { truncate } from "@/lib/utils";
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
      alternates: {
        canonical: `/product/${slug}`,
      },
      openGraph: {
        title: `${product.name}`,
        description: `${truncate(product.description)}`,
        images: 'https://app.intercocina.com/storage/'+ product.images?.[0]?.image ? [{ url: product.images[0].image }] : [],
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
    image: 'https://app.intercocina.com/storage/'+ product.images?.[0]?.image ?? "",
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
        {/* {String(product.content).length} */}
        {(Object.keys(options).length > 0 || String(product.content).length > 10) && (
      <div className="rounded-2xl border border-stone-200 shadow-sm bg-gradient-to-b from-white to-stone-50 p-4 mt-4 space-y-4">
        
        {Object.keys(options).length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-stone-100">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(options).map(([key, value], i) => (
                  <tr
                    key={key}
                    className={`flex justify-between gap-4 px-4 py-2.5 ${
                      i % 2 === 0 ? "bg-stone-50/60" : "bg-white"
                    }`}
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