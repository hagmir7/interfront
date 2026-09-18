"use client";

import { MapPin, Compass, X, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

// =====================================================
// EVENT CONFIGURATION
// =====================================================

const EVENT_START = new Date("2026-11-25T09:00:00");
const EVENT_END = new Date("2026-11-29T18:00:00");

const STORAGE_KEY = "sib-countdown-closed";

// =====================================================
// COUNTDOWN UNITS
// =====================================================

const UNITS = [
  { key: "days", label: "JOURS", sheet: "01" },
  { key: "hours", label: "HEURES", sheet: "02" },
  { key: "minutes", label: "MINUTES", sheet: "03" },
  { key: "seconds", label: "SECONDES", sheet: "04" },
];

// =====================================================
// COUNTDOWN HELPERS
// =====================================================

function getTimeLeft() {
  const now = new Date();
  const diff = EVENT_START.getTime() - now.getTime();

  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { done: false, days, hours, minutes, seconds };
}

// =====================================================
// LOCAL STORAGE HELPERS
// =====================================================

function readClosedState() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeClosedState(value) {
  try {
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable — ignore
  }
}

// =====================================================
// INITIAL COUNTDOWN STATE
// =====================================================

const INITIAL_TIME = {
  done: false,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function SIBCountdown() {
  const [time, setTime] = useState(INITIAL_TIME);
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const stampId = useId();

  // ===================================================
  // MOUNT + RESTORE CLOSED STATE
  // ===================================================

  useEffect(() => {
    setIsMounted(true);
    setIsOpen(!readClosedState());
    setTime(getTimeLeft());
  }, []);

  // ===================================================
  // COUNTDOWN TIMER
  // ===================================================

  useEffect(() => {
    if (!isMounted) return;

    const id = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(id);
  }, [isMounted]);

  // ===================================================
  // EVENT STATUS
  // ===================================================

  const now = isMounted ? new Date() : null;
  const isLive = isMounted && now >= EVENT_START && now <= EVENT_END;
  const isOver = isMounted && now > EVENT_END;

  // ===================================================
  // HELPERS
  // ===================================================

  const pad = (n) => String(n).padStart(2, "0");

  const handleClose = () => {
    setIsOpen(false);
    writeClosedState(true);
  };

  const handleReopen = () => {
    setIsOpen(true);
    writeClosedState(false);
  };

  // ===================================================
  // FONT IMPORT + ANIMATIONS
  // ===================================================

  const fontImport = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

      @keyframes sib-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      @keyframes sib-pop-in {
        from { opacity: 0; transform: scale(0.94) translateY(12px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }

      @keyframes sib-slide-in {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );

  // ===================================================
  // DON'T RENDER ON THE SERVER / BEFORE MOUNT
  // ===================================================

  if (!isMounted) {
    return null;
  }

  // ===================================================
  // COMPACT PILL
  // ===================================================

  if (!isOpen) {
    return createPortal(
      <div className="pointer-events-none fixed bottom-0 left-0 z-[9998] flex w-full items-end justify-start bg-transparent font-['IBM_Plex_Sans',sans-serif]">
        {fontImport}

        <div className="pointer-events-auto m-4 flex animate-[sib-slide-in_0.3s_cubic-bezier(0.16,1,0.3,1)] items-center gap-3.5 rounded-full border border-[#E2E2E2] bg-white p-[10px_12px_10px_18px] shadow-[0_8px_24px_rgba(0,0,0,0.14)] motion-reduce:animate-none">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isOver
                  ? "bg-[#7A7A7A] shadow-none"
                  : "bg-[#C1272D] shadow-[0_0_0_4px_rgba(193,39,45,0.18)]"
              }`}
            />

            {!isOver ? (
              <span className="font-['IBM_Plex_Mono',monospace] text-sm font-semibold tabular-nums tracking-[0.04em] text-[#222222]">
                {isLive
                  ? "EN COURS"
                  : `${pad(time.days)}j ${pad(time.hours)}:${pad(
                      time.minutes,
                    )}:${pad(time.seconds)}`}
              </span>
            ) : (
              <span className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#7A7A7A]">
                Merci d&rsquo;avoir participé
              </span>
            )}
          </div>

          <span className="h-5 w-px bg-[#E2E2E2]" />

          <button
            onClick={handleReopen}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border-none bg-[#C1272D] px-3.5 py-[7px] font-['IBM_Plex_Sans',sans-serif] text-[12.5px] font-semibold tracking-[0.02em] text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#D9484D] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Voir plus
            <ChevronUp size={14} strokeWidth={2} />
          </button>
        </div>
      </div>,
      document.body,
    );
  }

  // ===================================================
  // FULL MODAL
  // ===================================================

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex w-full animate-[sib-fade-in_0.25s_ease] items-center justify-center bg-[rgba(60,60,60,0.35)] p-[clamp(12px,4vw,32px)] font-['IBM_Plex_Sans',sans-serif] backdrop-blur-[3px] motion-reduce:animate-none">
      {fontImport}

      <div
        className="relative max-h-[92vh] w-full max-w-[920px] animate-[sib-pop-in_0.3s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden overflow-y-auto rounded-[26px] border border-[#E2E2E2] bg-[#FAFAFA] p-[clamp(24px,4.5vw,52px)] text-[#222222] shadow-[0_24px_64px_rgba(0,0,0,0.16)] motion-reduce:animate-none"
        style={{
          backgroundImage:
            "linear-gradient(#EFEFEF 1px, transparent 1px), linear-gradient(90deg, #EFEFEF 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "-1px -1px",
        }}
      >
        {/* Border frame */}
        <div className="pointer-events-none absolute inset-[10px] rounded-[18px] border border-[#E2E2E2]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Fermer"
          className="absolute right-[18px] top-[18px] z-[2] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] bg-white text-[#222222] transition-[background,transform,border-color] duration-200 hover:rotate-90 hover:border-[#C1272D] hover:bg-[#C1272D] motion-reduce:transition-none"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="relative mx-auto max-w-[780px]">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-6 pr-10">
            <div className="max-w-[560px]">
              <div className="mb-3.5 flex text-md items-center font-black gap-2.5 font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-[0.28em] text-[#D9484D]">
                <Compass size={16} strokeWidth={1.75} />
                Salon International du Bâtiment
              </div>

              <h1 className="m-0 font-['Big_Shoulders_Display',sans-serif] text-[clamp(26px,4.6vw,44px)] font-bold leading-[1.02] tracking-[0.01em] text-[#222222]">
                Célébrer le parcours,
                <br />
                construire l&rsquo;avenir.
              </h1>
            </div>

            <Image className="shrink-0 rotate-[-20deg] mt-3" src="/icons/sib-logo.png" width={150} height={150}/>

            <Image className="shrink-0 rotate-[-10deg]" src="/icons/intercocina-logo.png" width={150} height={150}/>
          </div>

          {/* Status */}
          <div className="mb-[18px] mt-[34px] font-['IBM_Plex_Mono',monospace] text-xs uppercase tracking-[0.22em] text-[#7A7A7A]">
            {isOver
              ? "// Merci d'avoir célébré ces 40 ans avec nous"
              : isLive
                ? "// Le salon est ouvert — bienvenue"
                : "// Compte à rebours avant ouverture"}
          </div>

          {/* Countdown plates */}
          {!isOver && (
            <div className="flex flex-wrap gap-3">
              {UNITS.map((u) => {
                const value = isLive ? 0 : time[u.key];

                return (
                  <div
                    key={u.key}
                    className="relative min-w-[128px] flex-[1_1_130px] rounded-2xl border border-[#E2E2E2] bg-white p-[18px_16px_16px] transition-[transform,border-color] duration-[250ms] hover:-translate-y-[3px] hover:border-[#C1272D] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="mb-2.5 font-['IBM_Plex_Mono',monospace] text-[10px] tracking-[0.18em] text-[#7A7A7A]">
                      PLANCHE {u.sheet}
                    </div>

                    <div className="font-['Big_Shoulders_Display',sans-serif] text-[clamp(32px,5.6vw,48px)] font-extrabold leading-none tabular-nums text-[#222222]">
                      {pad(value)}
                    </div>

                    <div className="mt-2 font-['IBM_Plex_Mono',monospace] text-[11px] tracking-[0.2em] text-[#D9484D]">
                      {u.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dimension line */}
          <div className="mt-10">
            <div className="flex items-center gap-2">
              <span className="h-px w-2 bg-[#7A7A7A]" />

              <div className="relative h-px flex-1 border-t border-dashed border-[#E2E2E2]">
                <span className="absolute left-1/2 top-[-11px] -translate-x-1/2 whitespace-nowrap bg-[#FAFAFA] px-2.5 font-['IBM_Plex_Mono',monospace] text-[15px] tracking-[0.14em] text-[#7A7A7A]">
                  25 → 29 NOVEMBRE 2026
                </span>
              </div>

              <span className="h-px w-2 bg-[#7A7A7A]" />
            </div>
          </div>

          {/* Location */}
          <div className="mt-[22px] flex items-center gap-2.5 text-[#222222]">
            <MapPin size={20} strokeWidth={1.75} color="#C1272D" />
            <span className="text-md tracking-[0.01em]">
              Parc d&rsquo;Exposition Mohammed VI — El Jadida, Maroc
            </span>
          </div>

          {/* Close CTA */}
          <div className="mt-[30px] flex justify-end">
            <Link href="/event/list" onClick={handleClose} className="cursor-pointer rounded-full border-none bg-[#C1272D] px-[22px] py-2.5 font-['IBM_Plex_Sans',sans-serif] text-[13.5px] font-semibold tracking-[0.02em] text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#D9484D] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              Voir plus
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}