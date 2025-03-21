import React from 'react';

const BrandsSection = () => {
  // Brand data
  const brands = [
    {
      id: 1,
      name: "LACA",
      image: "https://intercocina.com/storage/public/01J9C2NKY8FNA5EDRJDDAJ45JJ.svg",
      description: ""
    },
    {
      id: 2,
      name: "AstiMP",
      image: "https://intercocina.com/storage/public/01J9C2SFZ72VZ287AQZ2D3J6JV.jpg",
      description: ""
    },
    {
      id: 3,
      name: "AsitPRO",
      image: "https://intercocina.com/storage/public/01J9C2W3WVVZ31FH0Z0NWTHF3M.jpg",
      description: ""
    },
    {
      id: 4,
      name: "InterMate",
      image: "https://intercocina.com/storage/public/01J9C2YN9BAMCFQ338E8KPZT82.svg",
      description: ""
    },
    {
      id: 5,
      name: "Lacado+",
      image: "https://intercocina.com/storage/public/01J9C30G1RVZW2ACN8ABQDF1P3.jpg",
      description: ""
    },
    {
      id: 6,
      name: "Polilaminado",
      image: "https://intercocina.com/storage/public/01J9C322SHD412R4MTBP5FDHH7.jpg",
      description: ""
    }
  ];

  return (
    <section className="py-16 overflow-hidden bg-gray-50">
      <div className="max-w-7xl md:mx-auto">
        <h2 className="py-5 text-2xl font-bold text-center md:text-4xl">
          Nos marques
        </h2>
        <p className="text-xl text-center my-5">
          Nos marques se distinguent par leur qualité, leur design innovant et un parfait équilibre entre style et fonctionnalité, offrant des solutions de cuisine élégantes et précises.
        </p>
        
        <ul className="grid gap-8 py-5 md:grid-cols-3 mx-3">
          {brands.map((brand) => (
            <li 
              key={brand.id}
              className="px-4 py-6 space-y-2 text-lg duration-300 bg-white border shadow-lg text-slate-500 rounded-2xl hover:cursor-pointer hover:scale-105 transform transition-transform"
            >
              <img
                className="object-cover w-full"
                src={brand.image}
                alt={brand.name}
                title={brand.name}
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-black md:text-xl">{brand.name}</h3>
              <p>{brand.description}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-center gap-10 px-4 py-24 md:flex-row">
          <a href="/contact" className="btn btn-primary">
            Travaillez avec nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;