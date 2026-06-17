"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, register, User } from "@/services/auth";
import CLink from "./CLink";
import SocialAuthButtons from "./SocialAuthButtons";


const InputField = ({ label, type = "text", value, onChange, placeholder, required = true, autoComplete }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800"
    />
  </div>
);

const RegisterForm = ({ isRegister = false }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    try {
      await register({ first_name: firstName, last_name: lastName, phone, email, password });
      await login({ login: email, password });

      const user = await User();


      if (user?.type == null) {
        router.push('/onboarding');
      } else {
        router.push(searchParams?.get("next") || "/profile");
      }

    } catch (err) {
      setError(err?.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/auth/${provider}`;
  };

  return (
    <div className="flex items-center justify-cente px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">

        {/* ── Left panel ── */}
        <div className="hidden md:flex relative md:w-5/12 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 p-10 flex-col justify-between text-white overflow-hidden">
          {/* decorative circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />

          <div className="relative z-10">
            {/* Logo placeholder */}
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold leading-snug mb-4">
              Rejoignez-nous<br />dès aujourd'hui
            </h1>
            <p className="text-red-100/80 text-sm leading-relaxed">
              Créez votre compte en quelques instants et accédez à toutes nos fonctionnalités.
            </p>
          </div>

          {/* Feature list */}
          <div className="relative z-10 space-y-4 my-8">
            {[
              { icon: "✦", text: "Accès instantané à votre espace" },
              { icon: "✦", text: "Gestion de commandes simplifiée" },
              { icon: "✦", text: "Suivi en temps réel" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-rose-300 text-xs">{icon}</span>
                <span className="text-sm text-red-50/90">{text}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <p className="text-xs text-red-200/60">
              Déjà un compte ?{" "}
              <CLink href="/user/login" className="text-white font-medium underline underline-offset-2 hover:text-red-100 transition-colors">
                Se connecter
              </CLink>
            </p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Créer un compte</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Remplissez le formulaire pour commencer</p>
          </div>

          {/* Social login */}
          <SocialAuthButtons
            onLoadingChange={setIsLoading}
            onError={(provider, err) => {
              console.error(`${provider} login error:`, err);
              setError("Une erreur est survenue. Veuillez réessayer.");
            }}
          />

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400 font-medium">ou avec email</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <InputField label="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Votre prénom" autoComplete="given-name" />
              <InputField label="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Votre nom" autoComplete="family-name" />
            </div>

            <InputField label="Téléphone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0612 345 678" autoComplete="tel" />
            <InputField label="Adresse email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@exemple.com" autoComplete="email" />

            <div className="grid grid-cols-2 gap-3">
              <InputField label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
              <InputField label="Confirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm shadow-red-200 dark:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Inscription en cours…
                </>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-400 dark:text-gray-500">
            En vous inscrivant, vous acceptez nos{" "}
            <CLink href="/policies/terms" className="text-red-600 hover:underline">conditions d'utilisation</CLink>
            {" "}et notre{" "}
            <CLink href="/policies/privacy" className="text-red-600 hover:underline">politique de confidentialité</CLink>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;