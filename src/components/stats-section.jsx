
import React from 'react';

const StatsSection = () => {
  return (
    <section className="py-3 md:py-16 overflow-hidden bg-accent-gray-50">
      <div className="grid gap-8 px-4 lg:grid-cols-2 md:gap-20 md:max-w-7xl md:mx-auto">
        <div className="space-y-6 md:py-24">
          <h2 className="mb-4 text-2xl font-bold md:text-4xl">
            Quelques Chiffres…
          </h2>
          <p className="text-slate-500 md:text-lg">
            Explorez notre parcours jalonné de succès et de chiffres impressionnants, témoignant de notre engagement
            inébranlable envers l'excellence en fabrication.
          </p>
          <div className="flex justify-center md:justify-start">
            <a href="https://intercocina.com/shop" className="btn btn-primary">
              Nos produits
            </a>
          </div>
        </div>
        <div className="grid">
          <div className="grid col-start-1 row-start-1 place-items-center">
            <div className="w-48 rounded-full aspect-square bg-red-500"></div>
          </div>
          <div className="grid col-start-1 row-start-1 gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="px-6 py-8 space-y-4 bg-white border shadow-none md:shadow-xl rounded-3xl">
                <h3 className="text-4xl font-semibold md:text-7xl">
                  <span className="text-gray-500">+</span>700
                  <span className="block mt-2 text-lg font-semibold md:text-xl">Client fidèle</span>
                </h3>
              </div>
              <div className="px-6 py-8 space-y-4 bg-white border shadow-none md:shadow-xl rounded-3xl">
                <h3 className="text-4xl font-semibold md:text-7xl">
                  <span className="text-gray-500">+</span>500
                  <span className="block mt-2 text-lg font-semibold md:text-xl">Commandes en préparation</span>
                </h3>
              </div>
            </div>
            <div className="space-y-6">
              <div className="hidden md:block min-h-8"></div>
              <div className="px-6 py-8 space-y-4 bg-white border shadow-none md:shadow-xl rounded-3xl">
                <h3 className="text-4xl font-semibold md:text-7xl">
                  <span className="text-gray-500">+</span>1M
                  <span className="block mt-2 text-lg font-semibold md:text-xl">Commandes livrées</span>
                </h3>
              </div>
              <div className="px-6 py-8 space-y-4 bg-white border shadow-none md:shadow-xl rounded-3xl">
                <h3 className="text-4xl font-semibold md:text-7xl">
                  <span className="text-gray-500">+</span>98
                  <span className="text-gray-500">%</span>
                  <span className="block mt-2 text-lg font-semibold md:text-xl">Clients satisfaits…</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;