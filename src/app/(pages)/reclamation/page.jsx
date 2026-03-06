import React from 'react'
import ReclamationForm from "@/components/ReclamationForm";


export const metadata = {
  title: 'Réclamation - Intercocina',
  description: 'Déposez votre réclamation auprès d’Intercocina concernant nos meubles sur mesure. Notre équipe vous accompagne pour résoudre tout problème rapidement.',
  keywords: 'réclamation Intercocina, service client, problème meuble, assistance client, support Intercocina, gestion réclamation, meuble sur mesure',
  alternates: {
    canonical: '/reclamation'
  }
};





export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0a0a] via-[#0d1a2e] to-[#0a0a1a] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-red-900/20 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-blue-900/10 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* ── LEFT: Info (server-rendered) ── */}
        <aside className="md:sticky md:top-20 flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start bg-red-900/20 border border-red-700/35 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Intercocina — Support
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white">
            Procédure de{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              réclamation
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/60 text-base leading-relaxed max-w-md">
            Chez Intercocina, nous nous efforçons de fournir la meilleure expérience
            possible. Si un problème survient, notre équipe est là pour vous aider rapidement.
          </p>

          {/* Checklist */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/35 mb-2">
              Préparez les informations suivantes
            </p>
            {[
              "Votre nom complet et vos coordonnées",
              "Le numéro de commande ou de facture",
              "Une description détaillée du problème",
              "Votre numéro de téléphone",
              "Tout document ou photo pertinent",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-sm text-white/65 leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-10 h-0.5 bg-gradient-to-r from-red-700 to-transparent rounded-full" />

          {/* Contact hint */}
          <p className="text-xs text-white/35 leading-relaxed">
            Délai de réponse habituel :{" "}
            <strong className="text-white/60 font-semibold">24 à 48 heures ouvrées.</strong>
            <br />
            Pour toute urgence, contactez-nous directement par téléphone.
          </p>
        </aside>

        {/* ── RIGHT: Client form card ── */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
          <ReclamationForm />
        </div>
      </div>
    </main>
  );
}