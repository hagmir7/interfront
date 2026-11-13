"use client";

import { useEffect, useState } from "react";

const OLD_NUMBER = "+212 661 54 79 00";
const NEW_NUMBER = "+212 661 36 45 74";
const NEW_NUMBER_LINK = "https://wa.me/212661364574";

// Hidden starting 21/11/2026 at 00:00 (month index: 10 = November)
const HIDE_FROM = new Date(2026, 10, 21, 0, 0, 0);

const STORAGE_KEY = "whatsapp-number-alert-dismissed";

export default function WhatsAppNumberAlert() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide automatically after the deadline
    if (new Date() >= HIDE_FROM) return;

    // Respect manual dismissal (for this session only)
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="relative w-full bg-amber-500 px-10 py-2.5 text-center text-sm font-medium text-white"
    >
      <span>
        ⚠️ Notre numéro WhatsApp a changé. L&apos;ancien numéro{" "}
        <span className="line-through opacity-80">{OLD_NUMBER}</span> ne
        fonctionne plus. Nouveau numéro :{" "}
        <a
          href={NEW_NUMBER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          {NEW_NUMBER}
        </a>
      </span>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Fermer"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 text-xl leading-none hover:bg-white/20"
      >
        ×
      </button>
    </div>
  );
}