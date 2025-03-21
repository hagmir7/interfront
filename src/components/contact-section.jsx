'use client'
import React, { useState } from 'react';

const ContactSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      // Reset form after submission (optional)
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-red-500">
      <div className="relative z-10 grid gap-16 px-4 md:grid-cols-2 md:max-w-7xl md:mx-auto">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-left text-white md:text-4xl">
            Intercocina - Là où les saveurs rencontrent l'innovation
          </h2>
          <div className="space-y-2">
            <p className="text-white text-start md:text-lg">
              Contactez-nous pour tous vos besoins et questions culinaires. Nous sommes là pour vous servir !
            </p>
            <p className="text-white text-start md:text-lg">
              Vous pouvez également saisir votre email pour exprimer votre intérêt! Nous vous contacterons dès
              que la prochaine session sera disponible.
            </p>
          </div>
        </div>
        <div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="full_name">Nom et Prénom</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
                  placeholder="Nom et Prénom"
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">Adresse e-mail</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
                  placeholder="Adresse e-mail"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="phone">Téléphone</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
                  placeholder="Numéro de téléphone"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="subject">Sujet</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
                  placeholder="Sujet"
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea
                className="w-full p-3 text-sm border-gray-200 rounded-lg bg-white"
                placeholder="Message"
                rows="8"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 text-red-600 bg-white px-6 py-3 rounded-xl font-semibold hover:bg-transparent border hover:border-white hover:text-white transition-colors"
                onClick={handleSubmit}
              >
                {isLoading && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
                    <path d="M17 12a5 5 0 1 0 -5 5"></path>
                  </svg>
                )}
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute z-0 rounded-full bg-gray-300 w-28 h-28 md:w-80 md:h-80 md:-top-36 md:-right-28 -top-12 -right-6"></div>
      <div className="bg-gray-300 hidden md:block w-80 h-80 rounded-full absolute z-0 md:-bottom-36 md:-left-28"></div>
    </section>
  );
};

export default ContactSection;