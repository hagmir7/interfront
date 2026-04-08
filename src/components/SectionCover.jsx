'use client'
import React, { useEffect, useRef, useState } from "react";
import CLink from "./CLink";
import { Mail, ShoppingCart } from "lucide-react";
import Image from "next/image";

const images = [
  '/imgs/fabrica/fabrica-4.png',
  '/imgs/fabrica/fabrica-9.jpg',
    '/imgs/fabrica/fabrica-3.jpeg',
  '/imgs/fabrica/fabrica-6.jpg', 
  

  '/imgs/fabrica.jpeg',
];

const SLIDE_INTERVAL = 5000; 

const SectionConver = () => {
  const heroRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-animate]');
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add('anim-in'), 50 + i * 80);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        [data-animate].anim-in {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
        @keyframes gridDrift {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }
        .slide-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          animation: slowZoom 20s ease-in-out infinite alternate;
        }
        .slide-layer.active {
          opacity: 1;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gray-950 text-white"
      >
        {/* Slideshow layers — one per image, crossfade via opacity */}
        {images.map((src, i) => (
          <div
            key={src}
            className={`slide-layer${i === current ? ' active' : ''}`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

        {/* Red vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(180,0,0,0.18) 100%)',
          }}
        />

        {/* Grid lines */}
        {/* <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'gridDrift 30s linear infinite',
          }}
        /> */}

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? '#ec2228' : 'rgba(255,255,255,0.4)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* B2B badge */}
        <div
          data-animate
          className="absolute right-8 top-8 z-20 hidden md:block opacity-80 hover:opacity-100 transition-opacity"
        >
          <Image src="/icons/B2B.svg" width={90} height={90} alt="B2B" />
        </div>

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-start text-left gap-8">

          <div data-animate>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
              Leader marocain • Fabrication sur mesure
            </span>
          </div>

          <h1 data-animate className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.08] max-w-4xl">
            <span className="text-[#c8c8ca] tracking-widest" style={{ fontFamily: 'DOCK11-Heavy, sans-serif' }}>INTER</span>
            <span className="text-[#ec2228] tracking-widest" style={{ fontFamily: 'DOCK11-Heavy, sans-serif' }}>COCINA</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 tracking-normal leading-snug">
              Leader de la fabrication de meubles 
              <br className="hidden sm:block" /> de cuisine au Maroc.
            </span>
          </h1>

          <div data-animate className="flex items-center gap-4 w-full max-w-xs" aria-hidden="true">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
          </div>

          <p data-animate className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed font-light">
            De la cuisine aux placards, des salles de bain au parquet, nous concevons des solutions d&apos;aménagement haut de gamme, entièrement sur mesure.
          </p>

          <div data-animate className="flex flex-col sm:flex-row items-start gap-4 pt-2">
            <CLink
              href="/shop"
              className="group relative overflow-hidden bg-red-600 hover:bg-red-500 rounded-xl px-8 py-4 flex items-center gap-3 font-semibold text-white shadow-[0_4px_32px_rgba(236,34,40,0.4)] transition-all duration-300 hover:shadow-[0_4px_48px_rgba(236,34,40,0.6)] hover:-translate-y-0.5"
            >
              <ShoppingCart size={19} className="transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              <span className="tracking-wide">Voir les produits</span>
            </CLink>

            <CLink
              href="/contact"
              className="group bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md rounded-xl px-8 py-4 flex items-center gap-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail size={19} className="transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              <span className="tracking-wide">Nous contacter</span>
            </CLink>
          </div>
        </div>

        {/* Bottom wave */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none"
          style={{
            backgroundImage: "url('/imgs/bg-inter1.png')",
            backgroundSize: '100px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top',
            opacity: '22%',
            bottom: '-40px',
            maskRepeat: 'no-repeat',
            maskSize: 'cover',
          }}
        />
      </section>
    </>
  );
};

export default SectionConver;