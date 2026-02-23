"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/services/auth";
import CLink from "./CLink";

const RegisterForm = () => {
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
    setError("");

    try {

      if (password !== passwordConfirmation) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
      await register({
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        password,
      });
      await login({ login: email, password })
      router.push('/profile')


    } catch (err) {
      setError(err?.response?.data?.message || "Une erreur est survenue");
    }
  };
  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg p-6 space-y-6">

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
        <p className="text-gray-500 text-lg mt-1">Accédez à votre compte</p>
      </div>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2">
          <div className="w-full">
            <label className="block mb-1 text-md font-medium text-gray-900">Prenom</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
              placeholder="Votre prenom" required />
          </div>
          <div className="w-full">
            <label className="block mb-1 text-md font-medium text-gray-900">Nom</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
              placeholder="Votre nom" required />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-md font-medium text-gray-900">Téléphone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
            placeholder="0612XXXXX" required />
        </div>

        <div>
          <label className="block mb-1 text-md font-medium text-gray-900">Votre email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
            placeholder="nom@exemple.com" required />
        </div>
        <div>
          <label className="block mb-1 text-md font-medium text-gray-900">Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
            placeholder="••••••••" required />
        </div>
        <div>
          <label className="block mb-1 text-md font-medium text-gray-900">Confirmer le mot de passe</label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
            placeholder="••••••••" required />
        </div>
        <button type="submit" className="text-white w-full bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-md px-5 py-2.5 text-center">
          {"S'inscrire"}
        </button>
        <div className="mt-2">
          <CLink href={"/user/register"} className="text-md font-medium text-red-600 hover:underline">
            {"J'ai déjà un compte?"}
          </CLink>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
