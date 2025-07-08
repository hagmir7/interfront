"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await login({ email, password, rememberMe });
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      
      setError("Identifiants invalides. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg p-6 space-y-6">
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
          <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-700">
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="nom@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="password" className="text-md font-medium text-gray-700">
              Mot de passe
            </label>
            <a href="/user/forgot-password" className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
              Mot de passe oublié ?
            </a>
          </div>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded text-red-600 focus:ring-2 focus:ring-red-500"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          <label htmlFor="remember" className="ml-2 text-md text-gray-600">
            Se souvenir de moi
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-70"
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
            <a href="/user/register" className="font-medium text-red-600 hover:text-red-800 transition-colors">
              Créer un nouveau compte
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;