"use client";

import { useState } from "react";
import CLink from "../CLink";


const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // await forgotPassword({ email });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">

        {/* ── Left panel ── */}
        <div className="hidden md:flex relative md:w-5/12 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 p-10 flex-col justify-between text-white overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold leading-snug mb-4">
              Mot de passe<br />oublié ?
            </h1>
            <p className="text-red-100/80 text-sm leading-relaxed">
              Pas de panique. Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <div className="relative z-10 space-y-4 my-8">
            {[
              { icon: "✦", text: "Lien envoyé en quelques secondes" },
              { icon: "✦", text: "Lien valide pendant 30 minutes" },
              { icon: "✦", text: "Vérifiez également vos spams" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-rose-300 text-xs">{icon}</span>
                <span className="text-sm text-red-50/90">{text}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <p className="text-xs text-red-200/60">
              Vous vous souvenez ?{" "}
              <CLink href="/user/login" className="text-white font-medium underline underline-offset-2 hover:text-red-100 transition-colors">
                Se connecter
              </CLink>
            </p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">

          {!submitted ? (
            <>
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Réinitialiser le mot de passe</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Nous vous enverrons un lien de réinitialisation par email.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 shrink-0">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Adresse email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm shadow-red-200 dark:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
                      </svg>
                      Envoyer le lien
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 md:hidden">
                Vous vous souvenez ?{" "}
                <CLink href="/user/login" className="font-medium text-red-600 hover:text-red-700 hover:underline">
                  Se connecter
                </CLink>
              </p>
            </>
          ) : (
            /* ── Success state ── */
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Email envoyé !</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mb-2">
                Un lien de réinitialisation a été envoyé à
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-6">{email}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed max-w-xs mb-8">
                Le lien est valide pendant 30 minutes. Vérifiez également votre dossier spam si vous ne le trouvez pas.
              </p>

              <button
                type="button"
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 transition-all duration-200 cursor-pointer mb-4"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.67"/>
                </svg>
                Renvoyer l'email
              </button>

              <CLink href="/user/login" className="text-xs text-red-600 hover:text-red-700 hover:underline font-medium transition-colors">
                Retour à la connexion
              </CLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;