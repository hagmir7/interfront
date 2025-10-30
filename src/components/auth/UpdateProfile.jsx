"use client";
import React, { useState } from "react";
import { Loader2, User, Mail, Phone, MapPin, Building2, Image } from "lucide-react";

export default function UpdateProfile({user}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image" && files?.[0]) {
      setForm({
        ...form,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting form:", form);
      await new Promise((r) => setTimeout(r, 1500)); // simulate API call
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-dm font-semibold text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            id="first_name"
            maxLength="100"
            value={form.first_name}
            onChange={handleChange}
            placeholder="Entrez votre prénom"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-dm font-semibold text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="last_name"
            maxLength="100"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="name" className="block text-dm font-semibold text-gray-700">
            Entreprise
          </label>
          <input
            type="text"
            id="name"
            maxLength="150"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom de l’entreprise"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-dm font-semibold text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            maxLength="155"
            value={form.email}
            onChange={handleChange}
            placeholder="Entrez votre adresse e-mail"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-dm font-semibold text-gray-700">
            Téléphone
          </label>
          <input
            type="text"
            id="phone"
            maxLength="50"
            value={form.phone}
            onChange={handleChange}
            placeholder="Numéro de téléphone"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-dm font-semibold text-gray-700">
            Adresse
          </label>
          <input
            type="text"
            id="address"
            maxLength="155"
            value={form.address}
            onChange={handleChange}
            placeholder="Adresse complète"
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Shipping */}
        <div>
          <label htmlFor="shipping" className="block text-dm font-semibold text-gray-700">
            Expédition
          </label>
          <select
            id="shipping"
            value={form.shipping}
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          >
            <option value="">Sélectionner</option>
            <option value="1">EX-WORK</option>
            <option value="2">LA VOIE EXPRESS</option>
            <option value="3">SDTM</option>
            <option value="4">LODIVE</option>
            <option value="5">MTR</option>
            <option value="6">CARRE</option>
            <option value="7">MAROC EXPRESS</option>
            <option value="8">GLOG MAROC</option>
            <option value="9">AL JAZZERA</option>
            <option value="10">C YAHYA</option>
            <option value="11">C YASSIN</option>
            <option value="12">GHAZALA</option>
            <option value="13">GISNAD</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-dm font-semibold text-gray-700">
            Genre
          </label>
          <select
            id="gender"
            value={form.gender}
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          >
            <option value="">Sélectionner</option>
            <option value="Mâle">Mâle</option>
            <option value="Femelle">Femelle</option>
          </select>
        </div>

      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Enregistrer
        </button>
      </div>
    </form>
  );
}
