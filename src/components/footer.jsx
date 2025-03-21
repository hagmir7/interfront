import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="px-4 pb-10 mt-24 overflow-hidden md:max-w-7xl md:mx-auto">
      <section>
        <div className="grid grid-cols-2">
          <div className="space-y-4 xl:col-span-1 col-span-full">
            <img
              className="w-[200px]"
              width="200px"
              height="200px"
              loading="lazy"
              src="https://intercocina.com/assets/imgs/intercocina-logo.png" // Make sure this path is correct
              alt="Intercocina Logo"
              title="Intercocina Logo"
            />
            <p className="text-slate-700 font-semibold md:max-w-[400px]">
              Nous sommes profondément honorés de vous présenter notre société, qui se distingue en tant que
              leader incontesté dans le domaine de la fabrication sur mesure d’éléments de cuisine
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-10 my-10 md:flex-row md:justify-center md:py-24 md:my-0 xl:col-span-1 col-span-full">
            <div className="flex items-center gap-3 px-6 py-3 duration-500 shadow-lg bg-accent-red-500 rounded-3xl hover:scale-105 bg-red-500">
              <img
                className="w-[40px]"
                loading="lazy"
                width="40px"
                height="40px"
                src="https://intercocina.com/assets/icons/mail.png" // Make sure this path is correct
                alt="Envoyez-nous un email"
                title="Envoyez-nous un email"
              />
              <div>
                <p className="text-lg font-bold text-white ">Envoyez-nous un email</p>
                <p className="text-white">contact@intercocina.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 duration-500 bg-white shadow-lg rounded-3xl hover:scale-105">
              <img
                className="w-[40px]"
                width="40px"
                height="40px"
                loading="lazy"
                src="https://intercocina.com/assets/icons/phone.png" // Make sure this path is correct
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
        <div className="w-full max-w-lg bg-accent-red px-8 py-16 xl:ml-36 rounded-3xl relative overflow-hidden order-1 xl:order-2 md:flex md:justify-center bg-red-500">
          <div className="w-40 aspect-square rounded-full bg-gray-50 opacity-45 absolute z-0 -bottom-10 -left-10 animate__animated animate__zoomIn"></div>
          <div className="aspect-square rounded-full bg-gray-50 opacity-45 w-36 md:w-80 absolute z-0 -top-16 -right-16 md:-top-28 md:-right-28 animate__animated animate__zoomIn"></div>
          <div className="w-full relative z-20 space-y-6">
            <div className="space-y-2">
              <h3 className="text-white text-4xl font-bold uppercase tracking-wide"> Newsletter </h3>
              <p className="text-white text-lg">
                Restez informés ! Abonnez-vous à notre newsletter.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <label htmlFor="newsletter_email" className="sr-only">
                  Newsletter_email
                </label>
                <input
                  type="text"
                  id="newsletter_email"
                  name="newsletter_email"
                  placeholder="Email"
                  className="w-full border-gray-200 p-4 text-sm rounded-xl bg-white"
                />
              </div>
              <button className="flex items-center justify-center gap-2 text-accent-red bg-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-red hover:bg-transparent border hover:border-white hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path className="animate-rotate" d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
                  <path className="animate-rotate-reverse" d="M17 12a5 5 0 1 0 -5 5"></path>
                </svg>
                S'abonner
              </button>
              <div>
                <p className="text-white text-sm">
                  Nous respectons votre vie privée. Vous pouvez vous désinscrire à tout moment.
                </p>
              </div>
            </div>
          </div>
        </div>
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
                <img
                  src="https://intercocina.com/assets/media-icons/linkedin.png"  // Make sure this path is correct
                  width="30px"
                  height="30px"
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
                <img
                  src="https://intercocina.com/assets/media-icons/facebook.png" // Make sure this path is correct
                  width="30px"
                  height="30px"
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
                <img
                  src="https://intercocina.com/assets/media-icons/instagram.png" // Make sure this path is correct
                  width="30px"
                  height="30px"
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
