import Image from 'next/image'
import React, { useState } from 'react'

const colors = [
  {
    id: 4,
    name: 'Yellow ground',
    image:
      'https://intercocina.com/storage/public/01J9B8A0T1EEYPH3ZB2EBYBZ7W.png',
  },
  {
    id: 5,
    name: 'Off white',
    image:
      'https://intercocina.com/storage/public/01J9B7V141GPRBMX5NC171ZTFX.png',
  },
  {
    id: 6,
    name: 'Sitting plaster',
    image:
      'https://intercocina.com/storage/public/01J9B82YH9D9GF43612R07Z5YM.png',
  },
  {
    id: 7,
    name: 'Gris basalto',
    image:
      'https://intercocina.com/storage/public/01J9XX9DX8TBDSX74J1SV4214S.jpg',
  },
  {
    id: 8,
    name: 'Vison oscuro',
    image:
      'https://intercocina.com/storage/public/01J9B88DCXBCG09AWRH7QAQ5KH.png',
  },
  {
    id: 9,
    name: 'Piedra claro',
    image:
      'https://intercocina.com/storage/public/01J9B7ZTM1B1832ZPWJTECN767.png',
  },
  {
    id: 10,
    name: "Teresa's green",
    image:
      'https://intercocina.com/storage/public/01J9B86BXTRKKE5AH5MD3X6PC2.png',
  },
  {
    id: 11,
    name: 'Oval room',
    image:
      'https://intercocina.com/storage/public/01J9B7X0E5C632MDPM9CP8ATRD.png',
  },
  {
    id: 12,
    name: 'All white',
    image:
      'https://intercocina.com/storage/public/01J9B7RVFN7B3RT4Q8M32Q4KEG.png',
  },
  {
    id: 13,
    name: 'Jaspermat noche',
    image:
      'https://intercocina.com/storage/public/01JDRV5PR80C18CFSJR4E460ZQ.png',
  },
  {
    id: 14,
    name: 'Lunar sand',
    image:
      'https://intercocina.com/storage/public/01JDRV7QJ3NSV7ZFZA48V08JFM.png',
  },
  {
    id: 15,
    name: 'Metalizado bronze',
    image:
      'https://intercocina.com/storage/public/01JDRVCMDS6WW8MK9GBP87VBQD.png',
  },
  {
    id: 30,
    name: 'Celadone',
    image:
      'https://intercocina.com/storage/public/01JKGCKFW33571MYSAY0KN0BX2.png',
  },
  {
    id: 31,
    name: 'Red Eart',
    image:
      'https://intercocina.com/storage/public/01JKGCRX21AVE1YR106EKP7J9G.png',
  },
  {
    id: 32,
    name: 'Grigio Londra',
    image:
      'https://intercocina.com/storage/public/01JKGCP15KEAC2JPAW4FBMN3SP.png',
  },
  {
    id: 33,
    name: 'Rosso Jaipur',
    image:
      'https://intercocina.com/storage/public/01JKGCQ4SJYFPX2RXCZZXQG98Z.jpg',
  },
  {
    id: 34,
    name: 'Verde Comodoro',
    image:
      'https://intercocina.com/storage/public/01JKGCJAP4HCWREZWA7YN470ZG.png',
  },
]

const LacaColors = () => {

  return (
    <div className='text-left'>
      <p className='font-bold text-gray-900 mb-3 text-sm md:text-base'>Couleurs disponibles</p>
      <ul className='flex flex-wrap gap-1 md:gap-2 mb-4'>
        {colors.map((color) => (
          <li
            key={color.id}
            className='color-box group text-center me-1 md:me-3 relative'
          >
            <div
              className='inline-flex items-center justify-between w-full p-4 text-gray-500 border-gray-500 rounded-lg cursor-pointer border md:border-2 hover:text-gray-600 hover:bg-gray-100 '
              style={{ backgroundImage: `url(${color.image})` }}
            ></div>
            <div
              className='-top-56 hidden absolute overflow-hidden bg-neutral-950 ease-out left-1/2 p-0 border-black border-2 group-hover:block rounded text-center text-sm text-white transition-all w-40 whitespace-nowrap z-10'
              role='tooltip'
            >
              {color.name}
              <Image width={100} height={100} className='w-full' alt={color.name} src={color.image} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LacaColors
