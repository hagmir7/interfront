'use client'
import React, { useEffect, useRef } from "react";
import CLink from "./CLink";
import { Mail, ShoppingCart } from "lucide-react";
import Image from "next/image";

const SectionConver = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Staggered entrance animation via class toggle
    const items = el.querySelectorAll('[data-animate]');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(32px)';
      item.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 80);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-gray-950 text-white"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/imgs/fabrica.jpeg')",
          animation: 'slowZoom 20s ease-in-out infinite alternate',
        }}
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Subtle red vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(180,0,0,0.18) 100%)',
        }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridDrift 30s linear infinite',
        }}
      />

      {/* B2B badge */}
      <div
        data-animate
        className="absolute right-8 top-8 z-20 hidden md:block opacity-80 hover:opacity-100 transition-opacity"
      >
        <Image src="/icons/B2B.svg" width={90} height={90} alt="B2B" />
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">

        {/* Eyebrow tag */}
        <div data-animate>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Leader marocain • Fabrication sur mesure
          </span>
        </div>

        {/* Main heading */}
        <h1 data-animate className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.08] max-w-4xl">
          <span
            className="text-[#c8c8ca] tracking-widest"
            style={{ fontFamily: 'DOCK11-Heavy, sans-serif' }}
          >
            INTER
          </span>
          <span
            className="text-[#ec2228] tracking-widest"
            style={{ fontFamily: 'DOCK11-Heavy, sans-serif' }}
          >
            COCINA
          </span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 tracking-normal leading-snug">
            Meubles de cuisine &amp; d'aménagement
            <br className="hidden sm:block" /> fabriqués au Maroc
          </span>
        </h1>

        {/* Divider line */}
        <div data-animate className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        </div>

        {/* Subtitle */}
        <p data-animate className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed font-light">
          De la cuisine aux placards, des salles de bain au parquet — nous concevons des solutions d&apos;aménagement haut de gamme, entièrement sur mesure.
        </p>

        {/* CTAs */}
        <div data-animate className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <CLink
            href="/shop"
            className="group relative overflow-hidden bg-red-600 hover:bg-red-500 rounded-xl px-8 py-4 flex items-center gap-3 font-semibold text-white shadow-[0_4px_32px_rgba(236,34,40,0.4)] transition-all duration-300 hover:shadow-[0_4px_48px_rgba(236,34,40,0.6)] hover:-translate-y-0.5"
          >
            <ShoppingCart size={19} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="tracking-wide">Voir les produits</span>
          </CLink>

          <CLink
            href="/contact"
            className="group bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md rounded-xl px-8 py-4 flex items-center gap-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail size={19} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="tracking-wide">Nous contacter</span>
          </CLink>
        </div>

        {/* Stats row */}
        {/* <div data-animate className="flex flex-wrap justify-center gap-8 md:gap-14 pt-8 border-t border-white/10 w-full max-w-2xl">
          {[
            { value: '+20', label: 'Ans d\'expérience' },
            { value: '+5000', label: 'Projets réalisés' },
            { value: '100%', label: 'Fabrication locale' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-red-400">{value}</span>
              <span className="text-xs text-white/50 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div> */}
      </div>

      {/* Bottom wave */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none"
        style={{
          backgroundImage: "url('/imgs/bg-inter1.png')",
          backgroundSize: '100px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top',
          // transform: 'scaleY(-1)',
          opacity: '22%',
          bottom: '-40px',
          maskRepeat: 'no-repeat',
          maskSize: 'cover',
        }}
      />

      {/* CSS keyframes */}
      <style jsx>{`
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
        @keyframes gridDrift {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }
      `}</style>
    </section>
  );
};

export default SectionConver;