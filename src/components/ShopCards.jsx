'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ShopFilter from '@/components/ShopFilter';
import { api } from '@/lib/api';
import InterSpin from './ui/InterSpin';
import ProductCardSkeleton from './ui/ProductCardSkeleton';

export default function ShopCards() {
  const [filters, setFilters] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (reset = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const queryFilters = filters.length ? `&filters=${filters.join(',')}` : '';
      const queryPage = `?page=${reset ? 1 : page}`;
      const response = await api.get(`products${queryPage}${queryFilters}`);

      const data = response.data;
      const list = data?.data ?? [];

      setProducts((prev) => (reset ? list : [...prev, ...list]));
      setPage((data?.current_page || 1) + 1);
      setLastPage(data?.last_page || 1);
    } catch (err) {
      console.error('Impossible de récupérer les produits :', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(true);
  }, [filters]);

  return (
    <section className="px-2 py-4 md:flex gap-3">
      {/* Filtres sur le côté */}
      <ShopFilter onFilterChange={setFilters} />

      {/* Grille de produits */}
      <div className="w-full md:w-9/12">
        <div className="mx-auto md:px-4">
          <div className="text-center mb-6 hidden">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Produits Intercocina</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-7.5 gap-y-9">
            {products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} {...product} />)
            ) : (
              <>
                <ProductCardSkeleton /><ProductCardSkeleton /><ProductCardSkeleton /><ProductCardSkeleton /></>
            )}
          </div>

          {/* Bouton Charger Plus */}
          {page <= lastPage && products.length > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={() => fetchProducts()}
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
              >
                {loading ? <div className='flex gap-2'><InterSpin /> <span> Chargement...</span></div> : 'Charger plus'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
