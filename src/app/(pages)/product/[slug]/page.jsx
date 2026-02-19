
import ParqetCaracteristiques from "@/components/ParqetCaracteristiques";
import ProductCard from "@/components/ProductCard";
import ProductClient from "@/components/ProductClient";
import ShareProduct from "@/components/ShareProduct";
import { QRCode } from "antd";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = params;

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://interapi.facepy.com";

  const res = await fetch(`${baseURL}/api/products/${slug}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 404) return notFound();
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const data = await res.json();
  const product = data.data ?? data;

  const options = product?.options ?? {};

  return (
    <section className="py-2 md:py-6 mt-5 md:mt-6">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <ProductClient product={product} />

        {/* Related Products */}
        {product?.related?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9 mt-5">
            {product.related.map((related, index) => (
              <ProductCard key={related.id ?? index} {...related} />
            ))}
          </div>
        )}

        {/* Options Table */}
        <div className="rounded-2xl border shadow-2xs bg-white p-3 mt-3">
          {Object.keys(options).length > 0 && (
          <div className="relative overflow-x-auto border rounded-lg mt-6">
            <table className="w-full text-sm text-left">
              <tbody>
                {Object.entries(options).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <th className="px-6 py-3 text-gray-800 font-medium w-1/3">
                      {key.trim()}
                    </th>
                    <td className="px-6 py-3 text-gray-600">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {
          product.content && <div
            className="my-3 md:my-6 w-full prose"
            dangerouslySetInnerHTML={{ __html: product.content }}
          />
        }
        </div>
        
        <ShareProduct product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
        }} />


        {
          String(product?.type?.name).includes('Parquet') && <ParqetCaracteristiques />
        }

        {
          String(product?.type?.name).includes('Parquet') && (<div className="bg-white border shadow-2xs p-4 rounded-2xl mt-10">
            <div className="block">
              <h2 className="mb-8 text-2xl font-semibold">Couches</h2>
              <img
                src="https://www.kastamonuentegre.com/uploads/2022/12/fr-floorpan.png"
                alt="Couches"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>)
        }
        
        
      </div>
    </section>
  );
}
