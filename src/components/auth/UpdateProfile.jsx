"use client";
import React, { useState } from "react";
import { Loader2, User2 } from "lucide-react";
import { api } from "@/lib/api";
import Alert from "../ui/Alert";

export default function UpdateProfile({ user }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    first_name: user.first_name ?? "",
    last_name: user.last_name ?? "",
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
    shipping_id: user.shipping_id ?? "",
    gender: user.gender ?? "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put("users/update", form);
      localStorage.setItem('user', JSON.stringify(response.data));
      setError("")
      setSuccess("Profil modifié avec succès")
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur s'est produite")
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("")  
        setSuccess("")
      }, 5000)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <User2 className="w-5 h-5 text-blue-600" />
        Modifier le profil
      </h3>

      <Alert message={error} type="error" />
      <Alert message={success} type="success" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-md font-semibold text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            id="first_name"
            value={form.first_name}
            maxLength="100"
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-md font-semibold text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="last_name"
            value={form.last_name}
            maxLength="100"
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="name" className="block text-md font-semibold text-gray-700">
            Entreprise
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            maxLength="150"
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-md font-semibold text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            maxLength="155"
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-md font-semibold text-gray-700">
            Téléphone
          </label>
          <input
            type="text"
            id="phone"
            value={form.phone}
            maxLength="50"
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-md font-semibold text-gray-700">
            Adresse
          </label>
          <input
            type="text"
            id="address"
            value={form.address}
            maxLength="155"
            onChange={handleChange}
            className="border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 p-2 rounded-xl w-full"
          />
        </div>

        {/* Shipping */}
        <div>
          <label htmlFor="shipping_id" className="block text-md font-semibold text-gray-700">
            Expédition
          </label>
          <select
            id="shipping_id"
            value={form.shipping_id}
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
          <label htmlFor="gender" className="block text-md font-semibold text-gray-700">
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
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </form>
  );
}
