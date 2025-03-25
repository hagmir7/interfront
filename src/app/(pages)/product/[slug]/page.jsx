import Carousel from "@/components/Carousel";
import Product from "@/components/Product";

const ProductPage = async ({ params }) => {

  const {slug} = await params;


  try {
    const response = await fetch(`https://interapi.facepy.com/api/products/${slug}`);

    if (!response.ok) {
      return <div>Erreur : Produit introuvable.</div>;
    }

    const { data: product } = await response.json();

    return (
      <section className="py-6 mt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 py-6 rounded-xl border">
            <div className="w-full px-4" style={{ margin: '0 auto' }}>
              <Carousel images={product.images} />
            </div>
            <div className="flex justify-center">
              <div className="pro-detail w-full md:max-lg:max-w-[608px] lg:pl-8 xl:pl-12 max-lg:mx-auto max-lg:mt-6 px-3">
                <div className="sm:flex flex-initial items-center justify-between gap-6 mb-4">
                  <div className="text-left">
                    <h1 className="font-manrope font-bold sm:text-3xl text-2xl leading-10 text-gray-900 mb-2">
                      {product.name}
                    </h1>
                    <h2 className="font-normal text-base text-gray-500 text-left">
                      {product.type}
                    </h2>
                  </div>

                  {product?.id && (
                    <a href={`/admin/products/${product.id}/edit`} className="group transition-all duration-500 p-0.5 sm:block hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                          <path className="stroke-green-600 transition-all duration-500 group-hover:stroke-green-700" d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z"></path>
                          <path className="stroke-green-600 transition-all duration-500 group-hover:stroke-green-700" d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"></path>
                        </g>
                      </svg>
                    </a>
                  )}
                </div>

                <p className="mb-3 text-left">{product?.description || "Aucune description disponible."}</p>

                <Product product={product} />
              </div>
            </div>
          </div>

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
                          <tr key={key} className="border-b-2 font-semibold hover:bg-gray-50 duration-500">
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
