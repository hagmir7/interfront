import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InterSpin from './ui/InterSpin';
import Subscribe from './Subscribe';

const Footer = () => {
  return (
    <footer className="px-4 pb-10 mt-24 overflow-hidden md:max-w-7xl md:mx-auto">
      <section>
        <div className="grid grid-cols-2">
          <div className="space-y-4 xl:col-span-1 col-span-full">
            <Image
              className="w-[200px]"
              width={200}
              height={200}

              loading="lazy"
              src="https://interapi.facepy.com/assets/imgs/intercocina-logo.png" 
              alt="Intercocina Logo"
              title="Intercocina Logo"
            />
            <p className="text-slate-700 font-semibold md:max-w-[400px]">
              Nous sommes profondément honorés de vous présenter notre société, qui se distingue en tant que
              leader incontesté dans le domaine de la fabrication sur mesure d’éléments de cuisine
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-10 my-10 md:flex-row md:justify-center md:py-24 md:my-0 xl:col-span-1 col-span-full">
            <div className="flex items-center gap-3 px-4 py-3 duration-500 md:shadow-lg bg-accent-red-500 rounded-3xl hover:scale-105 bg-red-500">
              <Image
                className="w-[35px]"
                loading="lazy"
                width={100}
                height={100}
                src="https://interapi.facepy.com/assets/icons/mail.png"
                alt="Envoyez-nous un email"
                title="Envoyez-nous un email"
              />
              <div>
                <p className="text-lg font-bold text-white ">Envoyez-nous un email</p>
                <p className="text-white">contact@interapi.facepy.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 duration-500 bg-white border md:border-0 md:shadow-lg rounded-3xl hover:scale-105">
              <Image
                className="w-[35px]"
                width={80}
                height={80}
                loading="lazy"
                src="https://interapi.facepy.com/assets/icons/phone.png"
                title="Appelez-nous"
                alt="Appelez-nous"
              />
              <div>
                <p className="text-lg font-bold ">Appelez-nous</p>
                <p>+212 661 54 79 00</p>
                <p>+212 536 35 88 88</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="h-px my-10 bg-gray-200 border-0" />
      <section className="flex flex-col gap-16 mb-8 lg:flex-row lg:justify-between">
        <div className="flex justify-around order-2 gap-10 xl:order-1">
          <div className="flex flex-col">
            <h3 className="py-6 text-lg text-accent-red font-semibold">Pages</h3>
            <div className="flex gap-10">
              <ul className="space-y-5">
                <li className="text-slate-700 font-semibold hover:text-accent-red">
                  <Link href="shop">Produits</Link>
                </li>
                <li className="text-slate-700 font-semibold hover:text-accent-red">
                  <Link href="/blogs">Blog</Link>
                </li>
                <li className="text-slate-700 font-semibold hover:text-accent-red">
                  <Link href="/event/list">Événements</Link>
                </li>
                <li className="text-slate-700 font-semibold hover:text-accent-red">
                  <Link href="#">Politique de confidentialité</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="py-6 text-lg text-accent-red font-semibold">Ressources</h3>
            <ul className="space-y-5">
              <li className="text-slate-700 font-semibold hover:text-accent-red">
                <Link href="h/aprops">À propos</Link>
              </li>
              <li className="text-slate-700 font-semibold hover:text-accent-red">
                <Link href="/contact">Contactez-nous</Link>
              </li>
              <li className="text-slate-700 font-semibold hover:text-accent-red">
                <Link href="/faqs">FAQs</Link>
              </li>
              <li className="text-slate-700 font-semibold hover:text-accent-red">
                <Link href="/reclamation">Réclamation</Link>
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
                  src="https://interapi.facepy.com/assets/media-icons/linkedin.png"  // Make sure this path is correct
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
                  src="https://interapi.facepy.com/assets/media-icons/facebook.png" // Make sure this path is correct
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
                  src="https://interapi.facepy.com/assets/media-icons/instagram.png" // Make sure this path is correct
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
