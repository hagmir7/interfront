import Image from 'next/image';
import React from 'react';
import CLink from './CLink';

const BrandsSection = () => {
  const brands = [
    {
      id: 1,
      name: "LACA",
      image: "https://app.intercocina.com/storage/01J9C2NKY8FNA5EDRJDDAJ45JJ.svg",
      description: "",
      href: "/category/facade?type=facade-laca"
    },
    {
      id: 2,
      name: "AstiMP",
      image: "https://app.intercocina.com/storage/01J9C2SFZ72VZ287AQZ2D3J6JV.jpg",
      description: "",
      href: "/category/facade?type=astimp"
    },
    {
      id: 3,
      name: "AsitPRO",
      image: "https://app.intercocina.com/storage/01J9C2W3WVVZ31FH0Z0NWTHF3M.jpg",
      description: "",
      href: "/category/facade?type=astipro"
    },
    {
      id: 4,
      name: "InterMate",
      image: "https://app.intercocina.com/storage/01J9C2YN9BAMCFQ338E8KPZT82.svg",
      description: "",
      href: "/category/facade?type=intermate"
    },
    {
      id: 5,
      name: "Lacado+",
      image: "https://app.intercocina.com/storage/01J9C30G1RVZW2ACN8ABQDF1P3.jpg",
      description: "",
      href: "/category/facade?type=lacado"
    },
    {
      id: 6,
      name: "Polilaminado",
      image: "https://app.intercocina.com/storage/01J9C322SHD412R4MTBP5FDHH7.jpg",
      description: "",
      href: "/category/facade?type=polilaminado"
    }
  ];

  return (
    <section className='py-3 md:py-16 overflow-hidden'>
      <div className='max-w-7xl md:mx-auto'>
        <h2 className='py-5 text-2xl font-bold text-center md:text-4xl'>
          Nos Gammes de Façades
        </h2>
        <p className='text-xl text-center my-3 md:my-5 mx-3'>
          Nos Gammes se distinguent par leur qualité, leur design innovant et
          un parfait équilibre entre style et fonctionnalité, offrant des
          solutions de cuisine élégantes et précises.
        </p>

        <ul className='grid gap-8 py-5 md:grid-cols-3 mx-2 md:mx-3'>
          {brands.map((brand) => (
            <li key={brand.id}>
              <CLink
                href={brand.href}
                className='block px-4 py-6 space-y-2 text-lg duration-300 bg-white border shadow-none md:shadow-lg text-slate-500 rounded-2xl hover:cursor-pointer hover:scale-105 transform transition-transform'
              >
                <Image
                  className='object-cover w-full'
                  src={brand.image}
                  alt={brand.name}
                  title={brand.name}
                  loading='lazy'
                  width={400}
                  height={400}
                />
                <h3 className='text-lg font-semibold text-black md:text-xl'>
                  {brand.name}
                </h3>
                <p>{brand.description}</p>
              </CLink>
            </li>
          ))}
        </ul>

        <div className='flex flex-col justify-center gap-10 px-4 py-18 md:flex-row'>
          <CLink href='/contact' className='btn btn-primary text-center'>
            Travaillez avec nous
          </CLink>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;