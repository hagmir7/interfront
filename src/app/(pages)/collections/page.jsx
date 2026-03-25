"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CLink from "@/components/CLink";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8000/storage";


/** Collection banner image */
function collectionImg(filename) {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `${IMAGE_BASE}/${filename}`;
}

/** Days until end_date */
function daysLeft(end_date) {
  if (!end_date) return null;
  const diff = new Date(end_date) - Date.now();
  if (diff <= 0) return null;
  return Math.ceil(diff / 86_400_000);
}

/* ─────────────────────────────────────────────
   SKELETON LOADER
───────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Top accent */}
      <div className="h-[2px] bg-gray-200" />

      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex gap-3 flex-1">
            {/* Image */}
            <div className="hidden sm:block w-14 h-14 bg-gray-200 rounded-xl" />

            <div className="flex-1">
              {/* Pills */}
              <div className="flex gap-2 mb-2">
                <div className="h-4 w-16 bg-gray-200 rounded-full" />
                <div className="h-4 w-20 bg-gray-100 rounded-full" />
              </div>

              {/* Title */}
              <div className="h-5 w-2/3 bg-gray-200 rounded mb-1" />

              {/* Description */}
              <div className="h-3 w-full bg-gray-100 rounded mb-1" />
              <div className="h-3 w-4/5 bg-gray-100 rounded" />
            </div>
          </div>

          {/* Button */}
          <div className="h-8 w-24 bg-gray-200 rounded-lg" />
        </div>

        {/* Products grid (smaller + tighter) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
              <div className="aspect-[3/4] bg-gray-100" />
              <div className="p-2 space-y-1">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-2.5 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">✨</div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Aucune promotion en cours
      </h3>
      <p className="text-sm text-gray-500">
        Revenez bientôt pour découvrir nos prochaines offres.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ERROR STATE
───────────────────────────────────────────── */
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-sm text-gray-500 mb-4">
        Impossible de charger les données. Vérifiez votre connexion.
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-[#e4373a] text-white text-sm font-bold rounded-xl
                   hover:bg-[#c42f31] active:scale-95 transition-all"
      >
        Réessayer
      </button>
    </div>
  );
}



function CollectionCard({ collection}) {
  const days  = daysLeft(collection.end_date);
  const thumb = collectionImg(collection.image);

  return (
    <section
      aria-label={collection.title}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Red top accent bar */}
      <div className="h-[3px] w-full bg-[#e4373a]" />

      <div className="p-4 sm:p-6">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0 flex gap-5">
            {/* Optional thumbnail */}
            {thumb && (
              <div className="hidden sm:block w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                <img
                  src={thumb}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                />
              </div>
            )}

            <div className="min-w-0">
              {/* Status pills */}
              <div className="flex flex-wrap items-center gap-2 mb-3">

                <span className="inline-flex items-center gap-1.5 bg-[#e4373a] text-white
                                   text-[10px] font-extrabold tracking-[0.18em] uppercase
                                   px-3 py-1 rounded-full select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                    Promotion
                  </span>


                {days && (
                  <span className="text-[10px] font-bold text-[#e4373a] bg-red-50
                                   border border-[#e4373a]/20 px-2.5 py-1 rounded-full">
                    ⏱ {days} jour{days > 1 ? "s" : ""} restant{days > 1 ? "s" : ""}
                  </span>
                )}
                <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200
                                 px-2.5 py-1 rounded-full">
                  + {collection.products?.length ?? 0} produit{(collection.products?.length ?? 0) > 1 ? "s" : ""}
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                itemProp="name"
              >
                {collection.title}
              </h2>
              {collection.description && (
                <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {collection.description}
                </p>
              )}
            </div>
          </div>

          <CLink
            href={`/collections/${collection.slug}`}
            className="shrink-0 self-start flex items-center gap-1.5 text-[#e4373a] text-sm font-bold
                       border border-[#e4373a]/30 hover:border-[#e4373a] hover:gap-3
                       px-4 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap group/btn"
            aria-label={`Voir tous les produits de ${collection.title}`}
          >
            Voir la collection
            <svg
              className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </CLink>
        </div>

        {/* ── Products grid ── */}
        {collection.products && collection.products.length > 0 ? (

            <div className="p-2 rounded-2xl bg-gray-100">
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-x-7.5 lg:gap-y-9 md:p-0'>
                    {collection.products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </div>

        ) : (
            <p className="text-sm text-gray-400 text-center py-8">
                Aucun produit dans cette collection.
            </p>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGINATION
   Driven by the real API links[] array
───────────────────────────────────────────── */
function Pagination({ data, onPage }) {
  if (!data || data.last_page <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex justify-center gap-2 mt-8">
      {data.links.map((link, i) => (
        <button
          key={i}
          disabled={!link.url || link.active}
          onClick={() => link.page && onPage(link.page)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
            link.active
              ? "bg-[#e4373a] text-white shadow"
              : link.url
                ? "bg-white border border-gray-200 text-gray-700 hover:border-[#e4373a] hover:text-[#e4373a]"
                : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  );
}

function CollectionSection() {


  const [data,    setData]    = useState(null);
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
        const response = await api.get(`collections?page=${page}`);
        setData(response.data)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        setError(true)
        
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <><Skeleton /><Skeleton /></>;
  if (error)   return <ErrorState onRetry={fetchData} />;
  if (!data?.data?.length) return <EmptyState />;

  return (
    <div className="space-y-6">
      {data.data.map((col) => (
        <CollectionCard key={col.id} collection={col} />
      ))}
      <Pagination data={data} onPage={setPage} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────── */
export default function PromotionPage() {
  return (
    <>


      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Promotions & Nouveaux Produits",
            description:
              "Découvrez nos meilleures promotions et nouveaux produits — offres limitées, collections exclusives.",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil",    item: "/" },
                { "@type": "ListItem", position: 2, name: "Promotions", item: "/promotions" },
              ],
            },
          }),
        }}
      />

      <main className="min-h-screen bg-[#f4f4f4]">

        {/* ── HERO ─────────────────────────────────── */}
        <header className="relative bg-gray-100 text-white overflow-hidden">
          {/* Red glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(228,55,58,0.15) 0%, transparent 70%)",
            }}
          />
          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(black 1px,transparent 1px),linear-gradient(90deg,black 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
            {/* Headline */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10 bg-[#e4373a]" />
                  <span className="text-[#e4373a] text-[10px] font-extrabold tracking-[0.3em] uppercase">
                    Offres sélectionnées
                  </span>
                </div>
                <h1
                  className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-[#e4373a]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Promotions
                  <br />
                  <span className="text-gray-500">&amp;</span> Nouveautés
                </h1>
              </div>
              <p className="max-w-xs text-gray-700 text-sm leading-relaxed lg:text-right">
                Collections exclusives, remises exceptionnelles et toutes nos
                dernières arrivées — mis à jour chaque semaine.
              </p>
            </div>
          </div>
        </header>

        {/* ── CONTENT ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-[#e4373a] rounded-full flex-shrink-0" />
            <div>
              <h2
                className="text-xl font-black text-gray-950"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Nos Promotions en Cours
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Offres à durée limitée — profitez-en avant qu'elles expirent
              </p>
            </div>
          </div>

          {/* Tab panels */}
          <div
            role="tabpanel"
            id="panel-promo"
            aria-labelledby="tab-promo"
   
          >
            <CollectionSection type="promo" />
          </div>
        </div>
      </main>
    </>
  );
}