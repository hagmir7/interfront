"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/services/auth";
import CLink from "./CLink";

const RegisterForm = ({ isRegister }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Registration logic here
        register({ first_name : firstName, last_name: lastName, phone, email, password})
        login({ email, password });
        router.push("/dashboard");

      } else {
        // Login logic here
        console.log("Logging in:", { email, password });
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg p-6 space-y-6">
      {
        isRegister ? (  <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
          <p className="text-gray-500 text-sm mt-1">Accédez à votre compte</p>
        </div>) :
         ( <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
          <p className="text-gray-500 text-sm mt-1">Accédez à votre compte</p>
        </div>)
      }
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        {isRegister && (
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-900">Prenom</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                placeholder="Votre prenom" required />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-900">Nom</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                placeholder="Votre nom" required />
            </div>
          </div>
        )}
        {isRegister && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Téléphone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
              placeholder="0612XXXXX" required />
          </div>
        )}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Votre email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
            placeholder="nom@exemple.com" required />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
            placeholder="••••••••" required />
        </div>
        {isRegister && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Confirmer le mot de passe</label>
            <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
              placeholder="••••••••" required />
          </div>
        )}
        <button type="submit" className="text-white w-full bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
          {isRegister ? "S'inscrire" : "Se connecter"}
        </button>
        <div className="mt-2">
          <CLink href={isRegister ? "/user/login" : "/user/register"} className="text-sm font-medium text-red-600 hover:underline">
            {isRegister ? "J'ai déjà un compte?" : "Créer un nouveau compte !"}
          </CLink>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
