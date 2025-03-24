import Product from "@/components/Product";


const ProductPage = async ({params}) => {

  const { slug } = params;

  const response = await fetch(`https://interapi.facepy.com/api/products/${slug}`);
  if(!response.ok){
    throw new Error('Failed to fetch articles')
  }

  const product = await response.json();
  return (
    <section className="py-6 mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="product">
          <Product product={product.data} />
        </div>
        <div className="mt-6">
         
            <div className="p-4 rounded-xl border bg-white">
              <h2 className="sm:text-2xl text-xl font-bold">
                Détails du produit
              </h2>
   
                <div className="relative overflow-x-auto border-t-2 border-x-2 sm:rounded-lg mt-4">
                  <table className="w-full text-sm text-left rtl:text-right">
                    <tbody>
                     
                        <tr className="border-b-2 font-semibold hover:bg-gray-50 duration-500">
                          <th className="px-6 py-4 text-gray-900 whitespace-nowrap"></th>
                          <td className="px-6 py-4"></td>
                        </tr>
          
                    </tbody>
                  </table>
                </div>
       
              {/* <div className="mt-4 prose" dangerouslySetInnerHTML={{ __html: product.content }} /> */}
            </div>



          {/* <div>
            <ShareButtons product={product} />
          </div> */}
{/* 
          {product?.type?.category?.name === "Parquets" && (
            <>
              <FlooprFeatures />
              <div className="bg-white border-2 p-4 rounded-2xl mt-10">
                <h2 className="mb-8 text-2xl font-semibold">Couches</h2>
                <img src="https://www.kastamonuentegre.com/uploads/2022/12/fr-floorpan.png" alt="Couches" />
              </div>
            </>
          )} */}

          <h2 className="mb-2 mt-3 text-2xl font-black underline underline-offset-3 decoration-7 decoration-red-400">
            Nos recommandations
          </h2>
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {/* {products.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))} */}
          </div>

          <div className="bg-white border-2 p-4 rounded-2xl mt-10">
            {/* <RatingForm product={product} /> */}
          </div>

          {/* {product.reviews?.filter((review) => review.status === 1).length > 0 && <ReviewsList product={product} />} */}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
