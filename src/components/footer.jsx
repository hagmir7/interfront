import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InterSpin from './ui/InterSpin';
import Subscribe from './Subscribe';

const Footer = () => {
  return (
    <footer className="px-4 pb-10 overflow-hidden md:max-w-7xl md:mx-auto">
     
      <hr className="h-px my-10 bg-gray-200 border-0" />
      <section className="flex flex-col gap-16 mb-8 lg:flex-row lg:justify-between">
        <div className="flex justify-around order-2  md:gap-10 xl:order-1">

          <div className="flex flex-col">
            <h3 className="py-6 text-lg text-accent-red font-semibold">Pages</h3>
            <div className="flex gap-10">
              <ul className="space-y-5">
                <li className="text-slate-700 text-sm md:text-base font-semibold hover:text-accent-red">
                  <Link href="shop">Produits</Link>
                </li>
                <li className="text-slate-700 text-sm md:text-base font-semibold hover:text-accent-red">
                  <Link href="/blogs">Blog</Link>
                </li>
                <li className="text-slate-700 text-sm md:text-base font-semibold hover:text-accent-red">
                  <Link href="/event/list">Événements</Link>
                </li>
                <li className="text-slate-700 text-sm md:text-base font-semibold hover:text-accent-red">
                  <Link href="/tracking">Suivre de commande</Link>
                </li>
                <li className="text-slate-700 text-sm md:text-base font-semibold hover:text-accent-red">
                  <Link href="#">Politique de confidentialité</Link>
                </li>
              </ul>
            </div>
          </div>


          <div className="flex flex-col">
            <h3 className="py-6 text-lg text-accent-red font-semibold">Ressources</h3>
            <ul className="space-y-5">
              <li className="text-slate-700 font-semibold text-sm md:text-base hover:text-accent-red">
                <Link href="/aprops">À propos</Link>
              </li>
              <li className="text-slate-700 font-semibold text-sm md:text-base hover:text-accent-red">
                <Link href="/contact">Contactez-nous</Link>
              </li>
              <li className="text-slate-700 font-semibold text-sm md:text-base hover:text-accent-red">
                <Link href="/faqs">FAQs</Link>
              </li>
              <li className="text-slate-700 font-semibold text-sm md:text-base hover:text-accent-red">
                <Link href="/reclamation">Réclamation</Link>
              </li>
               <li className="text-slate-700 font-semibold text-sm md:text-base hover:text-accent-red">
                <Link href="/carriere">Carrière chez Intercocina</Link>
              </li>
            </ul>
          </div>


        </div>
        <Subscribe />
      </section>
      <hr className="h-px bg-gray-200 border-0" />
      <div className="flex flex-col items-center gap-8 pt-8 md:justify-between lg:flex-row">
        <p className="text-center text-slate-700 md:text-left font-semibold">
          Copyright © INTERCOCINA 2025. All rights reserved. Made with ❤️ in Nador.
        </p>
        <div>
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="https://www.linkedin.com/company/inter-cocina"
                target="__blank"
                aria-label="Linkedin page link"
              >
                <Image
                  src="https://app.intercocina.com/assets/media-icons/linkedin.png"  // Make sure this path is correct
                  width={30}
                  height={30}
                  loading="lazy"
                  title="Linkedin page link"
                  alt="Linkedin page link"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/IntercocinaSARL"
                target="__blank"
                aria-label="facebook page link"
              >
                <Image
                  src="https://app.intercocina.com/assets/media-icons/facebook.png" // Make sure this path is correct
                  width={30}
                  height={30}
                  loading="lazy"
                  title="Facebook page link"
                  alt="Facebook page link"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/intercocinasarl"
                target="__blank"
                aria-label="Instagram page link"
              >
                <Image
                  src="https://app.intercocina.com/assets/media-icons/instagram.png" // Make sure this path is correct
                  width={30}
                  height={30}
                  loading="lazy"
                  title="Instagram page link"
                  alt="Instagram page link"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
