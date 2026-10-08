'use client'

import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import Alert from './ui/Alert';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name) newErrors.full_name = 'Le nom complet est requis.';
    if (!formData.email) newErrors.email = 'L\'adresse e-mail est requise.';
    if (!formData.phone) newErrors.phone = 'Le numéro de téléphone est requis.';
    if (!formData.subject) newErrors.subject = 'Le sujet est requis.';
    if (!formData.message) newErrors.message = 'Le message est requis.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const response = await api.post("contacts", formData);

        // Reset form on success
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        setError("");
        setSuccess("Votre message a été envoyé avec succès. Nous vous contacterons bientôt.");

      } catch (err) {
        setError(err.response?.data?.message || "Une erreur s'est produite lors de l'envoi du message.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert message={error} type="error" />
      <Alert message={success} type="success" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="full_name">Nom et Prénom</label>
          <input
            name="full_name"
            className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
            placeholder="Nom et Prénom"
            type="text"
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.full_name && (
            <span className="text-white text-sm">{errors.full_name}</span>
          )}
        </div>
        <div>
          <label className="sr-only" htmlFor="email">Adresse e-mail</label>
          <input
            name="email"
            className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
            placeholder="Adresse e-mail"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && (
            <span className="text-white text-sm">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="phone">Téléphone</label>
          <input
            name="phone"
            className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
            placeholder="Numéro de téléphone"
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.phone && (
            <span className="text-white text-sm">{errors.phone}</span>
          )}
        </div>
        <div>
          <label className="sr-only" htmlFor="subject">Sujet</label>
          <input
            name="subject"
            className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
            placeholder="Sujet"
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.subject && (
            <span className="text-white text-sm">{errors.subject}</span>
          )}
        </div>
      </div>

      <div>
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea
          name="message"
          className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
          placeholder="Message"
          rows={8}
          id="message"
          value={formData.message}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.message && (
          <span className="text-white text-sm">{errors.message}</span>
        )}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 text-accent-red bg-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-red hover:bg-transparent border hover:border-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              {loading && (<Loader2 className="w-4 h-4 animate-spin" />)}
              Envoi en cours...
            </>
          ) : (
            'Envoyer'
          )}
        </button>
      </div>
    </form>
  )
}