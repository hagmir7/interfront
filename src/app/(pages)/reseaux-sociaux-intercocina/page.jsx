// app/page.jsx  (Next.js 13+ App Router + Tailwind CSS)
// Link-in-bio Intercocina : réseaux sociaux uniquement.
// Chaque réseau est un « tiroir » de cuisine avec sa poignée.

import { Bricolage_Grotesque, DM_Sans, Inter } from "next/font/google";
import Image from "next/image";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "800"], display: "swap" });
const brand = Inter({ subsets: ["latin"], weight: ["800"], display: "swap" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata = {
  title: "Intercocina — Suivez-nous",
  description: "Retrouvez Intercocina sur WhatsApp, Instagram, TikTok, Facebook et LinkedIn.",
  openGraph: { title: "Intercocina", url: "https://intercocina.com", type: "website", locale: "fr_FR" },
};

/* ───────────── COULEURS ─────────────
   Couleurs du logo intercocina.com : gris #b6b6b7 (INTER) et rouge #ec2228 (COCINA).
   Un seul endroit à modifier. */
const THEME = {
//   "--bg": "#f4f4f5",         // fond de page
  "--surface": "#ffffff",    // façade du tiroir
  "--gap": "#d6d6d8",        // ombre sous le tiroir ouvert
  "--accent": "#ec2228",     // rouge Intercocina : poignées, icônes, focus
  "--accent-ink": "#ffffff", // texte sur fond rouge
  "--ink": "#1c1c1d",        // texte principal
  "--muted": "#6b6b6e",      // gris foncé : texte secondaire lisible sur fond clair
};

/* ───────────── CONTENU ───────────── */
const BRAND = {
  tagline: "Leader de la fabrication de meubles de cuisine au Maroc.",
  location: "Nador, Maroc",
};

// Liens réels relevés sur intercocina.com
const SOCIALS = [
  {
    name: "WhatsApp",
    handle: "+212 661 54 79 00",
    cta: "Écrire",
    href: "https://wa.me/212661547900",
    primary: true,
    path: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.93 9.9ZM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.45Z",
  },
  {
    name: "Instagram",
    handle: "@intercocinasarl",
    cta: "Suivre",
    href: "https://www.instagram.com/intercocinasarl",
    path: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z",
  },
  {
    name: "Facebook",
    handle: "IntercocinaSARL",
    cta: "Aimer la page",
    href: "https://www.facebook.com/IntercocinaSARL",
    path: "M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-1 .4-1.7 1.8-1.7H17V3.8C16.6 3.7 15.6 3.6 14.5 3.6c-2.6 0-4.3 1.6-4.3 4.4v2.5H7.5v3.3h2.7V22h3.3Z",
  },
  {
    name: "LinkedIn",
    handle: "inter-cocina",
    cta: "Se connecter",
    href: "https://www.linkedin.com/company/inter-cocina",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z",
  },
];

export default function Page() {
  return (
    <main
      style={THEME}
      className={`${body.className} flex min-h-screen flex-col items-center bg-[var(--bg)] px-5 pb-8 pt-14 text-[var(--ink)]`}
    >
      <header className="mb-10 w-full max-w-[420px] text-center">
        <h1 className={`${brand.className} text-[34px] font-extrabold leading-none tracking-[0.06em] md:text-[40px]`}>
        <div className="flex justify-center">
            <Image
            className="w-[130px] sm:w-[160px] text-center"
            width={500}
            height={500}
            loading="lazy"
            src="https://app.intercocina.com/assets/imgs/intercocina-logo.png"
            alt="Intercocina Logo"
            title="Intercocina Logo"
        />
        </div>
        </h1>
        <span aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-12 rounded-sm bg-[var(--accent)]" />
        <p className="mx-auto mt-4 max-w-[300px] text-[15px] leading-relaxed">{BRAND.tagline}</p>
        <p className="mt-1.5 text-sm text-[var(--muted)]">{BRAND.location}</p>
      </header>

      <nav aria-label="Réseaux sociaux" className="flex w-full max-w-[420px] flex-col gap-4">
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} — ${s.handle}`}
            className={[
              "group relative flex items-center gap-4 rounded-md px-5 pb-5 pt-7 no-underline",
              "transition-[transform,box-shadow] duration-200",
              "hover:-translate-y-[3px] hover:shadow-[0_7px_0_var(--gap)]",
              "focus-visible:-translate-y-[3px] focus-visible:shadow-[0_7px_0_var(--gap)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--accent)]",
              "active:translate-y-0 active:shadow-none",
              "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0",
              s.primary
                ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                : "border border-[#e4e4e6] bg-[var(--surface)] text-[var(--ink)]",
            ].join(" ")}
          >
            {/* poignée du tiroir */}
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-3 -ml-6 h-1 w-12 rounded-sm ${
                s.primary ? "bg-[var(--accent-ink)]" : "bg-[var(--accent)]"
              }`}
            />
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
                s.primary ? "bg-[var(--accent-ink)] text-[var(--accent)]" : "bg-[var(--bg)] text-[var(--accent)]"
              }`}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className={`${display.className} block text-[19px] font-semibold leading-tight`}>{s.name}</span>
              <span
                className={`mt-0.5 block truncate text-sm ${
                  s.primary ? "text-[var(--accent-ink)] opacity-90" : "text-[var(--muted)]"
                }`}
              >
                {s.handle}
              </span>
            </span>
            <span className={`${display.className} shrink-0 text-sm font-semibold`}>{s.cta}</span>
          </a>
        ))}
      </nav>
    </main>
  );
}