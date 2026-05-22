"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, User } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import CLink from "./CLink";
import SocialAuthButtons from "./SocialAuthButtons";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ login: email, password, rememberMe });

      const user = await User();

      setUser(user);

      if (user?.type == null) {
        router.push('/onboarding');
      } else {
        router.push(searchParams.get("next") || "/profile");
      }

    
    } catch (err) {
      setError("Identifiants invalides. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextParam = searchParams.get("next");

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">

        {/* ── Left panel ── */}
        <div className="hidden md:flex relative md:w-5/12 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 p-10 flex-col justify-between text-white overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold leading-snug mb-4">
              Bon retour<br />parmi nous
            </h1>
            <p className="text-red-100/80 text-sm leading-relaxed">
              Connectez-vous pour accéder à votre espace et gérer vos commandes.
            </p>
          </div>

          {/* Feature list */}
          <div className="relative z-10 space-y-4 my-8">
            {[
              { icon: "✦", text: "Suivi de vos commandes en temps réel" },
              { icon: "✦", text: "Gestion de vos informations" },
              { icon: "✦", text: "Accès à votre historique complet" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-rose-300 text-xs">{icon}</span>
                <span className="text-sm text-red-50/90">{text}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <p className="text-xs text-red-200/60">
              Pas encore de compte ?{" "}
              <CLink
                href={`/user/register${nextParam ? `?next=${nextParam}` : ""}`}
                className="text-white font-medium underline underline-offset-2 hover:text-red-100 transition-colors"
              >
                S'inscrire
              </CLink>
            </p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Connexion</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Accédez à votre compte</p>
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
          <form onSubmit={handleLogin} className="space-y-4">

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Adresse email
              </label>

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

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mot de passe
                </label>

                <CLink
                  href="/user/forgot-password"
                  className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  Mot de passe oublié ?
                </CLink>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800 disabled:opacity-50"
              />
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />

              <span className="text-sm text-gray-600 dark:text-gray-400 select-none">
                Se souvenir de moi
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm shadow-red-200 dark:shadow-none"
            >
              {isLoading ? "Connexion en cours…" : "Se connecter"}
            </button>
          </form>

          {/* Mobile register link */}
          <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400 md:hidden">
            Pas encore de compte ?{" "}
            <CLink
              href={`/user/register${nextParam ? `?next=${nextParam}` : ""}`}
              className="font-medium text-red-600 hover:text-red-700 hover:underline"
            >
              S'inscrire
            </CLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;