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

        <div className="pointer-events-auto m-2.5 flex max-w-[calc(100vw-20px)] animate-[sib-slide-in_0.3s_cubic-bezier(0.16,1,0.3,1)] items-center gap-2 rounded-full border border-[#E2E2E2] bg-white p-[8px_10px_8px_12px] shadow-[0_8px_24px_rgba(0,0,0,0.14)] motion-reduce:animate-none sm:m-4 sm:gap-3.5 sm:p-[10px_12px_10px_18px]">
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <Image
              src="/icons/sib-icon.png"
              alt="sib small icon"
              width={50}
              height={50}
              style={{height: "auto"}}
              className="h-8 w-8 shrink-0 sm:h-[50px] sm:w-[50px]"
            />

            {!isOver ? (
              <span className="whitespace-nowrap font-['IBM_Plex_Mono',monospace] text-xs font-semibold tabular-nums tracking-[0.04em] text-[#222222] sm:text-sm">
                {isLive
                  ? "EN COURS"
                  : `${pad(time.days)}j ${pad(time.hours)}:${pad(
                      time.minutes,
                    )}:${pad(time.seconds)}`}
              </span>
            ) : (
              <span className="truncate font-['IBM_Plex_Sans',sans-serif] text-xs text-[#7A7A7A] sm:text-[13px]">
                Merci d&rsquo;avoir participé
              </span>
            )}
          </div>

          <span className="h-5 w-px shrink-0 bg-[#E2E2E2]" />

          <button
            onClick={handleReopen}
            className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full border-none bg-[#C1272D] px-2.5 py-1.5 font-['IBM_Plex_Sans',sans-serif] text-[11px] font-semibold tracking-[0.02em] text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#D9484D] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:gap-1.5 sm:px-3.5 sm:py-[7px] sm:text-[12.5px]"
          >
            <span className="hidden sm:inline">Voir plus</span>
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
    <div className="fixed inset-0 z-[9999] flex w-full animate-[sib-fade-in_0.25s_ease] items-center justify-center bg-[rgba(60,60,60,0.35)] p-[clamp(10px,4vw,32px)] font-['IBM_Plex_Sans',sans-serif] backdrop-blur-[3px] motion-reduce:animate-none">
      {fontImport}

      <div
        className="relative max-h-[92vh] w-full max-w-[920px] animate-[sib-pop-in_0.3s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden overflow-y-auto rounded-2xl border border-[#E2E2E2] bg-[#FAFAFA] p-[clamp(18px,4.5vw,52px)] text-[#222222] shadow-[0_24px_64px_rgba(0,0,0,0.16)] motion-reduce:animate-none sm:rounded-[26px]"
        style={{
          backgroundImage:
            "linear-gradient(#EFEFEF 1px, transparent 1px), linear-gradient(90deg, #EFEFEF 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "-1px -1px",
        }}
      >
        {/* Border frame */}
        <div className="pointer-events-none absolute inset-[6px] rounded-xl border border-[#E2E2E2] sm:inset-[10px] sm:rounded-[18px]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Fermer"
          className="absolute right-2.5 top-2.5 z-[2] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] bg-white text-[#222222] transition-[background,transform,border-color] duration-200 hover:rotate-90 hover:border-[#C1272D] hover:bg-[#C1272D] motion-reduce:transition-none sm:right-[18px] sm:top-[18px] sm:h-9 sm:w-9"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="relative mx-auto max-w-[780px]">
          {/* Header */}
          <div className="flex flex-col gap-5 pr-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pr-10">
            <div className="max-w-full sm:max-w-[560px]">
              <div className="mb-3 flex flex-wrap items-center gap-2 font-['IBM_Plex_Mono',monospace] text-[10px] font-black uppercase tracking-[0.2em] text-[#D9484D] sm:mb-3.5 sm:text-xs sm:tracking-[0.28em]">
                <Compass size={16} strokeWidth={1.75} className="shrink-0" />
                Salon International du Bâtiment
              </div>

              <h1 className="m-0 font-['Big_Shoulders_Display',sans-serif] text-[clamp(24px,7vw,44px)] font-bold leading-[1.05] tracking-[0.01em] text-[#222222]">
                INTERCOCINA VOUS INVITE
                <br />
                AU SIB 2026
              </h1>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link href="https://www.sib.ma/" className="shrink-0">
                <Image
                  src="/icons/sib-logo.png"
                  alt="Sib Logo"
                  width={150}
                  height={150}
                  className="w-[72px] sm:mt-3 sm:w-[110px] md:w-[150px] h-auto"
                  style={{ height: "auto" }}
                />
              </Link>

              <Image
                src="/icons/intercocina-logo.png"
                alt="Intercocina Sib Logo"
                width={150}
                height={150}
                className="h-auto w-[72px] shrink-0 sm:w-[110px] md:w-[150px]"
                style={{ height: "auto" }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-3.5 mt-6 font-['IBM_Plex_Mono',monospace] text-[10px] uppercase tracking-[0.16em] text-[#7A7A7A] sm:mb-[18px] sm:mt-[34px] sm:text-xs sm:tracking-[0.22em]">
            {isOver
              ? "// Merci d'avoir célébré ces 40 ans avec nous"
              : isLive
                ? "// Le salon est ouvert — bienvenue"
                : "// Compte à rebours avant ouverture"}
          </div>

          {/* Countdown plates */}
          {!isOver && (
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              {UNITS.map((u) => {
                const value = isLive ? 0 : time[u.key];

                return (
                  <div
                    key={u.key}
                    className="relative min-w-0 flex-[1_1_130px] rounded-xl border border-[#E2E2E2] bg-white p-[14px_12px_12px] transition-[transform,border-color] duration-[250ms] hover:-translate-y-[3px] hover:border-[#C1272D] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-w-[128px] sm:rounded-2xl sm:p-[18px_16px_16px]"
                  >
                    <div className="mb-1.5 font-['IBM_Plex_Mono',monospace] text-[9px] tracking-[0.14em] text-[#7A7A7A] sm:mb-2.5 sm:text-[10px] sm:tracking-[0.18em]">
                      PLANCHE {u.sheet}
                    </div>

                    <div className="font-['Big_Shoulders_Display',sans-serif] text-[clamp(28px,8vw,48px)] font-extrabold leading-none tabular-nums text-[#222222]">
                      {pad(value)}
                    </div>

                    <div className="mt-1.5 font-['IBM_Plex_Mono',monospace] text-[10px] tracking-[0.14em] text-[#D9484D] sm:mt-2 sm:text-[11px] sm:tracking-[0.2em]">
                      {u.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dimension line */}
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center gap-2">
              <span className="hidden h-px w-2 bg-[#7A7A7A] sm:block" />

              <div className="relative h-px flex-1 border-t border-dashed border-[#E2E2E2]">
                <span className="absolute left-1/2 top-[-9px] -translate-x-1/2 whitespace-nowrap bg-[#FAFAFA] px-1.5 font-['IBM_Plex_Mono',monospace] text-[11px] tracking-[0.06em] text-[#7A7A7A] sm:top-[-11px] sm:px-2.5 sm:text-[15px] sm:tracking-[0.14em]">
                  25 → 29 NOVEMBRE 2026
                </span>
              </div>

              <span className="hidden h-px w-2 bg-[#7A7A7A] sm:block" />
            </div>
          </div>

          {/* Location */}
          <div className="mt-5 flex items-start gap-2 text-[#222222] sm:mt-[22px] sm:items-center sm:gap-2.5">
            <MapPin
              size={18}
              strokeWidth={1.75}
              color="#C1272D"
              className="mt-0.5 shrink-0 sm:mt-0"
            />
            <span className="text-sm leading-snug tracking-[0.01em] sm:text-md">
              STAND A2, Parc d&rsquo;Exposition Mohammed VI — El Jadida, Maroc
            </span>
          </div>

          {/* Close CTA */}
          <div className="mt-6 flex justify-stretch sm:mt-[30px] sm:justify-end">
            <Link
              href="/event/intercocina-vous-invite-au-sib-2026"
              onClick={handleClose}
              className="w-full cursor-pointer rounded-full border-none bg-[#C1272D] px-[22px] py-2.5 text-center font-['IBM_Plex_Sans',sans-serif] text-[13.5px] font-semibold tracking-[0.02em] text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#D9484D] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto"
            >
              Voir plus
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}