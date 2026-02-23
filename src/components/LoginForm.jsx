"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import CLink from "./CLink";
import { useRouter, useSearchParams } from "next/navigation";
import { login, User } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

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
      const next = searchParams.get("next");
      router.push(next || "/profile");
    } catch (err) {
      setError("Identifiants invalides. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
        <p className="text-gray-500 text-lg mt-1">Accédez à votre compte</p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-600 text-md">{error}</p>
          </div>
        )}

        <div>
          <label className="block mb-2 text-md font-medium text-gray-700">
            Adresse email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-md font-medium text-gray-700">Mot de passe</label>
            <CLink
              href="/user/forgot-password"
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Mot de passe oublié ?
            </CLink>
          </div>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-red-600"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          <label className="ml-2 text-md text-gray-600">Se souvenir de moi</label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Connexion en cours...
            </span>
          ) : (
            "Se connecter"
          )}
        </button>

        <div className="text-center mt-6">
          <p className="text-md text-gray-600">
            Pas encore de compte ?{" "}
            <CLink
              href={`/user/register${searchParams.get("next") ? `?next=${searchParams.get("next")}` : ""}`}
              className="font-medium text-red-600 hover:text-red-800"
            >
              Créer un nouveau compte
            </CLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;