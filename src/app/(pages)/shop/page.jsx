import CLink from '@/components/CLink'
import ProductCard from '@/components/ProductCard'
import ProductFilter from '@/components/ProductFilter'
import React from 'react'

export default async function page() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`);
    if (!response.ok) {
        throw new Error('Failed to fetch category');
    }
    const {data: products} = await response.json();
  return (
    <div className="container mx-auto p-4">
      <section className='px-4 py-4 md:flex gap-3 bg-gray-100'>
        <ProductFilter />
        <div className="w-full md:w-9/12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                {/* <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">{productType.name}</span> */}
              </h1>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-x-7.5 gap-y-9 mt-5'>
            {
              products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}
