"use client";
import { Lock, Loader2 } from "lucide-react";
import React, { useState } from "react";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your API call (e.g., fetch or axios)
      console.log("Submitting password change:", form);
      await new Promise((r) => setTimeout(r, 1500)); // simulate request
      alert("Mot de passe mis à jour avec succès !");
    } catch (error) {
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Lock className="w-5 h-5 text-blue-600" />
        Mot de passe
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label
            htmlFor="current_password"
            className="block text-md text-gray-700"
          >
            Mot de passe actuel
          </label>
          <input
            type="password"
            id="current_password"
            value={form.current_password}
            onChange={handleChange}
            placeholder="Entrez votre mot de passe actuel"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="new_password" className="block text-md text-gray-700">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="new_password"
            value={form.new_password}
            onChange={handleChange}
            placeholder="Entrez un nouveau mot de passe"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            htmlFor="confirm_password"
            className="block text-md text-gray-700"
          >
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            id="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Confirmez le nouveau mot de passe"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
            required
          />
        </div>

        <div className="flex justify-center">
            <button
          type="submit"
          disabled={loading}
          className="mt-3 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm shadow transition-all"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Changer le mot de passe
        </button>
        </div>
      </form>
    </div>
  );
}
