import ProductCard from "@/components/ProductCard";
import ProductClient from "@/components/ProductClient";
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

  return (
    <section className="py-2 md:py-6 mt-2 md:mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        {product?.options?.length > 0 && (
          <div className="relative overflow-x-auto border-t border-x sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left rtl:text-right">
              <tbody>
                {product.options.map((option, i) => (
                  <tr
                    key={i}
                    className="border-b font-semibold hover:bg-gray-50 duration-500"
                  >
                    <th className="px-6 py-2 text-gray-900 whitespace-nowrap">
                      {option.key || option.name}
                    </th>
                    <td className="px-6 py-3">{option.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
