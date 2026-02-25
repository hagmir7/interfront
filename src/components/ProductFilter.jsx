import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const SidebarSection = ({ title, items }) => (
  <>
    <div className="mb-2 text-lg font-semibold text-gray-900">{title}</div>
    <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 mb-6">
      {items.map((item, index) => (
        <li key={index}>
          <Link href={item.href} className="flex items-center">
            <CheckCircle className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </>
);

const ProductFilter = () => {
  const sections = [
    {
      title: 'Caisson de cuisine',
      items: [
        { href: '/category/caissons?type=caisson-bas', label: 'Caisson Bas' },
        { href: '/category/caissons?type=caisson-haut', label: 'Caisson Haut' },
        { href: '/category/caissons?type=caisson-colonne', label: 'Caisson Colonne' }
      ]
    },
    {
      title: 'Caisson Hydrofuge',
      items: [
        { href: '/category/caisson-hydrofuge?type=hydrofuge-bas', label: 'Caisson Hydrofuge Bas' },
        { href: '/category/caisson-hydrofuge?type=hydrofuge-haut', label: 'Caisson Hydrofuge Haut' },
        { href: '/category/caisson-hydrofuge?type=hydrofuge-colonne', label: 'Caisson Hydrofuge Colonne' }
      ]
    },
    {
      title: 'Façade',
      items: [
        { href: '/category/facade?type=astipro', label: 'AstiPRO' },
        { href: '/category/facade?type=astimp', label: 'AstiMP' },
        { href: '/category/facade?type=facade-laca', label: 'Façade Laca' },
        { href: '/category/facade?type=polilaminado', label: 'Polilaminado' },
        { href: '/category/facade?type=facade-leo-18-mm', label: 'LEO 18' },
        { href: '/category/facade?type=intermate-22', label: 'Intermate 22' },
        { href: '/category/facade?type=intermate', label: 'Intermate 18' },
        { href: '/category/facade?type=intermate-16', label: 'Intermate 16' },
        { href: '/category/facade?type=lacado', label: 'Lacado+' }
      ]
    },
    {
      title: 'Parquets',
      items: [
        { href: '/category/parquettes?type=parquettes-classe-31ac3', label: 'Parquets Classe 31/AC3' },
        { href: '/category/parquettes?type=parquettes-classe-32ac4', label: 'Parquets Classe 32/AC4' },
        { href: '/category/parquettes?type=parquettes-classe-33ac5', label: 'Parquets Classe 33/AC5' }
      ]
    },
    {
      title: 'Accessoires de cuisine',
      items: [
        { href: '/category/accessoiriser?type=poignees', label: 'Poignées' },
        { href: '/category/accessoiriser?type=racrocheurs', label: 'Caisson' },
        { href: '/category/accessoiriser?type=tiroir', label: 'Tiroir' },
        { href: '/category/accessoiriser?type=charneir', label: 'Charnières' },
        { href: '/category/accessoiriser?type=placard', label: 'Placard' },
        { href: '/category/accessoiriser?type=ecological', label: 'Ecological' },
        { href: '/category/accessoiriser?type=protection', label: 'Protection' },
        { href: '/category/accessoiriser?type=plan-de-travail', label: 'Plan de travail' },
        { href: '/category/accessoiriser?type=egoutoire', label: 'Egoutoire' }
      ]
    }
  ];

  return (
    <div className="w-1/4 hidden md:block ps-4">
      <div className="sticky top-10 h-[70vh] overflow-auto">
        {sections.map((section, index) => (
          <SidebarSection 
            key={index} 
            title={section.title} 
            items={section.items} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;