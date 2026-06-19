import ParqetCaracteristiques from "@/components/ParqetCaracteristiques";
import ProductCard from "@/components/ProductCard";
import ProductClient from "@/components/ProductClient";
import ProductPiece from "@/components/ProductPiece";
import ReviewForm from "@/components/ReviewForm";
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

    const description = product?.description
      ? truncate(product.description)
      : `Découvrez ${product?.name} chez INTERCOCINA : meubles sur-mesure et rangement de qualité.`;

    const tagList = Array.isArray(product?.tags)
      ? product.tags
      : product?.tags
        ? [product.tags]
        : [];
    const keywords = [...tagList, "armoires", "meubles sur-mesure", "rangement"]
      .filter(Boolean)
      .join(", ");

    return {
      title: `${product?.name}`,
      description,
      alternates: {
        canonical: `/product/${slug}`,
      },
      keywords,
      openGraph: {
        title: `${product?.name}`,
        description,
        images: product?.images?.[0]?.image
          ? [{ url: 'https://app.intercocina.com/storage/' + product.images[0].image }]
          : [],
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


  let reviews;
  try {
    const response = await api.get(`products/reviews/${slug}`);
    reviews = response.data || [];
  } catch {
    reviews = [];
  }

  const avgRating = reviews?.length
  ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
  : 0;

  const options = product?.options ?? {};

  function buildProductOffer(product) {
    const url = `https://intercocina.com/product/${product.slug}`;



    const isRange = (val) => typeof val === "string" && val.includes(" - ");
    const rawPrice = product.price || product.price_format;

    if (!rawPrice) return undefined;

    if (isRange(rawPrice)) {
      const [low, high] = rawPrice.split(" - ").map((s) => s.trim());
      return {
        "@type": "AggregateOffer",
        url,
        priceCurrency: "MAD",
        lowPrice: low,
        highPrice: high || low,
        availability: "https://schema.org/InStock",
      };
    }

    return {
      "@type": "Offer",
      url,
      priceCurrency: "MAD",
      price: String(rawPrice),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    };
  }

  const offer = buildProductOffer(product);

  const imageUrl = product.images?.[0]?.image
    ? "https://app.intercocina.com/storage/" + product.images[0].image
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.description && { description: product.description }),
    ...(imageUrl && { image: imageUrl }),
    brand: {
      "@type": "Brand",
      name: "INTERCOCINA",
    },
    ...(offer && { offers: offer }),
    manufacturer: {
      "@type": "Organization",
      name: "INTERCOCINA",
    },
    ...(reviews?.length && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(
          (
            reviews.reduce((sum, r) => sum + r.stars, 0) /
            reviews.length
          ).toFixed(1)
        ),
        reviewCount: String(reviews.length),
      },
      review: reviews.slice(0, 5).map((r) => ({
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: String(r.stars) },
        author: { "@type": "Person", name: r.full_name },
        reviewBody: r.comment,
      })),
    }),
  };


  return (
    <section className="py-2 md:py-6 mt-5 md:mt-6">

      <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductClient product={product} code={product.code || code} />


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
              { id: 1, label: 'Perçages', description: '...', x: 28, y: 20, zoomImage: '/imgs/zoom-caissons/trous.png' },
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


        <div className="mt-10 flex flex-col lg:flex-row gap-6 items-start">

          {/* Rating Summary */}
          {reviews?.length > 0 && (
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24 rounded-2xl border border-stone-200 shadow-sm bg-white p-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Avis clients</h3>

              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-stone-900">{avgRating.toFixed(1)}</span>
                <span className="text-stone-500 mb-1">/ 5</span>
              </div>

              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(avgRating) ? "text-amber-400" : "text-stone-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.175 0l-3.367 2.447c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.957z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-stone-500 mb-5">{reviews.length} avis</p>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.stars === star).length;
                  const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-stone-500">{star}</span>
                      <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.175 0l-3.367 2.447c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.957z" />
                      </svg>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-stone-500">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Review Form */}
          <div className="w-full lg:flex-1">
            <ReviewForm product={product} />
          </div>

        </div>
      </div>


    </section>
  );
}