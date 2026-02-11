import React from "react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/212716096558"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp!"
      className="whatsapp-float fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50
        flex items-center justify-center
        w-12 h-12 sm:w-14 sm:h-14
        rounded-full bg-gradient-to-br from-green-400 to-green-600
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:scale-110 active:scale-95
        group"
    >
      {/* Pulse Ring Animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-0 group-hover:animate-ping"></span>

      {/* Ripple Effect */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 animate-pulse-slow opacity-75"></span>

      {/* WhatsApp Icon */}
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
      </svg>

      {/* Tooltip */}
      <span
        className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        whitespace-nowrap pointer-events-none"
      >
       Contactez-nous
      </span>
    </a>
  );
};

export default WhatsAppFloat;
