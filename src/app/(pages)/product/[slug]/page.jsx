import ProductClient from "@/components/ProductClient";

const ProductPage = async ({ params }) => {
  const { slug } = await params;
  
  try {
    const response = await fetch(`https://interapi.facepy.com/api/products/${slug}`);

    if (!response.ok) {
      return <div>Erreur : Produit introuvable.</div>;
    }

    const { data: product } = await response.json();

    return (
      <section className="py-6 mt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductClient product={product} />

          <div className="mt-6">
            {(product?.options?.length > 0 || product?.content) && (
              <div className="p-4 rounded-xl border bg-white">
                <h2 className="text-lg md:text-xl font-bold">
                  Détails du produit {product?.name}
                </h2>

                {product?.options && Object.keys(product.options).length > 0 && (
                  <div className="relative overflow-x-auto border-t-1 border-x-1 sm:rounded-lg mt-4">
                    <table className="w-full text-sm text-left rtl:text-right">
                      <tbody>
                        {Object.entries(product.options).map(([key, value]) => (
                          <tr key={key} className="border-b-1 font-semibold hover:bg-gray-50 duration-500">
                            <th className="px-6 py-4 text-gray-900 whitespace-nowrap">{key}</th>
                            <td className="px-6 py-4">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {product?.content && (
                  <div className="mt-4 prose" dangerouslySetInnerHTML={{ __html: product.content }} />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return <div>Erreur lors du chargement du produit.</div>;
  }
};

export default ProductPage;