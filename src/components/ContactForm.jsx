'use client'

import React, {useState} from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    
      const [errors, setErrors] = useState({});
    
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Implement your form submission logic here
          console.log('Form submitted', formData);
        }
      };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      />
      {errors.message && (
        <span className="text-white text-sm">{errors.message}</span>
      )}
    </div>

    <div className="mt-4">
      <button 
        type="submit" 
        className="flex items-center justify-center gap-2 text-accent-red bg-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-red hover:bg-transparent border hover:border-white hover:text-white"
      >
        Envoyer
      </button>
    </div>
  </form>
  )
}
