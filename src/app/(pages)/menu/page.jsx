import CLink from '@/components/CLink';
import { ArrowRight, User2Icon, Home, ShoppingBag, Calendar, InfoIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function MenuPage() {
  const menuItems = [
    { href: "/", label: "Accueil", icon: <Home size={18} /> },
    { href: "/produit", label: "Produits", icon: <ShoppingBag size={18} /> },
    { href: "/event/list", label: "Événements", icon: <Calendar size={18} /> },
    { href: "/about", label: "À propos", icon: <InfoIcon size={18} /> },
    { href: "/profile", label: "Commandes", icon: <ShoppingBag size={18} /> }
  ];

  return (
    <div className="mx-auto max-w-2xl py-6 bg-white rounded-lg shadow-sm">
      {/* User Profile Section */}
      <div className="px-4 pb-4 mb-2 border-b border-gray-200 dark:border-gray-700">
        <CLink href='/profile'>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="shrink-0">
            <User2Icon className="w-12 h-12 text-blue-500 dark:text-blue-400 rounded-full border-2 border-blue-200 p-2 bg-blue-50 dark:bg-blue-900/30" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              Hassan Agmir
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              hagmir6@gmail.com
            </p>
          </div>
          <div className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
        </CLink>
      </div>

      {/* Navigation Menu */}
      <nav className="px-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <CLink 
                href={item.href} 
                className="py-3 px-4 flex items-center justify-between w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className="text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </CLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default MenuPage;